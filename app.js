const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).send('Welcome to Backend Development Fundamentals Lab 1!');
});

app.get('/about', (req, res) => {
  res.status(200).json({
    name: 'V.Venkatshiva',
    section: 'CSE-GAI-2c'
  });
});

app.get('/time', (req, res) => {
  const timestamp = new Date();
  res.status(200).json({ timestamp: timestamp.toISOString() });
});

app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found. Please check the URL and try again.'
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Express server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
