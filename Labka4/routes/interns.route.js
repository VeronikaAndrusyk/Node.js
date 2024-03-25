const express = require("express");
const router = express.Router();

const controller = require("../controllers/interns.controller");
const middleware = require('../middlewares/interns.middleware');

router
  .route("/") 
  .get(controller.getInterns)
  .post(middleware.internCreationDataValidation,controller.createIntern);

router
  .route("/:internId")
  .get(middleware.internByIdValidation,controller.getIntern)
  .put(middleware.internByIdValidation,controller.updateIntern)
  .patch(middleware.internByIdValidation,controller.updateIntern)
  .delete(middleware.internByIdValidation,controller.deleteIntern);

module.exports = router;
