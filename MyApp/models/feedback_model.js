const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
    name: String,
    email: String,
    message: String,
});

const feedbackModel = mongoose.model("feedback", feedbackSchema);

module.exports = feedbackModel;