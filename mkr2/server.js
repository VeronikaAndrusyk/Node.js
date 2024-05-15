const express = require('express');
const mongoose = require('mongoose');
const kioskRoutes = require('./routes/kiosk.route');
const startCountMagazinesJob = require('./jobs/countMagazines');
const { port, mongodb_uri } = require('./config');
const app = express();

mongoose.connect(mongodb_uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    startCountMagazinesJob(); // Запуск фонової задачі при підключенні до MongoDB
  })
  .catch(error => {
    console.error('MongoDB connection error:', error);
  });

app.use(express.json());

app.use('/kiosks', kioskRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    data: {
      message: 'Node.js ExApp',
    },
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
