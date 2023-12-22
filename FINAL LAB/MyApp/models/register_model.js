const mongoose = require("mongoose");

const registerSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

const registerModel = mongoose.model("user", registerSchema);

module.exports = registerModel;