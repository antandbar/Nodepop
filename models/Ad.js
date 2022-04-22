'use strict';

const mongoose = require('mongoose');
const { Requester } = require('cote');


let requester = null;
// Request se instancia cuando no se pasan tests ni se inicia el script initdb
if(typeof(process.env.NODE_ENV) === 'undefined') {
  requester = new Requester({name: 'nodepop'});
}


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

// se llama al microservicio
adSchema.methods.createThumbnail = function(photoName) {
  const event = {
    type:'thumbnail',
    photoName
  }

  requester.send(event);
}

// crea modelo del esquema
const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;