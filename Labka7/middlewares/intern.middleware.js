const createError = require('http-errors');
const ObjectId = require('mongoose').Types.ObjectId;
const internService = require('../services/interns.service');
const {InternSchema} = require('../joi_validation_schemas/interns.schemas')

async function internByIdValidation(req, res, next) {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            throw createError.BadRequest("intern id is not valid");
        }

        const intern = await internService.findById(id);

        if (!intern) {
            throw createError.NotFound("intern with such id not found");
        }

        next();
    } catch(err) {
        next(err);
    }
};
const internDataValidation = async (req, res, next) => {
    try {
        const { error } = InternSchema.validate(req.body);

        if (error) {
            throw createError.BadRequest(error.details[0].message);
        }

        const intern = await internService.findOne({
            $or: [
                { title: req.body.title },
            ]
        });

        if (intern) {
            throw createError.BadRequest("Intern with such title already exist");
        }

        next();
    } catch (err) {
        next(err);
    }
};
module.exports = {
    internByIdValidation,
    internDataValidation,
};