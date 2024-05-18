const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    listId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'List', 
        required: true 
    },
    customProperties: { 
        type: Object, 
        default: {} 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    },
    unsubscribed: { 
        type: Boolean, 
        default: false 
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
