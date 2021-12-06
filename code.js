const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");
let firstNumber;
let secondNumber = "";
let answer;
let operation;


function updateDisplay(value) {
    if (!operation && !answer) {
        console.log(value);
        display.innerHTML += value;
        firstNumber = display.innerHTML;
    } else {
        display.innerHTML = secondNumber;
        display.innerHTML += value;
        secondNumber = display.innerHTML;
    }
    console.log(firstNumber, secondNumber);
}

function doMath() {
    let a = Number(firstNumber);
    let b = Number(secondNumber);
    switch (operation) {
        case "+":
            answer = a + b;
            break;
        case "-": 
            answer = a - b;
            break;
        case "/": 
            answer = a / b;
            break;
        case "*":
            answer = a * b;
        default: 
            break;
    }
    display.innerHTML = answer;
    operation = "";
}

buttons.forEach((button) => {
    
    button.addEventListener("click", function (e) {
       if (this.innerHTML.match(/[.0-9]/)) {
           
            updateDisplay(this.innerHTML);
        } else if (this.innerHTML.match(/[\+\-\*\/]/)) {
            operation = this.innerHTML;
            console.log(operation);
        } else if (this.innerHTML === "=") {
            doMath();
        } else if (this.innerHTML === "Clear") {
            firstNumber = "";
            secondNumber = "";
            thirdNumber = "";
            display.innerHTML = "";
        }
    });
});


