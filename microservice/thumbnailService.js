'use strict';

const { Responder } = require('cote');

const responder = new Responder({ name: 'thumbnailService' });

// Se crea evento para recibir los datos enviados desde nodepop
responder.on('thumbnail', (req, done) => {
  const { photoName } = req;

  console.log(photoName);

  done();
});
