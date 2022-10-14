const mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
    fullName: {
        type: String
    },
    email: {
        type: String
    },
    description: {
        type: String
    }

})

mongoose.model('Student', studentSchema);