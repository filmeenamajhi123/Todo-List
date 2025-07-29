const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    todoText: {
        required : true,
        type : String
    }
})

module.exports = mongoose.model('Todo-List',dataSchema)