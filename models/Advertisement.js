'use strict';

const mongoose = require('mongoose');

// definir un esquema
const anuncioSchema = mongoose.Schema({
  nombre: String,
  venta: Boolean,
  precio: Number,
  foto: String,
  tags: [String]
  });


// crear modelo con ese esquema
const Ad = mongoose.model('Anuncio', anuncioSchema);

module.exports = Ad;