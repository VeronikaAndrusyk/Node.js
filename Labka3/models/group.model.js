const { Schema, model } = require('mongoose');

const groupSchema = new Schema({
    group: {
        type: String,
        required: true,
        
    },
    
});
module.exports = model('group', groupSchema);
