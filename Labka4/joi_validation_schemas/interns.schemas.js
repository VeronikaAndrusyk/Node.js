const Joi = require('joi');

const InternCreateSchema = Joi.object({
    
    lastName: Joi.string()
        .min(2)
        .max(30)
        .required(),

    birthdate: Joi.date()
        .required(),

    group: Joi.string()
        .valid('A', 'B', 'C'),

    faculty: Joi.string()
        .min(2)
        .max(30)
        .required(),

    average: Joi.number()
        .min(0)
        .max(100) 
        .required(),

    workplace: Joi.string()
        .min(2)
        .max(100),

    city: Joi.string()
        .min(2)
        .max(30)
        .required()    
    
});

const InternUpdateSchema = Joi.object({
   
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
    InternCreateSchema,
    InternUpdateSchema,
};