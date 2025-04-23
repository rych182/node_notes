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
express.json() es un "middleware de Express"
Ese middleware lee el cuerpo (body) de las solicitudes HTTP (por ejemplo, POST, PUT, etc.)
cuando viene en formato JSON, y lo convierte en un objeto JavaScript accesible en req.body

Ejemplo:
Si te mandan esta petición POST:
{
  "nombre": "Ana",
  "edad": 25
}

Gracias a express.json(), tú puedes hacer:
app.post('/usuario', (req, res) => {
  console.log(req.body); // { nombre: 'Ana', edad: 25 }
});
            =====IMPORTANTE=====
Aunque tú ya hiciste: const app = express(); // ejecutaste express()

express.json() es una función distinta que está dentro del módulo express, no dentro del app
En otras palabras:
express() te da una "app (servidor)"".
express.json() te da un "middleware" especializado para leer JSON.

ENTONCES ¿Por qué se pone dentro de app.use()?
Esto se traduce en:

"Voy a "usar este middleware" que viene de express.json() para que "todas las rutas"
 puedan acceder a req.body cuando venga JSON."


  En resumen

Elemento	    ¿Qué es?	                                ¿Para qué sirve?
express()	    Función que crea la app Express	            Para iniciar tu servidor
app.use()	    Método para agregar middlewares a la app	Para interceptar y procesar peticiones
express.json()	Middleware incluido en Express	     Para transformar JSON del cliente en req.body

------------------------------------------------------------------------------------
app.use('/', routes);

app está ejecutándose Express, y por eso puedo usar .use() que permite conectarle middlewares o rutas.
¿Qué hace exactamente app.use('/', routes);?
Lo que le estás diciendo a Express es:
"Cuando alguien visite cualquier ruta que comience con /, usa lo que tengo definido en routes."
Y routes es un módulo que tú importaste con esta línea:
const routes = require('./routes/index');

El código que tienes en /routes/index define un "mini-servidor" o "sub-rutas" que se comportan 
como middleware.

Cuando haces app.use('/', routes);, estás diciendo:
“Cuando venga una petición al servidor, pásala por aquí (/) y luego
 revisa lo que diga este grupo de rutas.”

EJEMPLO:
Supón que tienes esto en routes/index.js
router.get('/saludo', (req, res) => {
  res.send('Hola desde /saludo');
});

Entonces:
Si usas app.use('/', routes); → accedes en http://localhost:3000/saludo
Si usas app.use('/api', routes); → accedes en http://localhost:3000/api/saludo

En resumen:

Código	                ¿Qué hace?
app.use()	            Usa un middleware o conjunto de rutas en tu servidor
app.use('/', routes)	Usa las rutas definidas en routes desde la raíz (/)
routes	                Contiene rutas agrupadas usando express.Router()

La razón por la cual no necesitas especificar .js require('./routes/index');  al final del archivo al usar require en Node.js
tiene que ver con cómo Node.js resuelve los módulos. 


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
