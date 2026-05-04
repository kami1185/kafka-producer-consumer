const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'mi-productor',
  brokers: ['kafka:9092'] // 'kafka' es el nombre del servicio en docker-compose.yml
});

const producer = kafka.producer();
const topic = 'mensajes';

const run = async () => {
  await producer.connect();
  console.log("Productor conectado a Kafka.");

  let messageCount = 0;
  setInterval(async () => {
    try {
      const message = `Mensaje número ${messageCount}`;
      await producer.send({
        topic: topic,
        messages: [{ value: message }],
      });

      console.log(`📤 Mensaje enviado: "${message}"`);
      messageCount++;
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  }, 3000); // Enviar cada 3 segundos
};

run().catch(e => console.error('[producer] Error:', e));