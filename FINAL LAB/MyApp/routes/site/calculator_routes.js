// calculator.js

const express = require("express");
const CalculatorModel = require('../../models/calculatorModel');
let router = express.Router();

router.get("/calculator", async (req, res) => {
  req.session.myRequestedRoute = "/calculator";

  if (!req.session.calculatorModel) {
    req.session.calculatorModel = new CalculatorModel();
    console.log("I am in fetch request...");
  }

  const calculatorHistory = req.session.calculatorHistory || [];
  res.render('calculator/calculator', { calculatorHistory });
});

router.post("/calculator", async (req, res) => {
  const { num1, num2, operand } = req.body;
  const calculatorModel = req.session.calculatorModel;

  // Check if calculatorModel is an instance of CalculatorModel
  if (!(calculatorModel instanceof CalculatorModel)) {
    req.session.calculatorModel = new CalculatorModel();
    console.log("I did not found previous model...");
  }

  try {
    const result = req.session.calculatorModel.calculate(parseFloat(num1), parseFloat(num2), operand);
    req.session.calculatorHistory = req.session.calculatorModel.getCalculatorHistory();
    res.redirect("/calculator");
  } catch (error) {
    res.status(400).send(`Error: ${error.message}`);
  }
});

module.exports = router;
