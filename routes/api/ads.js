'use strict';

const express = require('express');
const { body, query, validationResult } = require('express-validator');
const Ad = require('../../models/Ad');
const { getUrlPhotos } = require('../../lib/utils');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mimeTypes = require('mime-types');

// Se parametriza multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../public/images','ads'),
  filename: function(req,file,cb) {
    cb('',`${Date.now()}${file.originalname.replace(/\.[^/.]+$/, "")}.${mimeTypes.extension(file.mimetype)}`);
  }
});

const upload = multer({
  storage:storage
})


// GET /apiv1/ads
// Devuelve una lista de Anuncios con filtros
router.get('/',[
query('sale').isBoolean().withMessage('must be true or false').optional({checkFalsy: true}),
query('price').isNumeric().withMessage('must be numeric').optional({checkFalsy: true}),
query('minprice').isNumeric().withMessage('must be numeric').optional({checkFalsy: true}),
query('maxprice').isNumeric().withMessage('must be numeric').optional({checkFalsy: true}),
query('skip').isNumeric().withMessage('must be numeric').optional({checkFalsy: true}),
query('limit').isNumeric().withMessage('must be numeric').optional({checkFalsy: true})
], async (req, res, next) => {
  
  try {
    // lanza en caso de validar error
    validationResult(req).throw();
    // recupera query
    const name = req.query.name;
    const sale = req.query.sale;
    const price = req.query.price;
    const minprice = req.query.minprice;
    const maxprice = req.query.maxprice;
    const tags = req.query.tags;      
    const skip = req.query.skip;
    const limit = req.query.limit;
    const select = req.query.select;
    const sort = req.query.sort;
    
    const filters = {}
    // valida si req.query tiene data y guarda en objeto filter
    if(name) filters.name = new RegExp('^' +req.query.name, "i");
    if(sale) filters.sale = sale;
    if(tags) filters.tags = {$in: tags}; 
    if(price) {
      filters.price = price;
    } else {
      if(minprice) filters.price = {$gte: minprice};
      if(maxprice) filters.price = {$lte: maxprice};
      if(minprice && maxprice) filters.price = {$gte: minprice, $lte: maxprice};
    }
   
    // hace consulta
    const ads = await Ad.adfilters(filters, skip, limit, select, sort);
  
    // setea url fotos
    for(let ad of ads) {
      if(ad.photo) {
        ad.photo = getUrlPhotos(req, ad.photo);
      }
    }  
    
    // responde en Json
    res.json({ results: ads })

  } catch (err) {
    next(err);
  }
});

// POST /apiv1/ads
// Crea un nuevo anuncio
router.post('/' , upload.single('photo'),
[body('price').isNumeric().withMessage('must be numeric').optional({checkFalsy: true}),
body('sale').isBoolean().withMessage('must be true or false').optional({checkFalsy: true})]
, async (req, res, next) => {
  try {
    // lanza en caso de validar error
    validationResult(req).throw();

    // recupera parametros en body
    const adData = {...req.body,
    ...(typeof(req.file) !== 'undefined' && {photo:req.file.filename})};

    // crea objeto con datos a guardar
    const ad = new Ad(adData);

    // Guarda en BBDD
    const adGuardado = await ad.save();

    // Se llama al micro servicio
    if(typeof(req.file) !== 'undefined') ad.createThumbnail(req.file.filename); 

    // devuelve json con objeto guardado
    res.status(201).json({ result: adGuardado });

  } catch (err) {
    next(err);
  }
});

// GET /apiv1/ads/tagslist
// Devuelve lista de tags existentes
router.get('/tagslist', async (req, res, next) => {
  try {
    
    // hace consulta
    const ad = await Ad.tags();
    
    // devuelve json con listado de tags existentes
    res.json({ results: ad })
  
    } catch (err) {
      next(err);
    }
});

module.exports = router;