const orderModel = require("../models/orderModel");

async function placeUserOrder(res, name, email, requirement, message) {
    let order = new orderModel();

    order.name = name;
    order.email = email;
    order.requirement = requirement;
    order.message = message;

    console.log('Placing order...');
    await order.save();
    console.log("Order Placed succesfull.");
    res.redirect("/hireme");
}

async function fetchUserOrders(userEmail){
    let orders = await orderModel.find({email: userEmail});
    console.log("User email is: " +userEmail)
    console.log("Fetched orders: "+orders);
    return orders;
}

module.exports.placeUserOrder = placeUserOrder;
module.exports.fetchUserOrders = fetchUserOrders;
