'use strict';

const adsData = require('./initDB.ads.json');
const readline = require('readline');
// conexión a la base de datos
const dbConnection = require('../lib/connectMongoose');
// cargar modelos
const Ad = require('../models/Ad')

dbConnection.once('open', () => {
  main().catch(err => console.log('Hubo un error', err));
})


async function main() {
  const deleteAds = await question('Estas seguro de que quieres borrar la base de datos? (si/no) ');
  if (!deleteAds) {
    process.exit(0);
  }

  // inicializar anuncios
  await initAds();

  // desconectar la base de datos
  dbConnection.close();
}

async function initAds() {
  // borrar todos los documentos de anuncios que haya en la colección
  const deleted = await Ad.deleteMany();
  deleted.deletedCount ? console.log(`Eliminados ${deleted.deletedCount} anuncios`) :
    console.log(`No se han borrado anuncios`); 

  // crear anuncios iniciales
  const ads = await Ad.insertMany(adsData);
  ads.length ? console.log(`Creados ${ads.length} anuncios`) :
    console.log(`No se han creado anuncios`);
}

function question(text) {
  return new Promise((resolve, reject) => {
    // conectar readline a la consola
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    // hacemos pregunta
    rl.question(text, answer => {
      rl.close();
      if (answer.toLowerCase() === 'si') {
        resolve(true);
        return;
      }
      resolve(false);
    })
  });
}