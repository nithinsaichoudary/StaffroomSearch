const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    facultyID: {
        type: String,
        required: true,
        unique: true
    },
    roomNumber: {
        type: String,
        required: true
    },
    block: {
        type: String,
        required: false  
    },
    phoneNumber: {
        type: String,
        required: false  
    },
    email: {
        type: String,
        required: false,  
        unique: true,     
        match: [/.+@.+\..+/, 'Please enter a valid email address'] 
    }
}, { timestamps: true });

module.exports = mongoose.model('Faculty', FacultySchema);
