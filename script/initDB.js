'use strict';

require('../lib/connectMongoose');
const Ad = require('../models/Advertisement')


async function initAd() {
    try {
        await Ad.deleteMany();
        console.log("Tabla Anuncios: registro borrados");
    } catch(err) {
        console.log(err);
    } 
    try {
        await Ad.insertMany(
        [
            {
            "nombre": "Bicicleta",
            "venta": true,
            "precio": 230.15,
            "foto": "bici.jpg",
            "tags": [ "lifestyle", "motor"]
            },
            {
            "nombre": "iPhone 3GS",
            "venta": false,
            "precio": 50.00,
            "foto": "iphone.png",
            "tags": [ "lifestyle", "mobile"]
            }
        ]
        
        );
        console.log("Tabla Anuncios: registro insertados");
    } catch (err) {
        console.log(err);
    }

}

initAd(); 
