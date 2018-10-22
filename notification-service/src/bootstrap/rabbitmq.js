const config = require('config');
const amqp = require('amqplib');
const winston = require('winston');

module.exports = async function bootstrapRabbitMQ() {
  const rabbitMQURI = config.get('rabbitmq.uri');
  try {
    return await amqp.connect(rabbitMQURI);
  } catch (err) {
    winston.error(`Could not connect to RabbitMQ using ${rabbitMQURI}...Retrying in 3 second`, err);
    setTimeout(bootstrapRabbitMQ, 3000);
  }
}
