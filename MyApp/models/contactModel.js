const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    message: String,
});

const contactModel = mongoose.model("contact", contactSchema);

module.exports = contactModel;