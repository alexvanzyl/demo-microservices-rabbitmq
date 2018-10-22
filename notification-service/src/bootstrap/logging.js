const winston = require('winston');

/**
 * Here we define how winston will handel logging of
 * exceptions and which files to log too.
 */
module.exports = function logging() {
  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: 'uncaughtExceptions.log' }),
  );

  process.on('unhandledRejection', (err) => {
    throw err;
  });

  winston.add(new winston.transports.File({
    filename: 'logfile.log',
  }));

  if (process.env.NODE_ENV !== 'production') {
    winston.add(new winston.transports.Console({
      colorize: true,
      prettyPrint: true,
    }));
  }
};
