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

// crear método estático para listar tags
anuncioSchema.statics.tags = function() {
  //return Ad.find({tags:{ $exists: true }}, {_id:0,tags:1});
  return Ad.find();
}

module.exports = Ad;