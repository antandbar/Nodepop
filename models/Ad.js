'use strict';

const mongoose = require('mongoose');

// define un esquema
const adSchema = mongoose.Schema({
  name: {type: String, index: true},
  sale: {type: Boolean, index: true},
  price: {type: Number, index: true},
  photo: String,
  tags: {type: [String], index: true}
  });



// crea método estático para listar tags
adSchema.statics.tags = function() {
   return Ad.distinct('tags');
}

// crea método estático para listar anuncios
adSchema.statics.adfilters = function(filtros, skip, limit, select, sort) {
  const query = Ad.find(filtros);
  query.skip(skip);
  query.limit(limit);
  query.select(select);
  query.sort(sort);

  return query.exec();
}

// crea modelo del esquema
const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;