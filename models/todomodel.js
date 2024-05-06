const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
    item: {
        type: String,
        required: true,
    }
});

const todoModel = mongoose.model("mytodolist", TodoSchema);

module.exports = todoModel;