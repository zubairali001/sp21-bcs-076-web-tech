const express = require("express");
let router = express.Router();

const { placeUserOrder, fetchUserOrders} = require("../../operations/placeOrderOperation");
const authenticatedUser = require("../../middlewares/auth_authentication");
// Hire page Route ==========================:

router.get("/hireme", authenticatedUser, async(req, res) => {
  const path = "hire/hirePage";
  let orders = await fetchUserOrders();
  res.render(path, {orders});
});

router.post("/hireme", async (req, res) => {
  try {
    const userEmail = req.session.userEmail;
    console.log("User Email is: "+userEmail);
    await placeUserOrder(res, req.body.name, userEmail, req.body.requiremnts, req.body.price, req.body.message);

    return;
  } catch (error) {
    console.error("Error occur while placing user order: ", error);
  }
})

module.exports = router;