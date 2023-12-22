
function calculate(req,res, operand1, operand2, operand) {
   const num1 = parseFloat(operand1);
    const num2 = parseFloat(operand2);

    if (isNaN(num1) || isNaN(num2)) {
       console.log("Invalid operands");
    }
    let result;

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
        console.log("Invalid result");
    }

    console.log(result);
    result = parseFloat(result);

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
    res.redirect("/calculator")

}

module.exports.calculate = calculate;