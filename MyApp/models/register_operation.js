const signUpModel = require("./register_model");

const createNewUser = async (username, email, password) => {
    console.log("Creating user...");

    let user = new signUpModel();

    user.username = username;
    user.email = email;
    user.password = password;

    await user.save();

    console.log("User saved successfully.");
}

module.exports.createNewUser = createNewUser;