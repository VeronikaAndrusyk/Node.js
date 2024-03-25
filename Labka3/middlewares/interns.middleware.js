const createError = require('http-errors');
const ObjectId = require('mongoose').Types.ObjectId;
const internService = require('../services/interns.service');

async function internByIdValidation(req, res, next) {
    try {
        const { internId } = req.params;

        if (ObjectId.isValid(internId)) {
            const intern = await internService.findById(internId);

            if (!intern) {
                throw createError.NotFound("Intern with such id not found");
            }
        } else {
            const intern = await internService.findByLastName(internId); // Пошук за прізвищем

            if (!intern) {
                throw createError.NotFound("Intern with such surname not found");
            }
        }

        next();
    } catch(err) {
        next(err);
    }
}

module.exports = {
    internByIdValidation,
};
