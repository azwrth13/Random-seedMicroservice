// server.js
const express = require('express');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
app.use(cors());

// Health check (optional)
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'random-seed' });
});

app.get('/api/random-seed', (req, res) => {
  // Use a 32-bit signed integer max: 2^31 - 1
  const MAX_SEED = 2 ** 31 - 1; // 2147483647

  const seed = crypto.randomInt(0, MAX_SEED);

  res.json({
    seed,
    timestamp: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Seed service running on port ${PORT}`);
});
