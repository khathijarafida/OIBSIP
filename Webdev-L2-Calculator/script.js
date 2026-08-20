const display = document.getElementById("display");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

const decimalButton = document.getElementById("decimal");
const equalsButton = document.getElementById("equals");
const clearButton = document.getElementById("clear");
const backspaceButton = document.getElementById("backspace");

let firstNumber = "";
let secondNumber = "";
let currentOperator = "";
let resultDisplayed = false;


// NUMBER BUTTONS
numberButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        if (display.value === "Error") {
            clearCalculator();
        }

        // Start a new calculation after =
        if (resultDisplayed) {
            display.value = button.textContent;
            firstNumber = button.textContent;
            secondNumber = "";
            currentOperator = "";
            resultDisplayed = false;
            return;
        }

        // Enter second number
        if (currentOperator !== "") {

            if (secondNumber === "") {
                secondNumber = button.textContent;
            }
            else {
                secondNumber += button.textContent;
            }

            display.value =
                firstNumber + " " +
                getOperatorSymbol(currentOperator) + " " +
                secondNumber;

        }

        // Enter first number
        else {

            if (firstNumber === "" || firstNumber === "0") {
                firstNumber = button.textContent;
            }
            else {
                firstNumber += button.textContent;
            }

            display.value = firstNumber;
        }

    });

});


// OPERATOR BUTTONS
operatorButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        if (display.value === "Error") {
            return;
        }

        const operator = button.dataset.operator;

        // If no number has been entered
        if (firstNumber === "") {
            return;
        }

        // If operator is pressed again, replace it
        if (currentOperator !== "" && secondNumber === "") {
            currentOperator = operator;

            display.value =
                firstNumber + " " +
                getOperatorSymbol(currentOperator);

            return;
        }

        // Sequential calculation
        if (currentOperator !== "" && secondNumber !== "") {

            const answer = calculate(
                parseFloat(firstNumber),
                parseFloat(secondNumber),
                currentOperator
            );

            if (answer === "Error") {
                display.value = "Error";
                return;
            }

            firstNumber = answer.toString();
            secondNumber = "";
        }

        currentOperator = operator;

        display.value =
            firstNumber + " " +
            getOperatorSymbol(currentOperator);

});

});


// DECIMAL BUTTON
decimalButton.addEventListener("click", function() {

    if (display.value === "Error") {
        clearCalculator();
        return;
    }

    // Decimal for second number
    if (currentOperator !== "") {

        if (secondNumber === "") {
            secondNumber = "0.";
        }
        else if (!secondNumber.includes(".")) {
            secondNumber += ".";
        }

        display.value =
            firstNumber + " " +
            getOperatorSymbol(currentOperator) + " " +
            secondNumber;

        return;
    }

    // Decimal for first number
    if (!firstNumber.includes(".")) {

        if (firstNumber === "") {
            firstNumber = "0.";
        }
        else {
            firstNumber += ".";
        }

        display.value = firstNumber;
    }

});


// EQUALS BUTTON
equalsButton.addEventListener("click", function() {

    if (
        firstNumber === "" ||
        currentOperator === "" ||
        secondNumber === ""
    ) {
        return;
    }

    const answer = calculate(
        parseFloat(firstNumber),
        parseFloat(secondNumber),
        currentOperator
    );

    if (answer === "Error") {
        display.value = "Error";
        return;
    }

    display.value = answer;

    firstNumber = answer.toString();
    secondNumber = "";
    currentOperator = "";
    resultDisplayed = true;

});


// BACKSPACE
backspaceButton.addEventListener("click", function() {

    if (display.value === "Error") {
        clearCalculator();
        return;
    }

    // Remove second number
    if (currentOperator !== "" && secondNumber !== "") {

        secondNumber = secondNumber.slice(0, -1);

        if (secondNumber === "") {

            display.value =
                firstNumber + " " +
                getOperatorSymbol(currentOperator);

        }
        else {

            display.value =
                firstNumber + " " +
                getOperatorSymbol(currentOperator) +
                " " +
                secondNumber;
        }

        return;
    }

    // Remove operator
    if (currentOperator !== "" && secondNumber === "") {

        currentOperator = "";

        display.value = firstNumber;

        return;
    }

    // Remove first number
    firstNumber = firstNumber.slice(0, -1);

    if (firstNumber === "") {
        display.value = "0";
    }
    else {
        display.value = firstNumber;
    }

});


// CLEAR
clearButton.addEventListener("click", function() {
    clearCalculator();
});


// CALCULATE
function calculate(number1, number2, operator) {

    if (operator === "+") {
        return number1 + number2;
    }

    if (operator === "-") {
        return number1 - number2;
    }

    if (operator === "*") {
        return number1 * number2;
    }

    if (operator === "/") {

        if (number2 === 0) {
            return "Error";
        }

        return number1 / number2;
    }

    if (operator === "%") {

        if (number2 === 0) {
            return "Error";
        }

        return number1 % number2;
    }

    return "Error";
}


// DISPLAY OPERATOR SYMBOL
function getOperatorSymbol(operator) {

    if (operator === "+") {
        return "+";
    }

    if (operator === "-") {
        return "−";
    }

    if (operator === "*") {
        return "×";
    }

    if (operator === "/") {
        return "÷";
    }

    if (operator === "%") {
        return "%";
    }
}


// CLEAR FUNCTION
function clearCalculator() {

    display.value = "0";

    firstNumber = "";
    secondNumber = "";
    currentOperator = "";
    resultDisplayed = false;
}