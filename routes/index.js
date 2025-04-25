/*
const express = require('express'); te conecta con el framework express

const router = express.Router(); 
Router() es una función que te da una instancia de enrutador de Express.
Es como una mini aplicación Express: puedes usarla para definir rutas, middlewares, etc., de forma modular y organizada.

 ¿Para qué sirve?
Imagina que tienes muchas rutas en tu app (por ejemplo: /login, /register, /products, /api, etc).
En vez de escribir todo eso en tu archivo principal index.js, puedes usar routers separados para cada sección.

Entonces express.Router() te permite:
-Organizar rutas en archivos distintos.
-Encapsular cada grupo de rutas.
-Reutilizar middlewares solo en rutas específicas.
-Mantener tu código limpio y mantenible.


Ejemplo:
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Inicio');
});

router.get('/about', (req, res) => {
  res.send('Acerca de');
});


app.use('/', router);


*/

const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/', homeController.index);

module.exports = router;
