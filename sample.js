/*
 * Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

(function() {
    "use strict";
    
    /* Recorder Stuff */
    var audio_context;
    var recorder;

    /* UI components */
    var button;
    var buttonEnd;
    var recordingslist;

    var interval;
    var text = ""


    /* Set up the Recorder */

    window.onload = function init() {
        try {
          // webkit shim
          window.AudioContext = window.AudioContext || window.webkitAudioContext;
          navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
          window.URL = window.URL || window.webkitURL;
          console.log("windows", window);
          audio_context = new AudioContext;

          console.log("audio context", audio_context);
          
          console.log('Audio context set up.');
          console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
        } catch (e) {
          console.log("ERROR", e);
        }
        
        navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
          console.log('No live audio input: ' + e);
        });
    };

    // The initialize function is run each time the page is loaded.
    // Office.initialize = function (reason) {
        $(document).ready(function () {
            // Use this to check whether the new API is supported in the Word client.
            // if (Office.context.requirements.isSetSupported("WordApi", "1.1")) {
                console.log('This code is using Word 2016 or greater.');

                // Init UI Components
                button = $('#start');
                buttonEnd = $('#end');
                recordingslist = $('#recordingslist');

                // on click listeners
                button.click(function() {
                  button.html('Save');
                  startListening();
                });

                buttonEnd.click(function() {
                  button.html('Start Listening');
                  buttonEnd.html('End Listening');
                  endListening();
                });
            // }
        });
    // };

    function startUserMedia(stream) {
      var input = audio_context.createMediaStreamSource(stream);
      console.log('Media stream created.');

      // Uncomment if you want the audio to feedback directly
      //input.connect(audio_context.destination);
      //__log('Input connected to audio context destination.');
      
      recorder = new Recorder(input);
      console.log('Recorder initialised.');
    }



    function startListening() {
      recorder && recorder.record();

      interval = setInterval(function() {
        var audioFile = getAudioFile()
        var appendingText = getTextOfSpeech()
        text = text + appendingText
        res.send(text)

        setTimeout(function(){ 
          console.log("Restart the recording"); 
          recorder.clear();
          recorder && recorder.record();
          recordingslist.appendChild(`<li> ${appendingText} </li>`);
        }, 1000);
      }, 6000);

      button.disabled = true;
      console.log('Recording...');
    }


    function endListening() {
      recorder && recorder.stop();
      buttonEnd.disabled = true;
      console.log('Stopped recording.');
      clearInterval(interval);
      // create WAV download link using audio data blob
      // createDownloadLink();

      recorder.clear();
    }
    
    // create WAV download link using audio data blob
    function getAudioFile() {

      recorder && recorder.exportWAV(function(blob) {
        var url = URL.createObjectURL(blob);
        var li = document.createElement('li');
        var au = document.createElement('audio');
        var hf = document.createElement('a');
        console.log("url", url);
        console.log("blob:", blob)
        
        au.controls = true;
        au.src = url;
        console.log("au", au);
        hf.href = url;
        hf.download = new Date().toISOString() + '.wav';        

        hf.innerHTML = hf.download;
        li.appendChild(au);
        li.appendChild(hf);

      });
   }

   function getTextOfSpeech(audiofile){
    var fs = require('fs'); // file system node.js 
    var util = require('util'); // util module 
    var request = require('request'); 

    var clientId = 'test-meeting'; 
    var clientKey = '8df19e9ec19c43d2a63444b3b38e0b9e'; // back-up key '20db5601a2414d2cbe5701e16a946fc0'

    var str = 'tester string about stuff here'

    getAccessToken(clientId, clientSecret, function(err, accessToken)) {

      if(err) return console.log(err); 

      console.log('Access token is:' + accessToken)

      speechToText('test.wav', accessToken, function(err, res)) {
        if(err) return console.log(err); 
        console.log('Confidence' + res.results[0].confidence + 'for:' + res.results[0].lexical );
      };
    };
   } // end getTextOfSpeech(audiofile)

   // helper functions 

   function getAccessToken(clientId, clientSecret, callback) {

    //POST request
    request.post({
      url: 'https://oxford-speech.cloudapp.net/token/issueToken', 
      form: {
          'grant_type': 'client_credentials',
          'client_id': encodeURIComponent(clientId),
          'client_key': encodeURIComponent(clientKey),
          'scope': 'https://speech.platform.bing.com'    
      }

    }, 
    function(err, resp, body){
      if(err) return callback(err);
      try {
        var accesstoken = JSON.parse(body).access_token; 
        if(accessToken){
          callback(null, accessToken);
        } else {
          callback(body);
        }
      } catch(e) {
        callback(e);
      }

    });
   }


   function speechToText(audiofile, accessToken, callback){

    fs.readFile(audiofile,function(err,waveData){

      if(err) return callback(err); 

      request.post({
        url: 'https://speech.platform.bing.com/recognize/query',
        qs: {
          //'scenarios': 'ulm',
          //'appid': 'D4D52672-91D7-4C74-8AD8-42B1D98141A5', // This magic value is required
          //'locale': 'en-US',
          //'device.os': 'wp7',
          //'version': '3.0',
          //'format': 'json',
          //'requestid': '1d4b6030-9099-11e0-91e4-0800200c9a66', // can be anything
          //'instanceid': '1d4b6030-9099-11e0-91e4-0800200c9a66' // can be anything
        },

        body: waveData, 
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'audio/wav; samplerate=16000',
          'Content-Length' : waveData.length
        }

      }, function(err,resp,body){
        if(err) return callback(err); 

        try {
          callback(null, JSON.parse(body)); 
        } catch(e) {
          callback(e); 
        }

      });
    });

   }






























})();
