const express = require('express');
const router = express.Router();

const controller = require('../controllers/interns.controller');

router.route('/')//маршрут для HTTP-запитів на кореневу сторінку.
    .get(controller.getInterns)
    .post(controller.createIntern);

router.route('/:internId')
    .get(controller.getIntern)
    .put(controller.updateIntern)
    .patch(controller.updateIntern)
    .delete(controller.deleteIntern);

module.exports = router;
