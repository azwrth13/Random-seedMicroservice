// test-seed.js
const axios = require('axios');

const SEED_SERVICE_URL = 'http://localhost:3001/api/random-seed';

async function fetchSeedOnce() {
  try {
    const response = await axios.get(SEED_SERVICE_URL, {
      timeout: 3000, // 3 seconds
    });

    const data = response.data;

    if (
      typeof data.seed !== 'number' ||
      typeof data.timestamp !== 'string'
    ) {
      console.error('Invalid response shape:', data);
      return;
    }

    console.log('Received seed:', data.seed, 'at', data.timestamp);
  } catch (err) {
    if (err.code === 'ECONNREFUSED') {
      console.error('Cannot connect to seed service. Is server.js running?');
    } else if (err.code === 'ECONNABORTED') {
      console.error('Request to seed service timed out.');
    } else {
      console.error('Error calling seed service:', err.message);
    }
  }
}

async function main() {
  console.log('Calling random seed microservice 5 times...\n');

  for (let i = 1; i <= 5; i++) {
    console.log(`Request #${i}`);
    await fetchSeedOnce();
    console.log('---');
  }

  console.log('Done.');
}

main();
