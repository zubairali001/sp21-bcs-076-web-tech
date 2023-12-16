const orderModel = require("../models/orderModel");

async function placeUserOrder(res, name, email, requirement, price, message) {
    let order = new orderModel();

    order.name = name;
    order.email = email;
    order.requirement = requirement;
    order.price = price;
    order.message = message;

    console.log("Name:"+name+"Email:"+email+"Message"+message);
    console.log('Placing order...');
    await order.save();
    console.log("Order Placed succesfull.");
    res.redirect("/hireme");
}

async function fetchUserOrders(){
    let orders = await orderModel.find();
    console.log("Fetched orders: "+orders);
    return orders;
}

module.exports.placeUserOrder = placeUserOrder;
module.exports.fetchUserOrders = fetchUserOrders;
