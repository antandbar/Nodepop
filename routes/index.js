var express = require('express');
var router = express.Router();
const Ad = require('../models/Ad');
const { getUrlPhotos } = require('../lib/utils');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try{
    
    const name = req.query.name;
    const sale = req.query.sale;
    const minprice = req.query.minprice;
    const maxprice = req.query.maxprice;
    const tags = req.query.tags;      
    const skip = req.query.skip;
    const limit = req.query.limit;
    const select = req.query.select;
    const sort = req.query.sort;
    
    const filters = {}
    
    if(name) filters.name = new RegExp('^' +req.query.name, "i");
    if(sale) filters.sale = sale;
    if(tags) filters.tags = tags; 
    if(minprice) filters.price = {$gte: minprice};
    if(maxprice) filters.price = {$lte: maxprice};
    if(minprice && maxprice) filters.price = {$gte: minprice, $lte: maxprice};
    

    const ads = await Ad.adfilters(filters, skip, limit, select, sort);
  
    for(let ad of ads) {
      ad.photo = getUrlPhotos(req, ad.photo);
    }  
    
    res.render('index', { title: 'NodePop', ads:ads});

} catch (err) {
  next(err);
  }
});


module.exports = router;
