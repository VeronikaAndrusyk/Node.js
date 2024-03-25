const express = require("express");
const router = express.Router();

const controller = require("../controllers/interns.controller");
const middleware = require("../middlewares/interns.middleware");

router
  .route("/") // маршрут для HTTP-запитів на кореневу сторінку.
  .get(controller.getInterns)
  .post(controller.createIntern);

router.route("/lastName/:internLastName") //переставлення цього маршруту перед маршрутами з :internId
  .get(middleware.internByIdValidation, controller.getInternByLastName);

router
  .route("/:internId")
  .get(middleware.internByIdValidation, controller.getIntern)
  .put(middleware.internByIdValidation, controller.updateIntern)
  .patch(middleware.internByIdValidation, controller.updateIntern)
  .delete(middleware.internByIdValidation, controller.deleteIntern);

module.exports = router;
