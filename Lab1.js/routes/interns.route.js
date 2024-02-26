const express = require('express');
const router = express.Router();

const controller = require('../controllers/interns.controller');

router.route('/')
    .get(controller.getInterns)
    .post(controller.createIntern);

router.route('/:internId')
    .get(controller.getIntern)
    .patch(controller.updateIntern)
    .delete(controller.deleteIntern);

module.exports = router;