const express = require('express');
const router = express.Router();

const controller = require('../controllers/task2.controller');

router.route('/')
    .get(controller.calculateExpression);

module.exports = router;