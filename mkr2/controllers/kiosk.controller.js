const kioskService = require('../services/kiosk.service');

async function createKiosk(req, res) {
  try {
    const kiosk = await kioskService.create(req.body);
    res.status(201).json(kiosk);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getKiosks(req, res) {
  try {
    const { searchString, page, perPage } = req.query;
    const kiosks = await kioskService.find({ searchString, page, perPage });
    res.status(200).json(kiosks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function uploadFile(req, res) {
  const filePath = req.file.path;
  const results = [];
  const csv = require('csv-parser');
  const fs = require('fs');

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        await kioskService.bulkCreate(results);
        res.send('File uploaded and data saved to database');
      } catch (err) {
        res.status(500).send(err.message);
      }
    });
}

module.exports = {
  createKiosk,
  getKiosks,
  uploadFile,
};
