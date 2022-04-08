'use strict';

const adsData = require('./initDB.ads.json');
const readline = require('readline');
// conexión a la base de datos
const dbConnection = require('../lib/connectMongoose');
// cargar modelos
const Ad = require('../models/Ad')
const User = require('../models/User')

// capturar evento y llamar main
dbConnection.once('open', () => {
  main().catch(err => console.log('Hubo un error', err));
})

// main
async function main() {
  const deleteAds = await question('Estas seguro de que quieres borrar la base de datos? (si/no) ');
  if (!deleteAds) {
    process.exit(0);
  }

  // inicializar anuncios
  await initAds();

  // inicializar usuarios
  await initUsers();

  // desconectar la base de datos
  dbConnection.close();
}

// borra y crea usuarios (incializa usuarios)
async function initUsers() {
  // borrar los usuarios existentes
  const deleted = await User.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} usuarios.`);

  // crear usuarios
  const users = await User.insertMany([
    {
      email: 'admin@example.com',
      password: await User.hashPassword('1234'),
      rol: 'admin'
    },
    {
      email: 'user@example.com',
      password: await User.hashPassword('1234'),
      rol: 'user'
    }
  ]);
  users.length ? console.log(`Creados ${users.length} usuarios`) :
    console.log(`No se han creado usuarios`);
}

// borra y crea anuncios (incializa anuncios)
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

// Pregunta antes de inicializar BBDD
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