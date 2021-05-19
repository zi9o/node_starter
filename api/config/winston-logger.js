const winston = require('winston');
const winston_pg = require('./pg-transport');

// instantiate a new Winston Logger with file and console settings
const logger = new winston.createLogger({
  transports: [
    // Ability to add different loggers other than console
    new winston.transports.Console({
      level: 'error',
      handleExceptions: true,
      json: false,
      colorize: true,
    }),
    new winston_pg({
      level: 'info',
      handleExceptions: true,
      json: true,
    }),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

module.exports = logger;
