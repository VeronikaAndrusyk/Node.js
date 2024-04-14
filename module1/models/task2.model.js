const mongoose = require('mongoose');

const task2Schema = new mongoose.Schema({
    x: {
        type: Number,
        required: true
    },
    a: {
        type: Number,
        required: true
    },
    n: {
        type: Number,
        required: true
    },
    result: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('task2', task2Schema);
