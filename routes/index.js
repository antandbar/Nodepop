var express = require('express');
const { query, validationResult } = require('express-validator');
var router = express.Router();
const Ad = require('../models/Ad');
const { getUrlPhotos } = require('../lib/utils');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try{
    console.log(req.get('host'));
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

    const ads = await Ad.adfilters(filters, skip, limit, select, sort);

    for(let ad of ads) {
      ad.photo = getUrlPhotos(req, ad.photo);
    } 
    
    res.render('index', { title: 'NodePop', ads:ads});
} catch (err) {
  next(err);
  }
});

router.get('/adslist', [
  // validaciones
  query('talla').isNumeric().withMessage('debe ser numérica'),
  query('color').custom(color => { return color === 'red';}).withMessage('solo vale red') // validación custom
], (req, res, next) => {
  validationResult(req).throw();
  const talla = req.query.talla;
  const color = req.query.color;

  console.log(req.query);

  res.send(`ok la talla ${talla} y del color ${color}`);
});

router.get('/tagslist', [
  // validaciones
  query('talla').isNumeric().withMessage('debe ser numérica'),
  query('color').custom(color => { return color === 'red';}).withMessage('solo vale red') // validación custom
], (req, res, next) => {
  validationResult(req).throw();
  const talla = req.query.talla;
  const color = req.query.color;

  console.log(req.query);

  res.send(`ok la talla ${talla} y del color ${color}`);
});

router.post('/newad', (req, res, next) => {
  const nombre = req.body.nombre;

  console.log(req.body);

  res.send(`Recibido el nombre ${nombre}`);
});

module.exports = router;
