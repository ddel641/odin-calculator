const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");

let operation = {
    firstNumber: "0",
    secondNumber: "0",
    answer: null,
    sign: null,
    decimal: false,

    reset: function () {
        this.firstNumber = "0";
        this.secondNumber = "0";
        this.answer = null; 
        this.sign = null;
        this.decimal = false;
    },
};

function updateDisplay(value) {
    display.innerHTML = value;
}

function processKeyValue(value) {
    let working = (!operation["sign"]) ? "firstNumber" : "secondNumber";

    if (value.match(/[0-9]/)) {
        if (operation[working] === "0") {
            operation[working] = value;
        } else {
            operation[working] += value;
        }
    } else if (value === "." && !operation["decimal"]) {
        operation[working] += value;
        operation["decimal"] = true;
    } else if (value.match(/[\+\-\*\/]/)) {
        if (!operation["sign"]) {
            operation["sign"] = value;
            operation["decimal"] = false;
        } 
    } else if (value === "=") {
        working = "answer";
        operation[working] = operate(operation["firstNumber"],
                                      operation["secondNumber"],
                                      operation["sign"]);
        operation.firstNumber = operation.answer;
    } else if (value === "Clear") {
        operation.reset();
    }
    updateDisplay(operation[working]);
}

function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}

function operate(a, b, operator) {
    [a, b] = [Number(a), Number(b)];
    let answer;
    switch (operator) {
        case "+":
            answer = add(a, b);
            break;
            case "-": 
            answer = subtract(a, b);
            break;
            case "/": 
            answer = divide(a, b);
            break;
            case "*":
                answer = multiply(a, b);
                default: 
                break;
            }
            return answer
        }

buttons.forEach((button) => {
            
    button.addEventListener("click", function (e) {
        processKeyValue(this.innerHTML);
    });
});