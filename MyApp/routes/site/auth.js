const express = require("express");
let router = express.Router();

const { createNewUser } = require("../../models/register_operation");
const { findUserByEmailAndPassword } = require("../../functions/login_user");

// Login Auth ==========================:

router.get("/login", (req, res) => {
  const path = "auth/login";
  res.render(path, { showHeader: false });
});

router.post("/login", async (req, res) => {
const { email, password } = req.body;

  try {
    const isUser = await findUserByEmailAndPassword(email, password);
    if(isUser){
      req.session.isAuthenticated = true;
      console.log("Logged in Succesfully.");
      req.session.user = isUser;
      req.session.userEmail = email;
      req.session.flash = { type: "success", message: "Logged in Successfully" };
      console.log("Requested Route = "+ req.session.myRequestedRoute);
      res.redirect(req.session.myRequestedRoute ?? "/");
      return;
    }else{
      console.log("User not found");
      req.session.flash = { type: "fail", message: "User not found, Not have account? Please Sign Up." };
      res.redirect("/login");
    }
  } catch (error) {
    console.error("Error registering user:", error);
  }
})

// SignUp Auth ==========================:

router.get("/register", (req, res) => {
  const path = "auth/register";
  res.render(path, { showHeader: false });
});

router.post("/register", async (req, res) => {
const { username, email, password } = req.body;

  try {
    await createNewUser(req, res, username, email, password);
    return;
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Internal Server Error");
  }
})

module.exports = router;