const { Kafka } = require('kafkajs');
const { v4: uuidv4 } = require('uuid');
const faker = require('@faker-js/faker').faker;
const axios = require('axios');

const kafka = new Kafka({ brokers: ['kafka:9092'] });
const producer = kafka.producer();

const warehouses = [
  { name: 'Cairo', lat: 30.0444, lng: 31.2357 },
  { name: 'Alexandria', lat: 31.2001, lng: 29.9187 },
  { name: 'Sharm El Sheikh', lat: 27.9158, lng: 34.3299 },
  { name: 'Mansoura', lat: 31.0379, lng: 31.3815 }
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomLocation() {
  return {
    lat: +(Math.random() * 180 - 90).toFixed(6),
    lng: +(Math.random() * 360 - 180).toFixed(6),
  };
}

async function generateItemArrivedEvent() {
  const warehouse = warehouses[Math.floor(Math.random() * warehouses.length)];
  const item = {
    warehouseId: warehouse.name,
    eventType: 'item-arrived',
    itemId: uuidv4(),
    itemName: faker.commerce.productName(),
    timestamp: new Date().toISOString(),
    quantity: getRandomInt(50, 200),
    threshold: getRandomInt(10, 30),
    currentStock: 0,
    location: getRandomLocation(),
  };
  item.currentStock = item.quantity;

  await producer.send({
    topic: 'events-topic',
    messages: [{ value: JSON.stringify(item) }],
  });
}

async function generateItemDispatchedEvent() {
  try {
    const res = await axios.get('http://dashboard-backend:8000/api/inventory/available');
    const items = res.data;
    if (items.length === 0) return;

    const selected = items[getRandomInt(0, items.length - 1)];
    const quantity = getRandomInt(1, selected.currentStock);

    const event = {
      eventType: 'item-dispatched',
      warehouseId: selected.warehouseId,
      itemId: selected.itemId,
      itemName: selected.itemName,
      timestamp: new Date().toISOString(),
      quantity,
      currentStock: selected.currentStock - quantity,
    };

    await producer.send({
      topic: 'events-topic',
      messages: [{ value: JSON.stringify(event) }],
    });
  } catch (err) {
    console.error('Error generating dispatched event:', err.message);
  }
}

async function generateLowStockEvent() {
  try {
    const res = await axios.get('http://dashboard-backend:8000/api/inventory/low-stock-candidates');
    const items = res.data;
    if (items.length === 0) return;

    const selected = items[getRandomInt(0, items.length - 1)];
    const event = {
      eventType: 'low-stock',
      warehouseId: selected.warehouseId,
      itemId: selected.itemId,
      itemName: selected.itemName,
      timestamp: new Date().toISOString(),
      quantity: selected.quantity,
      threshold: selected.threshold,
      currentStock: selected.currentStock,
    };

    await producer.send({
      topic: 'events-topic',
      messages: [{ value: JSON.stringify(event) }],
    });
  } catch (err) {
    console.error('Error generating low-stock event:', err.message);
  }
}

(async () => {
  await producer.connect();
  console.log('Producer connected.');

  setInterval(generateItemArrivedEvent, 10000);
  setInterval(generateItemDispatchedEvent, 15000);
  setInterval(generateLowStockEvent, 20000);
})();

