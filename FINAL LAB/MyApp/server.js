// Server Start.
const express = require("express");
const app = express();


const port = 5100;

let cookieParser = require("cookie-parser");
const session = require('express-session');

app.use(cookieParser());
app.use(session({ secret: "Shh, its a secret!" }));

// Setting up sessions, flash.
app.use(require("./middlewares/common"));

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

const { postUserFeedback, fetchUserFeedbacks} = require("./operations/feedback_operation");
const authRoutes = require("./routes/site/auth");
const feedbackRoutes = require("./routes/site/feedback_routes");
const hirePageRoute = require("./routes/site/hirePageRoute");
const homeRoutes = require("./routes/site/homeRoutes");

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

// Setting up layouts.
const expressLayout = require("express-ejs-layouts");
app.set("layout", "./layouts/main_layouts");
app.use(expressLayout);

app.use(homeRoutes);

// feedback
app.use(feedbackRoutes);

app.use(authRoutes);

app.use(hirePageRoute);

app.get("/logout", (req, res) => {
  console.log("Logout request sent..");
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect("/");
});


// run following command to install express
// npm i express
// install nodemon globally once in your system like
//npm i -g nodemon

