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
            "name": "Bicicleta",
            "sale": true,
            "price": 230.15,
            "photo": "bici.jpg",
            "tags": [ "lifestyle", "motor"]
            },
            {
            "name": "iPhone 3GS",
            "sale": false,
            "price": 50.00,
            "photo": "iphone.png",
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
