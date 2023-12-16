const express = require("express");
let router = express.Router();

const authenticatedUser = require("../../middlewares/auth_authentication");
// Hire page Route ==========================:

router.get("/hireme", authenticatedUser,(req, res) => {
  const path = "hire/hirePage";
  res.render(path, { showHeader: true });
});

module.exports = router;