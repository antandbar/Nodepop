'use strict';

const mongoose = require('mongoose');

// en caso de error en la conexión
mongoose.connection.on('error', err => {
  console.log('Error de conexión a MongoDB', err);
  process.exit(1);
});

// evento al conectar primea vez la BBDD
mongoose.connection.once('open', () => {
  console.log('Conectado a MongoDB en la BD:', mongoose.connection.name);
});

// Conexión a BBDD
mongoose.connect(process.env.NODE_ENV === 'test'? process.env.MONGODB_CONNECTION_STRING_TEST:process.env.MONGODB_CONNECTION_STRING);

module.exports = mongoose.connection;