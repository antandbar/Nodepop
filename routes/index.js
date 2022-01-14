var express = require('express');
const { query, validationResult } = require('express-validator');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
