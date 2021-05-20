// Retrieve app Config while checking for missing Env variables
const {config} = require('../config');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const errorParser = require('./middlewares/error-parser.middleware');


const indexRouter = require('./routes/index.route');
const authRouter = require('./routes/auth.route');

const app = express();
if (config.isProduction) {
  app.use(helmet());
}

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Passing the request url to environment locals
app.use(function (req, res, next) {
  res.locals.host = req.protocol + '://' + req.hostname;
  res.locals.url = req.protocol + '://' + req.headers.host + req.originalUrl;
  next();
});

// Environment dependent middleware
if (process.env.NODE_ENV === 'development') {
  // Disable views cache
  app.set('view cache', false);
} else if (process.env.NODE_ENV === 'production') {
  app.locals.cache = 'memory';
}

// Request body parsing middleware should be above methodOverride
app.use(bodyParser.json({ limit: "20mb" }))
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true, parameterLimit: 500 }));

// Attach routes

app.use('/v1/', indexRouter);
app.use('/v1/', authRouter);
app.use(errorParser);


module.exports = app;
