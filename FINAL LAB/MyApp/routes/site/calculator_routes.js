const express = require("express");
let router = express.Router();

const {calculate} = require("../../functions/calculate");

router.get("/calculator",(req,res)=>{
    req.session.resultsArray = req.session.resultsArray || [];
    const operations = req.session.resultsArray;
    res.render("calculator/calculator",{operations})
})

router.post("/calculator",(req,res)=>{
    req.session.resultsArray = req.session.resultsArray || [];
    const operand1 = req.body.num1
    const operand2 = req.body.num2

    try{
        calculate(req, res, operand1, operand2, req.body.operand);
    }catch(e){
        console.log(e);
    }
})

module.exports = router