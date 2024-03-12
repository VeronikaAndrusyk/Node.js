const { Schema, model } = require('mongoose');

const internSchema = new Schema({
    lastName: {
        type: String,
        trim: true,
    },
    birthdate: {
        type: Date,
    },
    group: {
        type: String,
        trim: true,
    },
    faculty: {
        type: String,
        trim: true,
    },
    average: {
        type: Number,
    },
    workplace: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
}, 
{
    timestamps: true,//createdAt/ updatedAt
});

module.exports = model('intern', internSchema);
