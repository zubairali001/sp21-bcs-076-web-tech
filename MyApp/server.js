// Server Start.
const express = require("express");
const app = express();

const port = 5100;

// session handling.
const session = require('express-session');

app.use(session({ secret: "Shh, its a secret!" }));

// app.use(require("./middlewares/common"));

// Url parser for sign up.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// Require Mongoose
const mongoose = require("mongoose");
const url = "mongodb+srv://zubairworkspace:katgyw-0hijxa-rIkraw@zubair.bvy4m1e.mongodb.net/portfolioDatabase?retryWrites=true&w=majority";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

}).then(() => {
  console.log("Succcessfully connected to Mongoose Database, Greate Zubair!!");
}).catch((e) => {
  console.log("Error is:" +e);
})

// Connection String.
// mongodb+srv://zubairworkspace:katgyw-0hijxa-rIkraw@zubair.bvy4m1e.mongodb.net/portfolioDatabase?retryWrites=true&w=majority
// App Start through port.

app.listen(port, () => {
  console.log("Server started Succesfilly");
})

// Ejs use to embed java script in html file. When move on browser, ejs will seperate the html and java script file.
// Set the ejs
app.set("view engine", "ejs");

// To declare the public folder as static folder.
app.use(express.static("public"));

const setDefaultValues = require("./middlewares/header_controller");
app.use(setDefaultValues);

const authenticatedUser = (req, res, next) => {
  if (req.session.isAuthenticated) {
    console.log("authenticated user");
    next();
  } else {
    console.log("unauthenticated user");
    res.redirect("/login");
    return;
  }
};

// Setting up layouts.
const expressLayout = require("express-ejs-layouts");
app.set("layout", "./layouts/main_layouts");
app.use(expressLayout);

// Getting the ejs.
app.get("/", authenticatedUser, (req, res)=> {
  res.render('landing_page');
});

app.get("/login", (req, res) => {
  const path = "auth/login";
  res.render(path, { showHeader: false });
});

app.get("/register", (req, res) => {
  const path = "auth/register";
  res.render(path, { showHeader: false });
});

const { createNewUser } = require("./models/register_operation");
const { findUserByEmailAndPassword } = require("./functions/login_user");

app.post("/register", async (req, res) => {
const { username, email, password } = req.body;

  try {
    await createNewUser(res, username, email, password);
    return;
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Internal Server Error");
  }
})

app.post("/login", async (req, res) => {
const { email, password } = req.body;

  try {
    const isUser = await findUserByEmailAndPassword(email, password);
    if(isUser){
      req.session.isAuthenticated = true;
      console.log("Logged in Succesfully.");
      res.redirect("/");
      return;
    }else{
      console.log("User not found");
    }
  } catch (error) {
    console.error("Error registering user:", error);
  }
})

// run following command to install express
// npm i express
// install nodemon globally once in your system like
//npm i -g nodemon

