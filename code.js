const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");

let firstNumber = "0";
let secondNumber = "0";
let answer = null;
let operation = null;



function updateDisplay(value) {
    display.innerHTML = value;

    // if (!operation && !answer) {
    //     console.log(value);
    //     display.innerHTML += value;
    //     firstNumber = display.innerHTML;
    // } else {
    //     display.innerHTML = secondNumber;
    //     display.innerHTML += value;
    //     secondNumber = display.innerHTML;
    // }
    // console.log(firstNumber, secondNumber);
}

function processKeyValue(value) {
    if (value.match(/[0-9]/)) {
        if (firstNumber === "0") {
            firstNumber = value;
        } else value : firstNumber += value;
        updateDisplay(value);
    }

    // if (value.match(/[0-9]/)) {
    //     if (!operation)
    //      if (this.innerHTML === "." && !decimal) {
    //          decimal = true;
    //      } else if (this.innerHTML === "." && decimal) {
    //          return
    //      }
    //      updateDisplay(this.innerHTML);
         
    //  } else if (this.innerHTML.match(/[\+\-\*\/]/)) {
    //      operation = this.innerHTML;
    //      decimal = false;
    //      console.log(operation);
    //  } else if (this.innerHTML === "=") {
    //      doMath();
    //  } else if (this.innerHTML === "Clear") {
    //      resetCalculator();
    //  }

}


buttons.forEach((button) => {
    
    button.addEventListener("click", function (e) {
        processKeyValue(this.innerHTML)
    });
});


function resetCalculator () {
    firstNumber = "";
    secondNumber = "";
    operation = "";
    answer = "";
    display.innerHTML = "0";
    decimal = false;
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
    return answer;
}