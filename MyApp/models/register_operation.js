const signUpModel = require("./register_model");

async function createNewUser(req, res, username, email, password) {
    console.log("Creating user...");

    let user = new signUpModel();


    if(user.email )

    user.username = username;
    user.email = email;
    user.password = password;

    const isEmailExists = await signUpModel.findOne({email: user.email});

    if(isEmailExists){
        console.log('Email already exists.');
        req.session.flash = { type: "fail", message: "User already registered." };
        res.redirect('/register');
    }
    else{
        await user.save();
        console.log("User saved successfully.");
        res.redirect("/login");
    }
}

module.exports= { createNewUser };