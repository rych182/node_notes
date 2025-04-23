/*
.env es solo un archivo plano donde tú defines variables de entorno como esta: PORT=4000
Y para poder usarlo en tu app de Node.js necesitas esta línea al inicio de tu index.js
process es una variable global que viene con Node.js
process es un objeto global que existe en cualquier aplicación Node.js.
Dentro de él, process.env es un objeto que guarda variables de entorno.
--------------------------------------------------------------------------------------------
 express() es una función que viene del módulo Express.
🔹 Al ejecutarla, devuelve una "instancia de una aplicación de Express".
🔹 Esa instancia se guarda en la constante app.
app es la que usas para:
-Definir middlewares: app.use(...)
-Definir rutas: app.get('/ruta', handler)
-Escuchar el puerto del servidor: app.listen(port, ...)

Es como si dijeras:
"Crea mi servidor Express, guárdalo en una variable para poder configurarlo."

Cuando ejecutas: const app = express();
Estás ejecutando una función que hace lo siguiente :
1-"Crea una aplicación" (app): Internamente,
Express crea un objeto que extiende funcionalidades de un servidor HTTP (como el que creas con Node.js).
2-"Le añade funcionalidades de middleware y rutas": Ese objeto tiene métodos como:
app.get()
app.post()
app.use()
app.listen()
etc.
Todo eso está basado en algo llamado Router,
que es una mini app dentro de Express para manejar rutas y middlewares.
3-"Le da comportamiento como servidor web": Lo conecta con Node.js, 
así que cuando haces app.listen(port), en realidad estás levantando un servidor HTTP.

¿Qué hay en esa instancia?
La constante app contiene un objeto especial con un montón de funcionalidades. 
Algunas de las más comunes:
app.use() → para usar middlewares globales.
app.get() / app.post() / app.put() → para manejar rutas.
app.listen() → para iniciar el servidor.
app.set() / app.get() (configuración interna).
app.locals → para compartir datos globales.
Todo esto está montado sobre una base de Node.js, usando http.createServer().


Si tú mismo quisieras hacer algo parecido a Express, podrías hacer algo como:

const http = require('http');

const app = (req, res) => {
  res.end('Hola desde mi mini servidor');
};

http.createServer(app).listen(3000);

Express simplemente "facilita" todo ese proceso con una estructura muy amigable para manejar rutas,
middlewares, JSON, etc.
------------------------------------------------------------------------

Explicando app.use(express.json());

express.json() es un middleware de Express
Un middleware es una función que se ejecuta entre que se recibe una petición y se envía la respuesta.

Sirven para interceptar, modificar, validar o procesar los datos antes de que lleguen
al controlador final o después de que salgan de él.

¿Para qué sirven?
🔹 1. Procesar el cuerpo de la petición
Cuando alguien envía datos (por ejemplo, desde un formulario),
los middlewares pueden ayudar a leer ese contenido

app.use(express.json()); // Permite leer JSON del cuerpo de la petición

2. Validaciones
Podrías tener un middleware que revise si todos los datos requeridos están presentes
antes de crear una tarea, por ejemplo:

function validarDatos(req, res, next) {
  if (!req.body.titulo) {
    return res.status(400).send('Falta el título');
  }
  next(); // todo bien, sigue al controlador
}


3. Autenticación
Antes de permitir el acceso a una ruta protegida, puedes revisar si el usuario está autenticado:
function verificarToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('No autorizado');
  }
  next();
}

4. Logs / debug
function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

        ==========

express.json() no es lo mismo que JSON.parse()

*/



require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes/index');
const logger = require('./middlewares/logger');

const port = process.env.PORT || 3000;

app.use(logger);
app.use(express.json());
app.use('/', routes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
