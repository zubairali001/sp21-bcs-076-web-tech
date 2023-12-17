const express = require("express");
let router = express.Router();

const orderModel = require("../../models/orderModel");

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
});

router.post("/hireme/delete", async (req, res) => {
  console.log("I am in the delete request of order...");
  const orderIdToDelete = req.body.orderId;

  try {
    const orderToDelete = await orderModel.deleteOne({ _id: orderIdToDelete });

    if (orderToDelete) {
      console.log("Order deleted successfully.");
      res.redirect("/hireme");
    } else {
      console.log("Order not found");
      res.status(404).json({ message: "Order not found." });
    }
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;