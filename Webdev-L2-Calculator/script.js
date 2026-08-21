const display = document.getElementById("display");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

let first = "";
let second = "";
let operator = "";
let result = false;

numbers.forEach(button => {
    button.addEventListener("click", () => {

        if (display.value === "Error") clear();

        if (result) {
            first = "";
            operator = "";
            result = false;
        }

        if (operator) {
            second += button.textContent;
            display.value = first + " " + operator + " " + second;
        } else {
            first += button.textContent;
            display.value = first;
        }
    });
});

operators.forEach(button => {
    button.addEventListener("click", () => {

        if (display.value === "Error" || first === "") return;

        let op = button.dataset.operator;

        if (operator && second === "") {
            display.value = "Error";
            first = "";
            operator = "";
            result = true;
            return;
        }

        if (operator && second) {
            first = calculate();
            second = "";
        }

        operator = op;
        display.value = first + " " + op;
    });
});

document.getElementById("decimal").addEventListener("click", () => {

    if (display.value === "Error") clear();

    if (operator) {
        if (!second.includes(".")) {
            second = second || "0";
            second += ".";
        }
        display.value = first + " " + operator + " " + second;
    } else {
        if (!first.includes(".")) {
            first = first || "0";
            first += ".";
        }
        display.value = first;
    }
});

document.getElementById("equals").addEventListener("click", () => {

    if (!first || !operator || !second) {
        display.value = "Error";
        return;
    }

    first = calculate();
    display.value = first;

    second = "";
    operator = "";
    result = true;
});

document.getElementById("clear").addEventListener("click", clear);

document.getElementById("backspace").addEventListener("click", () => {

    if (display.value === "Error") {
        clear();
        return;
    }

    if (second) {
        second = second.slice(0, -1);
        display.value = first + " " + operator + " " + second;
    } else if (operator) {
        operator = "";
        display.value = first;
    } else {
        first = first.slice(0, -1);
        display.value = first || "0";
    }
});

function calculate() {

    let a = Number(first);
    let b = Number(second);

    if (operator === "+") return a + b;
    if (operator === "-") return a - b;
    if (operator === "*") return a * b;

    if (operator === "/" || operator === "%") {
        if (b === 0) {
            display.value = "Error";
            return "Error";
        }

        return operator === "/" ? a / b : a % b;
    }
}

function clear() {
    display.value = "0";
    first = "";
    second = "";
    operator = "";
    result = false;
}