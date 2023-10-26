const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false,
        required: true
    }
});

const Task = mongoose.model("Tasks", taskSchema);

module.exports = Task
