const express = require('express');
const router = express.Router();

const controllers = require('../controllers/interns.controller');
const middlewares = require('../middlewares/interns.middleware');
const { authenticationCheck } = require('../middlewares/auth.middleware');

router.route('/')
    .post(middlewares.internCreationDataValidation, controllers.createIntern);

// Router-level middleware. Executed every time the app receives a request and checked authentication
router.use(authenticationCheck);

router.route('/')
    .get(controllers.getInterns);

router.route('/:internId')
    .get(middlewares.internByIdValidation, controllers.getIntern)
    .patch(middlewares.internByIdValidation, middlewares.internUpdateDataValidation, controllers.updateIntern)
    .delete(middlewares.internByIdValidation, controllers.deleteIntern);

module.exports = router;