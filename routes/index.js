const express = require('express');
const { query, validationResult } = require('express-validator');
const router = express.Router();
const Ad = require('../models/Ad');
const { getUrlPhotos } = require('../lib/utils');

// GET home page. 
router.get('/',[
query('sale').isBoolean().withMessage('must be true or false').optional({checkFalsy: true}),
query('price').isNumeric().withMessage('Must be numeric').optional({checkFalsy: true}),
query('minprice').isNumeric().withMessage('must be numeric').optional({checkFalsy: true}),
query('maxprice').isNumeric().withMessage('must be numeric').optional({checkFalsy: true}),
query('skip').isNumeric().withMessage('must be numeric').optional({checkFalsy: true}),
query('limit').isNumeric().withMessage('must be numeric').optional({checkFalsy: true})
], async function(req, res, next) {
  
  try{
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
    const select = null;
    const sort = req.query.sort;
    
    const filters = {}
    // valida si req.query tiene data y guarda en objeto filter
    if(name) filters.name = new RegExp('^' +req.query.name, "i");
    if(sale) filters.sale = sale;
    if(tags) filters.tags = {$in: tags}; 
    if(minprice) filters.price = {$gte: minprice};
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
    ads.forEach((ad) => {
      if(ad.photo) {
        ad.photo = getUrlPhotos(req, ad.photo);
      }
    });
    
    // renderiza
    res.render('index', { title: 'NodePop', ads:ads});

} catch (err) {
  next(err);
  }
});


module.exports = router;
