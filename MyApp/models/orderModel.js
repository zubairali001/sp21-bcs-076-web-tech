const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    name: String,
    email: String,
    requirement: String,
    price: String,
    message: String,
});

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;