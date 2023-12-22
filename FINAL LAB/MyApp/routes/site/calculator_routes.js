const express = require("express");
let router = express.Router();

router.get("/calculator",(req,res)=>{
    req.session.resultsArray = req.session.resultsArray || [];
    const operations = req.session.resultsArray;
    res.render("calculator/calculator",{operations})
})

router.post("/calculator",(req,res)=>{
    req.session.resultsArray = req.session.resultsArray || [];
    const operand1 = req.body.num1
    const operand2 = req.body.num2

    const num1 = parseFloat(operand1);
    const num2 = parseFloat(operand2);

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: 'Invalid operands' });
    }
    let result;

     let operand = req.body.operand;
    switch(operand){
        case '+':
            result = num1 + num2
            break
        case '-':
            result = num1 - num2
            break
        case '/':
            result = num1 / num2
            break
        case '*':
            result = num1 * num2
            break

    }
    if (isNaN(result) || !isFinite(result)) {
        return res.status(400).json({ error: 'Invalid result' });
    }
    console.log(result)
    result = parseFloat(result)
    const resultObject = {
        num1:num1,
        num2:num2,
        operand:operand,
        result: result

    }

    req.session.resultsArray.push( {
        num1:num1,
        num2:num2,
        operand:operand,
        result: result
    })
    console.log(req.session.resultsArray)
    const operations = req.session.resultsArray
    console.log(operations)
    res.redirect("/calculator")
})

module.exports = router