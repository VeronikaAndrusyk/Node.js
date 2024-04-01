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
const internCreationDataValidation = async (req, res, next) => {
    try {
        const { error } = InternCreateSchema.validate(req.body);

        if (error) {
            throw createError.BadRequest(error.details[0].message);
        }

        const intern = await internService.findOne({
            $or: [
                { lastName: req.body.lastName },
                { average: req.body.average },
            ]
        });

        if (intern) {
            throw createError.BadRequest("Intern with such  lastName or average already exist");
        }

        next();
    } catch (err) {
        next(err);
    }
};

const internUpdateDataValidation = async (req, res, next) => {
    try {
        const { error } = InternUpdateSchema.validate(req.body);

        if (error) {
            throw createError.BadRequest(error.details[0].message);
        }

        if (req.body.lastName || req.body.average) {
            const orExpressions = [];

            if (req.body.phoneNumber) {
                orExpressions.push({ lastName: req.body.lastName });
            }

            if (req.body.average) {
                orExpressions.push({ average: req.body.average });
            }

            const intern = await internService.findOne({
                _id: {
                    $ne: req.params.internId
                },
                $or: orExpressions
            });
    
            if (intern) {
                throw createError.BadRequest("Intern with such last name or average already exist");
            }
        }

        next();
    } catch (err) {
        next(err);
    }
};
module.exports = {
    internByIdValidation,
    internCreationDataValidation,
    internUpdateDataValidation,
};