const winston = require('winston');
const rabbitMQConnection = require('./bootstrap/rabbitmq');

// Email queue consumer
const queueName = 'send-email';
const consumeQueue = async () => {
  rabbitMQConnection.then((conn) => {
    return conn.createChannel();
  }).then((ch) => {
    return ch.assertQueue(queueName).then((ok) => {
      return ch.consume(queueName, (msg) => {
        if (msg !== null) {
          winston.log(msg.content.toString());
          ch.ack(msg);
        }
      });
    });
  });
};

consumeQueue();
