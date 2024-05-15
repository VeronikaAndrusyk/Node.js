const express = require('express');
const router = express.Router();
const kioskController = require('../controllers/kiosk.controller');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/', kioskController.createKiosk);
router.get('/', kioskController.getKiosks);
router.post('/upload', upload.single('file'), kioskController.uploadFile);

module.exports = router;
