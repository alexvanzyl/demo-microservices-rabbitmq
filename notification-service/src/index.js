const winston = require('winston');
const { consumeQueue } = require('./utils/rabbitMQConsumer');

// Bootstrap application
require('./bootstrap/logging')();


async function startConsumingQueue() {
  const msg = await consumeQueue('send-mail');
  console.log(msg.content);
  if (msg.content) {
    console.log(msg.content.toString());
  }
}

startConsumingQueue();