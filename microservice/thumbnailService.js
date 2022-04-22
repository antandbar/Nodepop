'use strict';

const { Responder } = require('cote');
const Jimp = require('jimp');
const path = require('path');

(async function main() {
  const responder = new Responder({ name: 'thumbnailService' });

  // Se crea evento para recibir los datos enviados desde nodepop
  responder.on('thumbnail', async (req, done) => {
    try {
      const { photoName } = req;

      // Se lee la imagen
      const image = await Jimp.read(
        path.join(__dirname, '../public/images/ads', photoName),
      );

      // Se cambia el tamaño de la imagen
      await image.resize(100, 100);

      // Se escribe nueva imagen
      await image.write(
        path.join(__dirname, '../public/images/ads', newImageUrl(photoName)),
      );

      done();
    } catch (err) {
      // El microservicio maneja su propio logs de errores
      console.log(err.message);
    }
  });
})().catch(err => console.log('Error', err.message));

const newImageUrl = photoName => {
  const addPhotoName = '_100*100';

  const posPhotoName = photoName.lastIndexOf('.');
  const extPhotoName = photoName.substring(posPhotoName);
  const basePhotoName = photoName.substring(0, posPhotoName);

  return `${basePhotoName}${addPhotoName}${extPhotoName}`;
};
