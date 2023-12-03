// Server Start.

const express = require("express");
const app = express();
const port = 5100;

// App Start through port.

app.listen(port, () => {
  console.log("Server started Succesfilly");
})

// Ejs use to embed java script in html file. When move on browser, ejs will seperate the html and java script file.

// Set the ejs
app.set("view engine", "ejs");



// To declare the public folder as static folder.
app.use(express.static("public"));

// Setting up layouts.
const expressLayout = require("express-ejs-layouts");
app.set("layout", "./layouts/main_layouts");
app.use(expressLayout);

// get the ejs.
app.get("/", (req, res)=> {
  res.render('landing_page');
});

// run following command to install express
// npm i express
// install nodemon globally once in your system like
//npm i -g nodemon

