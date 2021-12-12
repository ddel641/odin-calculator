const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");

let operation = {
    firstNumber: 0,
    secondNumber: null,
    answer: null,
    sign: null,
    decimal: false,

    reset: function () {
        this.firstNumber = 0;
        this.secondNumber = null;
        this.answer = null; 
        this.sign = null;
        this.decimal = false;
    },
};

function processKeyValue(e) {
    let value;
    if (e.type === "click") {
        value = e.path[0].value;
    } else if (e.type === "keydown") {
        value = e.key;
    }
    
    let working = (!operation["sign"]) ? "firstNumber" : "secondNumber";

    if (value.match(/[0-9]/)) {
        if (String(operation[working]).length == 12) return
        if (operation["answer"] && !operation.sign) operation.reset();
        if (operation[working] === null || operation[working] === 0) {
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

    } else if (value === "=" || value === "Enter") {
        if (operation.firstNumber == null && 
              !(operation.secondNumber && 
              operation.sign)) return
        working = "answer";
        operation[working] = operate(operation["firstNumber"],
                                      operation["secondNumber"],
                                      operation["sign"]);

    } else if (value === "%") {
        operation[working] = Number(operation[working])/100;

    } else if (value == "bksp" || value === "Backspace") {
        if (operation[working].length > 1) {
            operation[working] = operation[working].slice(0, -1);
        } else {
            operation[working] = 0;
        }

    } else if (value === "neg") {
        operation[working] = -operation[working];

    } else if (value === "clear" || value === "Delete") {
        operation.reset();
    }
    
    if (operation[working] === "-") operation[working] = null;
    updateDisplay(operation[working]);
    // console.log(value, operation.firstNumber, operation.secondNumber, operation.sign, operation.answer);
}

function updateDisplay(a) {
    let len = String(Math.trunc(a)).length;
    len = String(a).includes("-") ? len-1 : len
    if ((a > 1 || a < -1) && len > 12) {
        a = a/10**(len-1);
        a = `${a.toFixed(8)}E${len-1}`
    }
    display.innerHTML = (a) ? a : 0;
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
    // answer = roundCorrectly(answer);
    answer = Number(answer.toFixed(11));
    operation["sign"] = null;
    operation["firstNumber"] = answer;
    operation["decimal"] = String(answer).includes(".");
    operation["secondNumber"] = null;
    return answer
}

buttons.forEach((button) => {
            
    button.addEventListener("click", processKeyValue);
});

window.addEventListener("keydown", processKeyValue);