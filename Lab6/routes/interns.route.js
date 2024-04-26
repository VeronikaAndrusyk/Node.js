var express = require('express');
var router = express.Router();

const controller = require('../controllers/interns.controller')
const middleware = require('../middlewares/intern.middleware')

router.route('/')
  .get(controller.getInterns)
  .post(middleware.internDataValidation,controller.createIntern)

router.route('/:id')
  .get(middleware.internByIdValidation, controller.getIntern) // Оновлено тут
  .put(middleware.internByIdValidation, middleware.internDataValidation, controller.updateIntern)
  .delete(middleware.internByIdValidation, controller.deleteIntern)

module.exports = router;
