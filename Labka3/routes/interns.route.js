const express = require("express");
const router = express.Router();

const controller = require("../controllers/interns.controller");
const middleware = require("../middlewares/interns.middleware");

router
  .route("/") // маршрут для HTTP-запитів на кореневу сторінку.
  .get(controller.getInterns)
  .post(middleware.validateGroup,controller.createIntern);



router
  .route("/:internId")
  .get(middleware.validateGroup, controller.getIntern)
  .put(middleware.validateGroup, controller.updateIntern)
  .patch(middleware.validateGroup, controller.updateIntern)
  .delete(middleware.validateGroup, controller.deleteIntern);

module.exports = router;
