const { Kafka } = require('kafkajs');
const axios = require('axios');
require('dotenv').config();

const kafka = new Kafka({
  clientId: 'simulation-consumer',
  brokers: [process.env.KAFKA_BROKER || 'kafka:9092'],
});

const consumer = kafka.consumer({ groupId: 'simulation-group' });

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const run = async (retryCount = 0) => {
  try {
    await delay(5000);
    await consumer.connect();
    console.log('✅ Consumer connected');

    await consumer.subscribe({ topic: 'events-topic', fromBeginning: true });
    console.log('📌 Subscribed to topic: events-topic');

    await consumer.run({
      eachMessage: async ({ topic, message }) => {
        const event = JSON.parse(message.value.toString());
        console.log(`📥 Received event: ${event.eventType}`);

        if (!event.warehouseId) {
          console.log('❌ Event missing warehouseId, skipping...');
          return;
        }

        try {
          // تخزين الحدث + تحديث المخزون بناءً على نوع الحدث
          switch (event.eventType) {
            case 'item-arrived':
              await axios.post('http://dashboard-backend:8000/api/events/item-arrived', event);
              console.log('✅ Event stored at /events/item-arrived');

              await axios.post('http://dashboard-backend:8000/api/inventory/arrived', event);
              console.log('🧮 Inventory updated via /inventory/arrived');
              break;

            case 'item-dispatched':
              await axios.post('http://dashboard-backend:8000/api/events/item-dispatched', event); // تحتاجي تضيفي الراوت ده
              console.log('✅ Event stored at /events/item-dispatched');

              await axios.post('http://dashboard-backend:8000/api/inventory/dispatched', event);
              console.log('🧮 Inventory updated via /inventory/dispatched');
              break;

            case 'low-stock':
              await axios.post('http://dashboard-backend:8000/api/events/low-stock', event); // تحتاجي تضيفي الراوت ده
              console.log('⚠️ Low stock event stored');
              break;

            default:
              console.log('⚠️ Unknown event type:', event.eventType);
          }

        } catch (err) {
          console.error('❌ Error communicating with backend:', err.message);
        }
      },
    });

  } catch (err) {
    console.error('❌ Error in consumer:', err.message);

    if (retryCount < 5) {
      const wait = 5000;
      console.log(`🔁 Retry ${retryCount + 1}/5 in ${wait / 1000} sec...`);
      await delay(wait);
      return run(retryCount + 1);
    } else {
      console.log('❌ Max retries reached. Exiting...');
    }
  }
};

run().catch(console.error);

