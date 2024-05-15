const mongoose = require('mongoose');

const kioskSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
    },
  mark: { 
    type: String, 
    required: true 
    },
  number_of_copies: { 
    type: Number, 
    required: true 
    },
  price: { 
    type: Number, 
    required: true 
}
});

const Kiosk = mongoose.model('Kiosk', kioskSchema);

module.exports = Kiosk;
