const signUpModel = require("../models/register_model");

const isUserExists = findUserByEmailAndPassword async(res, email, password) {
  const user =  await signUpModel.findOne({ email: email, password: password });

  if(user){
    req.session.user = { id: user._id, username: user.username };
    return true;
  }else{
    return false;;
  }
}

module.exports.isUserExists = isUserExists;