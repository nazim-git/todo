const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let todo = new Schema({
    text: { type: String, require: true },
    completed: { type: Boolean, default: false },
}, { collection: 'todo' });

module.exports = mongoose.model('Todo', todo);