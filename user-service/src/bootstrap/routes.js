const express = require('express');
const helmet = require('helmet');
const user = require('../user/routes');
const error = require('../middleware/error');

/**
 * Register routes and any middleware that should
 * be active early in the application stack.
 */
module.exports = function bootstrapRoutes(app) {
  app.use(helmet());
  app.use(express.json());
  app.use('/api/users', user);
  app.use(error);
};
