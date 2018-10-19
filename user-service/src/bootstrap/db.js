const config = require('config');
const mongoose = require('mongoose');
const winston = require('winston');

/**
 * Attempt to connect to MongoDB, if fails log the error.
 */
module.exports = async function bootstrapDB() {
  const db = config.get('db');
  try {
    await mongoose.connect(db, { useNewUrlParser: true });
  } catch (err) {
    winston.error(`Could not connect to MongoDB using ${db}`, err);
  }
};
