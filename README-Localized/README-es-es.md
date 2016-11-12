# Ejemplo del complemento Silly stories de Word: cargar archivos y usar controles de contenido

Este complemento de Word le mostrarán cómo:

1. Cargar una lista de archivos docx de un servicio y rellenar un control de cuadro desplegable con los nombres de archivo como opciones.
2. Cargar un archivo docx desde el servicio e insertarlo en el documento de Word.
3. Cargar la colección de controles de contenido y crear cuadros de entrada en función de los controles de contenido.
4. Actualizar el valor de texto de la colección de controles de contenido según los valores de los cuadros de entrada.
5. Use Office UI Fabric para crear una experiencia del usuario de Word sin problemas.

> Nota: Al ejecutar este ejemplo, se le puede escapar una risita como efecto secundario.

## Requisitos previos

Para usar el ejemplo del complemento Silly stories de Word, se requiere lo siguiente.

* [node.js](https://nodejs.org) para atender los archivos docx.
* [npm](https://www.npmjs.com/) para instalar las dependencias.
* JQuery, para el componente [desplegable](dev.office.com/fabric/components/dropdown) de Office UI Fabric.
* Word 2016 o cualquier cliente compatible con la API de JavaScript de Word. En este ejemplo se realiza una comprobación de requisito para ver si se está ejecutando en un host compatible.

## Iniciar la aplicación web

1. Instale las dependencias del proyecto con el administrador de paquetes de Node (npm) ejecutando ```npm install``` en el directorio raíz del proyecto, en la línea de comandos.
2. Inicie el servidor de desarrollo mediante la ejecución de ```node server.js``` en el directorio raíz del proyecto. El complemento se ejecutará en 127.0.0.1:8080.

### Configurar y ejecutar en Word para Mac 2016

1. Cree una carpeta llamada “wef” en Users/Library/Containers/com.microsoft.word/Data/Documents/
2. Guarde el manifiesto en la carpeta wef (Users/Library/Containers/com.microsoft.word/Data/Documents/wef)
3. Abra Word 2016 en el equipo Mac y haga clic en la pestaña Insertar > lista desplegable Mis complementos. Verá el complemento en la lista desplegable. Selecciónelo para cargar el complemento.

### Configurar y ejecutar en Word para Windows 2016

1. Cree un recurso compartido de red o [comparta una carpeta en la red](https://technet.microsoft.com/es-es/library/cc770880.aspx) y coloque el archivo de manifiesto [word-add-in-sillystories.xml](word-add-in-sillystories.xml) en él. En este momento, ha implementado el complemento. Ahora debe indicarle a Word dónde encontrar el complemento.
2. Inicie Word y abra un documento.
3. Seleccione la pestaña **Archivo** y haga clic en **Opciones**.
4. Haga clic en **Centro de confianza** y seleccione el botón **Configuración del Centro de confianza**.
5. Seleccione **Catálogos de complementos de confianza**.
6. En el cuadro **Dirección URL del catálogo**, escriba la ruta de red al recurso compartido de carpeta que contiene word-add-in-sillystories.xml y después elija **Agregar catálogo**.
7. Active la casilla **Mostrar en menú** y haga clic en **Aceptar**.
8. Aparecerá un mensaje para informarle de que la configuración se aplicará la próxima vez que inicie Office. Cierre y vuelva a iniciar Word. 

Ahora está listo para ejecutarlo en Word. 

1. Abra un documento de Word. 
2. En la pestaña **Insertar** de Word 2016, elija **Mis complementos**. 
3. Seleccione la pestaña **Carpeta compartida**.
4. Elija **Silly stories add-in** (Complemento Silly stories) y, después, seleccione **Insertar**.
5. El complemento se cargará en un panel de tareas. Consulte la figura 1 para ver el aspecto que tendrá cuando se cargue.
6. Seleccione un artículo para que el texto reutilizable se introduzca en el documento de Word.

**Ilustración 1. El complemento Silly stories cargado en Word**

![Imagen de la aplicación Word con el complemento Silly stories cargado](../readme-images/sillystoriesUI.PNG)

## Preguntas y comentarios

Nos encantaría recibir sus comentarios sobre el ejemplo del complemento de Word Silly stories. Puede enviarnos sus preguntas y sugerencias a través de la sección [Problemas](https://github.com/OfficeDev/Word-Add-in-SIllyStories/issues) de este repositorio.

Las preguntas generales sobre desarrollo de complementos deben publicarse en [Stack Overflow](http://stackoverflow.com/questions/tagged/Office365+API). Asegúrese de que sus preguntas o comentarios se etiquetan con [office-js], [word] y [API].

## Obtener más información

Aquí tiene más recursos para ayudarle a crear complementos basados en la API de JavaScript de Word:

* [Transferir localmente un complemento de Office a iPad y Mac](http://dev.office.com/docs/add-ins/testing/sideload-an-office-add-in-on-ipad-and-mac)
* [Información general sobre la plataforma de complementos de Office](https://msdn.microsoft.com/es-es/library/office/jj220082.aspx)
* [Complementos de Word](https://github.com/OfficeDev/office-js-docs/blob/master/word/word-add-ins.md)
* [Introducción a la programación de complementos de Word](https://github.com/OfficeDev/office-js-docs/blob/master/word/word-add-ins-programming-guide.md)
* [Explorador de fragmentos de código para Word](http://officesnippetexplorer.azurewebsites.net/#/snippets/word)
* [Referencia de la API de JavaScript de complementos de Word](https://github.com/OfficeDev/office-js-docs/tree/master/word/word-add-ins-javascript-reference)

## Copyright
Copyright (c) 2015 Microsoft. Todos los derechos reservados.
