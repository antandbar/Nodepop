const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const ads = require('./routes/api/ads');
const { isAPIRequest } = require('./lib/utils');
const swaggerMiddleware = require('./lib/swaggerMiddleware');
const app = express();
require('./lib/connectMongoose');
const i18n = require('./lib/i18nConfigure')
const LoginController = require('./controllers/loginController');
const jwtAuth = require('./lib/jwtAuth');


const loginController = new LoginController();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// swagger
app.use('/api-docs', swaggerMiddleware);


/**
 * Rutas de mi API
 */
 app.post('/apiv1/login', loginController.postJWT)
 app.use('/apiv1/ads',jwtAuth, ads);

// Setup de i18n
app.use(i18n.init)

/**
 * Rutas de mi website
 */
app.use('/', indexRouter);
app.use('/change-locale', require('./routes/change-locale'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

    // gestionando error de validación
    if (err.array) {
      err.status = 422;
      const errInfo = err.array({ onlyFirstError: true })[0];
      err.message = `(${errInfo.location}) ${errInfo.param} ${errInfo.msg}`;
    }
  
    res.status(err.status || 500);

      // si es un error en el API responde JSON
    if (isAPIRequest(req)) {
      res.json({ error: err.message });
      return;
    }
    
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

module.exports = app;
