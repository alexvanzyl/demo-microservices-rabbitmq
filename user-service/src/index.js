const express = require('express');
const winston = require('winston');

// Init the application.
const app = express();

// Bootstrap application
require('./bootstrap/logging')();
require('./bootstrap/db')();
require('./bootstrap/routes')(app);

// Start the server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;
