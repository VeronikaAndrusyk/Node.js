const mongoose = require('mongoose');

const rectangleSchema = new mongoose.Schema({
    length: {
        type: Number,
        required: true
    },
    width: {
        type: Number,
        required: true
    },
    area: {
        type: Number,
        
    },
    perimeter: {
        type: Number,
        
    },
}, {
    timestamps: true,
});  

module.exports = mongoose.model('rectangle', rectangleSchema);
