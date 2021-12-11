const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");

let operation = {
    firstNumber: null,
    secondNumber: null,
    answer: null,
    sign: null,
    decimal: false,

    reset: function () {
        this.firstNumber = null;
        this.secondNumber = null;
        this.answer = null; 
        this.sign = null;
        this.decimal = false;
    },
};

function processKeyValue(value) {
    console.log(value, operation.firstNumber, operation.secondNumber, operation.sign);
    let working = (!operation["sign"]) ? "firstNumber" : "secondNumber";

    if (value.match(/[0-9]/)) {
        if (operation["answer"] && !operation.sign) operation.reset();
        if (operation[working] === null) {
            operation[working] = value;

        } else {
            operation[working] += value;
        }

    } else if (value === "." && !operation["decimal"]) {
        if (operation["answer"] && !operation.sign) operation.reset();
        if (operation[working] === null) operation[working] = 0;
        operation[working] += value;
        operation["decimal"] = true;

    } else if (value.match(/[\+\-\*\/]/)) {
        if (!operation["sign"]) {
            operation["sign"] = value;
            operation["decimal"] = false;

        } else {
            working = "answer";
            operation[working] = operate(operation["firstNumber"],
                                         operation["secondNumber"],
                                         operation["sign"]);
            operation["sign"] = value;
        }

    } else if (value === "=") {
        if (!(operation.firstNumber && 
              operation.secondNumber && 
              operation.sign)) return
        working = "answer";
        operation[working] = operate(operation["firstNumber"],
                                      operation["secondNumber"],
                                      operation["sign"]);

    } else if (value === "%") {
        operation[working] = Number(operation[working])/100;

    } else if (value == "bksp") {
        if (operation[working].length > 1) {
            operation[working] = operation[working].slice(0, -1);
        } else {
            operation[working] = null;
        }

    } else if (value === "neg") {
        operation[working] = -operation[working];

    } else if (value === "clear") {
        operation.reset();
    }
    
    if (operation[working] === "-") operation[working] = null;
    display.innerHTML = (operation[working]) ? operation[working] : 0;
}

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

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
            break;
        default: 
            break;
        };
    operation["sign"] = null;
    operation["firstNumber"] = answer;
    operation["decimal"] = String(answer).includes(".");
    operation["secondNumber"] = null;
    return answer
}

buttons.forEach((button) => {
            
    button.addEventListener("click", function (e) {
        processKeyValue(button.value);
    });
});