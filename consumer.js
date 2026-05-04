const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'mi-consumidor',
  brokers: ['kafka:9092']
});

const consumer = kafka.consumer({ groupId: 'grupo-prueba' });
const topic = 'mensajes';

const run = async () => {
  await consumer.connect();
  console.log("Consumidor conectado a Kafka.");
  await consumer.subscribe({ topic: topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`📥 Mensaje recibido: "${message.value.toString()}"`);
    },
  });
};

run().catch(e => console.error('[consumer] Error:', e));