const signUpModel = require("./register_model");

async function createNewUser(res, username, email, password) {
    console.log("Creating user...");

    let user = new signUpModel();


    if(user.email )

    user.username = username;
    user.email = email;
    user.password = password;

    const isEmailExists = await signUpModel.findOne({email: user.email});

    if(isEmailExists){
        console.log('Email already exists.');
        res.redirect('/login');
    }
    else{
        await user.save();
        console.log("User saved successfully.");
    }
}

module.exports= { createNewUser };