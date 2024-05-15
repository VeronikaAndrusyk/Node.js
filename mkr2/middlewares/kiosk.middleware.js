const createError = require('http-errors');
const ObjectId = require('mongoose').Types.ObjectId;
const internService = require('../services/interns.service');
const { InternCreateSchema, InternUpdateSchema } = require('../joi_validation_schemas/interns.schemas');

async function internByIdValidation(req, res, next) {
    try {
        const { internId } = req.params;

        if (!ObjectId.isValid(internId)) {
            throw createError.BadRequest("Intern id is not valid");
        }

        const intern = await internService.findById(internId);

        if (!intern) {
            throw createError.NotFound("Intern with such id not found");
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
    internDataValidation
    
};