const winston = require('winston');
const rabbitMQOpen = require('../bootstrap/rabbitmq');

const onConnect = async () => rabbitMQOpen();

exports.consumeQueue = async (queueName) => {
  try {
    const amqpConn = await onConnect();
    if (!amqpConn) return null;

    const channel = await amqpConn.createChannel();
    const ok = await channel.assertQueue(queueName);
    if (!ok) return null;

    return channel.consume(queueName, (msg) => {
      if (msg !== null) {
        console.log(msg.content.toString());
        channel.ack(msg);
        return msg.content;
      }
      return null;
    });
  } catch (err) {
    winston.error(`There was a problem consuming ${queueName}`, err);
    return null;
  }
};
