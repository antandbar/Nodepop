'use strict';

const express = require('express');
const createError = require('http-errors');
const Ad = require('../../models/Ad');

const router = express.Router();

// GET /api/anuncios
// Devuelve una lista de Anuncios
router.get('/', async (req, res, next) => {
  try {

    const name = req.query.name;
    const sale = req.query.sale;
    const price = req.query.price;
    const tags = req.query.tags;      
    const skip = req.query.skip;
    const limit = req.query.limit;
    const select = req.query.select;
    const sort = req.query.sort;
    
    const filters = {}
    
    if(name) filters.name = name;
    if(sale) filters.sale = sale;
    if(tags) filters.tags = tags; 
    if(price) filters.price = {$lte: price};
    console.log(filters);
    

    const ad = await Ad.adfilters(filters, skip, limit, select, sort);
  
    res.json({ results: ad })

  } catch (err) {
    next(err);
  }
    
  });

// GET /api/anuncios/tag
// Devuelve lista de tags existentes
  router.get('/tagslist', async (req, res, next) => {
    try {
  
      const ad = await Ad.tags();
      
    
      res.json({ results: ad })
    
      } catch (err) {
        next(err);
      }
    });


  // POST /api/anuncios
// Crea un nuevo anuncio
router.post('/', async (req, res, next) => {
  try {
    const adData = req.body;

    // creo un objeto de agente EN MEMORIA
    const ad = new Ad(adData);

    const adGuardado = await ad.save();

    res.status(201).json({ result: adGuardado });

  } catch (err) {
    next(err);
  }
})




module.exports = router;