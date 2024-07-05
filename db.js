const mongoose  = require('mongoose');
require("dotenv").config();
const mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL);

const todoSchema = mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean
})
const todo = mongoose.model("todo", todoSchema);

module.exports = todo;