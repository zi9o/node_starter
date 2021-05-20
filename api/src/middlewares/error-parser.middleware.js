const winston = require('../../config/winston-logger.js');
const {CommonErrors} = require('../common/_errors');
const errorStructure = function (err) {
  const statusCode = err.isOperational ? err.commonType : err.statusCode === 404 ? 404 : 520;
  const error = {
    success: false,
    error: {
      statusCode,
      message: Array.isArray(err.details) ?
        'Format invalide' :
        (err.statusCode === 404 ?
          `Cette route n'existe pas ou a été déplacée` :
          ((typeof err.description === 'string') ? err.description : 'Erreur interne')
        ),
    },
  };
  if (Array.isArray(err.details)) {
    // JOI Validation's error details
    error.error['details'] = err.details;
  }
  return {error, status: statusCode};
};

module.exports = (err, req, res, next) => {
  if (err) {
    const {error, status} = errorStructure(err);
    // set locals, only providing error in development
    res.locals.message = error.error.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(status).send(error);
    // add this line to include winston logging
    winston.error(`[status]=${status} - [user]=${req.user && req.user.userId}`+
      ` - [url]=${req.originalUrl} - [method]=${req.method} - [IP]=${req.ip} - [message]=${error.error.message} `);
    // Internal Error fired programmatically
    if (status === CommonErrors.InternalServerError) {
      console.error(err.description);
      console.error(err);
    } else if (!err.isOperational && status !== CommonErrors.InternalServerError) {
      // unCaughtException
      console.error(err);
      // send email notifying DevOps(or us Dev ;) )
    }
  } else {
    next();
  }
};
