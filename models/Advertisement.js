'use strict';

const mongoose = require('mongoose');

// definir un esquema
const adSchema = mongoose.Schema({
  nombre: String,
  venta: Boolean,
  precio: Number,
  foto: String,
  tags: [String]
  });


// creo el modelo con ese esquema
const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;