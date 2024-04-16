const Joi = require('joi');

const InternSchema = Joi.object({
   
    lastName: Joi.string()
        .min(2)
        .max(30),
        

    birthdate: Joi.date(),
        

    group: Joi.string()
        .valid('A', 'B', 'C'),

    faculty: Joi.string()
        .min(2)
        .max(30),

    average: Joi.number()
        .min(0)
        .max(100), 

    workplace: Joi.string()
        .min(2)
        .max(100),

    city: Joi.string()
        .min(2)
        .max(30),
});

module.exports = {
    InternSchema,
};