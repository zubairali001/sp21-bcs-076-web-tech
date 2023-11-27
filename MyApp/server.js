var expressLayouts = require("express-ejs-layouts");
let express = require("express");
let University = require("./models/university");
// run following command to install express
// npm i express
// install nodemon globally once in your system like
//npm i -g nodemon
let server = express();
server.use(express.static("public"));
server.set("view engine", "ejs");
server.use(express.json());
server.use(express.urlencoded());
server.use(expressLayouts);

var cookieParser = require("cookie-parser");
server.use(cookieParser());
var session = require("express-session");
server.use(session({ secret: "Shh, its a secret!" }));

const sessionAuth = require("./middlewares/sessionAuth");
const admin = require("./middlewares/admin");
const logger = require("./middlewares/logger");
const maintenance = require("./middlewares/maintenance");
server.use(logger);
server.use(require("./middlewares/common"));
// server.use(maintenance);
/**
 * First parameter is uri
 * Secind Parameter is a call =back function whihc will be called when a request to / with get method will be received
 *
 */
server.get("/hobbies", function (req, res) {
  res.render("hobbies");
});
server.get("/skills", sessionAuth, function (req, res) {
  res.render("skills");
});

server.get("/page-views", (req, res) => {
  // res.cookie("location", "Lahore");
  return res.send(req.cookies);
});
server.get("/posts/:month/:day", function (req, res) {
  return res.send(req.params);
});
server.use(
  "/admin",
  sessionAuth,
  admin,
  require("./routes/admin/universities")
);
server.use("/", require("./routes/site/auth"));
server.use("/", require("./routes/api/universities"));
server.use("/", require("./routes/api/courses"));

server.get("/", async function (req, res) {
  let University = require("./models/university");
  let universities = await University.find().sort({ city: 1 });
  res.render("homepage", { universities });
});
const mongoose = require("mongoose");
const { append } = require("express/lib/response");
//mongodb+srv://<username>:<password>@cluster0.vidd3.mongodb.net/
mongoose
  .connect("mongodb://localhost/sp21-bcs-a", { useNewUrlParser: true })
  .then(() => console.log("Connected to Mongo...."))
  .catch((error) => console.log(error.message));

server.listen(5211, function () {
  console.log("Server Started at localhost:5211");
});
