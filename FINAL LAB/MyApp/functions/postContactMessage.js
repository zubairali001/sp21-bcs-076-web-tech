const contactModel = require("../models/contactModel");

async function postContactMessage(req, res, name, email, phone, message) {
    console.log("Creating user...");

    let model = new contactModel();

    model.name = name;
    model.email = email;
    model.phone = phone;
    model.message = message;

    await model.save();
    console.log("Message Posted successfully.");
    req.session.flash = { type: "success", message: "Message Posted successfully to Admin..." };
    res.redirect("/");

}

module.exports= { postContactMessage };