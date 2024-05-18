const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    customProperties: [{ 
        title: String, 
        fallbackValue: String 
    }],
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    },
});

const List = mongoose.model('List', listSchema);

module.exports = List;
