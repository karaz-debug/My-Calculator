let previousNumber = "";
let currentNumber = "";
let operator = "";

const firstValue = document.querySelector(".first-value");
const secondValue = document.querySelector(".second-value");

const operandButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

// listen on the values you click in the keyboard
window.addEventListener("keydown", handleKeyPress);

// select the equal button
const equalSignButton = document.querySelector(".equal__sign");

equalSignButton.addEventListener("click", () => {
  // Checking before executing the mathematical operation
  if (currentNumber != "" && previousNumber != "") {
    // do operation
    operate();
  }
});

// select the clear button
const allClearBtn = document.querySelector(".all__clear");

// event listener to our all clear btn
allClearBtn.addEventListener("click", allClear);

// select clear one
const clearBtn = document.querySelector(".clear_one");

// event listener to one clear btn
clearBtn.addEventListener("click", () => {
  clear();
});

// select the change sign button
const changeSignBtn = document.querySelector(".change__sign");

// event listener to change sign button
changeSignBtn.addEventListener("click", () => {
  changeSign();
});

// select the decimal add button
const decimalBtn = document.querySelector(".decimal");

// event listener to decimal add button
decimalBtn.addEventListener("click", () => {
  addDecimal();
});

// Target the data of each number button clicked
operandButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleOperand(e.target.textContent);
  });
});

function handleOperand(number) {
  //   if no operator return the current value prensent
  if (previousNumber !== "" && currentNumber !== "" && operator === "") {
    previousNumber = "";
    secondValue.textContent = currentNumber;
  }

  // prevents the numbers from going off-screen
  if (currentNumber.length <= 11) {
    // console.log(currentNumber.length);
    currentNumber += number;
    secondValue.textContent = currentNumber;
  }
}

// Target the data of each operator button clicked
operatorButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleOperator(e.target.textContent);
  });
});

// validate the operator
function operatorValidation(input) {
  operator = input;
  firstValue.textContent = previousNumber + " " + operator;
  secondValue.textContent = "";
  currentNumber = "";
}

// operator handler
function handleOperator(op) {
  // check if their is previous number
  if (previousNumber === "") {
    previousNumber = currentNumber;
    operatorValidation(op);
  }
  //   check if there is current number
  else if (currentNumber === "") {
    operatorValidation(op);
  } else {
    operate();
    operator = op;
    firstValue.textContent = previousNumber + " " + operator;
    secondValue.textContent = "";
  }
}

// do the operation man
function operate() {
  // change everything to number
  previousNumber = Number(previousNumber);
  currentNumber = Number(currentNumber);

  if (operator === "+") {
    console.log("previous number" + previousNumber);
    console.log("current number" + currentNumber);
    previousNumber = previousNumber + currentNumber;
  } else if (operator === "-") {
    previousNumber = previousNumber - currentNumber;
  } else if (operator === "x") {
    previousNumber = previousNumber * currentNumber;
  } else if (operator === "÷") {
    if (currentNumber <= 0) {
      previousNumber = `undefined`;
      displayResults();
      return;
    }
    previousNumber = previousNumber / currentNumber;
  } else if (operator === "%") {
    previousNumber = (previousNumber / 100) * currentNumber;
  }

  //   round of all the previous number(answer)
  previousNumber = roundNumber(previousNumber);
  //   return it as a string
  previousNumber = previousNumber.toString();
  displayResults();
}

// display answers after equal sign clicked
function displayResults() {
  // always answer is stored in previous number
  if (previousNumber.length <= 11) {
    secondValue.textContent = previousNumber;
  } else {
    // if its greater than 11 digit make it short
    secondValue.textContent = previousNumber.slice(0, 16) + "...";
  }
  //   reset everything to zero
  firstValue.textContent = "";
  operator = "";
  currentNumber = "";
}

function roundNumber(num) {
  return Math.round(num * 100000) / 100000;
}

// clear everything and return them to there initial state
function allClear() {
  currentNumber = "";
  previousNumber = "";
  operator = "";
  secondValue.textContent = "0";
  firstValue.textContent = "";
}

// clear out the specific value required to delete
function clear() {
  // before operation happen
  if (currentNumber !== "") {
    currentNumber = currentNumber.slice(0, -1);
    secondValue.textContent = currentNumber;
    // leave it zero if currentNumber is equal to nothing
    if (currentNumber === "") {
      secondValue.textContent = "0";
    }
  }
  //after operation happen
  if (currentNumber === "" && previousNumber !== "" && operator === "") {
    previousNumber = previousNumber.slice(0, -1);
    secondValue.textContent = previousNumber;
  }
}

// add decimal value if user like to calculate decimals values
function addDecimal() {
  if (!currentNumber.includes(".")) {
    currentNumber += ".";
    secondValue.textContent = currentNumber;
  }
}

// change the value to negative
function changeSign() {
  if (currentNumber !== "") {
    currentNumber = (currentNumber * -1).toString();
    secondValue.textContent = currentNumber;
  }
}

function handleKeyPress(e) {
  e.preventDefault();
  if (e.key >= 0 && e.key <= 9) {
    handleOperand(e.key);
  }
  if (
    e.key === "Enter" ||
    (e.key === "=" && currentNumber != "" && previousNumber != "")
  ) {
    operate();
  }
  if (e.key === "+" || e.key === "-" || e.key === "/") {
    handleOperator(e.key);
  }
  if (e.key === "*") {
    handleOperator("x");
  }
  if (e.key === "%") {
    handleOperator("%");
  }
  if (e.key === ".") {
    addDecimal();
  }
  if (e.key === "Delete") {
    allClear();
  }
  if (e.key === "Backspace") {
    clear();
  }
  if (e.key === "?") {
    changeSign();
  }
}
