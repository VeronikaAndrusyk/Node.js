const express = require("express");
const router = express.Router();
const controller = require("../controllers/rectangle.controller");
const middlewares = require("../middlewares/tasks.middleware");

router
  .route("/")
  .post(middlewares.rectangleDataValidation, controller.createRectangle);

module.exports = router;
