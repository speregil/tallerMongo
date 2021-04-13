/**
 * Configuración básica de un servidor usando Node.js y Express
 */

//--------------------------------------------------------------------------------------
// Requerimientos
//--------------------------------------------------------------------------------------

var express = require('express');                 // Libreria base de express
var cors = require('cors');                       // Libreria para manejar el protocolo CORS
var conexion = require('./conexion.servicio')     // Servicio de conexión a la base de datos
var Mercancia = require('./mercancia.esquema');   // Esquema de la mercancia

//---------------------------------------------------------------------------------------
// Servidor
//---------------------------------------------------------------------------------------

var app = express();        // Crea una nueva instancia de Express

conexion.init();            // Se conecta a la base de datos

// Configuraciones para manejar el protocolo CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

var corsOptions = {
    origin: 'http://localhost:1234',
    optionsSuccessStatus: 200
  }

//------------------------------------------------------------------------------
// Rutas
//------------------------------------------------------------------------------

// Busca una mercancia con el nombre exacto que entra por parámetro
app.get('/busqueda_nombre/:busqueda', cors(corsOptions), function(req, res, next) {
    Mercancia.findOne({nombre: req.params.busqueda}, function(err, respuesta){
        res.json({error: err, mercancia: respuesta});
    });
});

// Maneja el error 404
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    console.log("T.T");
    next(err);
});

// Crea el servidor para que comience a escuchar peticiones en el puerto indicado
// usando la configuración hecha en Express
var server = app.listen(3000, function() {
    var host = '0.0.0.0';
    var port = server.address().port;
    console.log('Servidor corriendo en http://%s:%s', host, port);
});
 
module.exports = app;