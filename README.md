### Módulo de Notificaciones
<p>
Este módulo permite a la mesa directiva de la Residencial Los Robles enviar notificaciones en tiempo real a los residentes a través de una aplicación web. Implementa Service Workers y Web Push API para garantizar que los mensajes sean recibidos incluso si el usuario no tiene la app abierta.
</p>

**- Módulo/Dependencia	Función en el Proyecto**
<ul>
<li>React	Construcción del frontend interactivo y dinámico.</li>
<li>Node.js	Plataforma para el backend, maneja las peticiones de notificaciones.</li>
<li>Express	Framework para gestionar las rutas y API en el servidor backend.</li>
<li>web-push	Envía notificaciones push a los usuarios en tiempo real.</li>
<li>dotenv	Maneja variables de entorno de forma segura, como claves de API.</li>
<li>morgan	Registra las peticiones HTTP en el backend para monitoreo y debugging.</li>
<li>worker	Service Worker para permitir la recepción de notificaciones en segundo plano.
</li>
</ul>
####Para ejecutar este módulo en tu entorno local, sigue estos pasos:
#####Clonar el repositorio

`$ git clone -- https://github.com/JaimeFigueroa666/Proyecto-II.git
 `

#####Instalar dependencias
`$ npm install `

#####Configurar variables de entorno
Crea un archivo .env en la raíz del proyecto y define las siguientes variables
(ya las incluye el archivo .env):

```
PUBLIC_VAPID_KEY=TU_CLAVE_PUBLICA `
 PRIVATE_VAPID_KEY=TU_CLAVE_PRIVADA `
```
#####Ejecutar el servidor utilizando comando (node src/index.js)
`$PS B:\JAY\Escritorio\web-push-app> node src/index.js `
#####http://localhost:3000/
```
Server Listening...
GET / 304 7.361 ms - -
GET /main.js 304 0.886 ms - -
{

```
![image alt] (https://github.com/JaimeFigueroa666/Proyecto-II/blob/1402e4cb1b4ffe966255eea2f2981ee1f827d518/Notificaciones.png)
