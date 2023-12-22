class CalculatorModel {
  constructor() {
    this.calculatorHistory = [];
  }

  calculate(num1, num2, operand) {
    let result;

    switch (operand) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        if (num2 !== 0) {
          result = num1 / num2;
        } else {
          throw new Error('Cannot divide by zero.');
        }
        break;
      default:
        throw new Error('Invalid operand.');
    }

    const operation = { num1, num2, operand, result };
    this.calculatorHistory.push(operation);

    return result;
  }

  getCalculatorHistory() {
    return this.calculatorHistory;
  }
}

module.exports = CalculatorModel;
