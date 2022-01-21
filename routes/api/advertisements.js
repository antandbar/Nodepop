'use strict';

const express = require('express');
const createError = require('http-errors');
const Ad = require('../../models/Advertisement');

const router = express.Router();

// GET /api/anuncios
// Devuelve una lista de Anuncios
router.get('/', async (req, res, next) => {
    try {

      const name = req.query.name;

      const filters = {}
      
      if (name) filters.name = name;

      const ad = await Ad.adfilters(filters);
    
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