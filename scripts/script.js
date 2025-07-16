let display = document.querySelector("#display p");
let numpad = document.querySelector("#numpad");

let operandLeft = "";
let operandRight = "";
let operandCurrent = "";
let operator = "";
let operation = undefined;
// State will be 0 when editing the left operand, and 1 on the right operand
let state = 0;

let digits = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  zero: 0,
  decimal: ".",
  add: "+",
  subtract: "-",
  multiply: "x",
  divide: "/",
};

let operations = {
  add: add,
  subtract: subtract,
  multiply: multiply,
  divide: divide,
};

let functions = {
  clear: clear,
  clearAll: clearAll,
  equal: equal,
};

let keyboardActions = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  0: "zero",
  ".": "decimal",
  "+": "add",
  "-": "subtract",
  "*": "multiply",
  "/": "divide",
  "=": "equal",
  Enter: "equal",
  Backspace: "clear",
  BackspaceShift: "clearAll",
};

numpad.addEventListener("click", (e) => {
  let target = e.target.id;

  if (target == "numpad") {
    return;
  }

  processInput(target);
});

document.addEventListener("keydown", (e) => {
  let key = e.key;

  if (key in keyboardActions) {
    let target = keyboardActions[key];
    if (e.shiftKey && target == "clear") {
      target = keyboardActions["BackspaceShift"];
    }

    processInput(target);
  }
});

function processInput(target) {
  let input = digits[target];
  // Handle Meta-Functions (Clear, Clear All and Equals)
  if (target in functions) {
    functions[target]();
    // Handle Operation Functions
  } else if (target in operations) {
    // Handle creating negative operands
    if (!operandCurrent && input === "-") {
      if (state < 0) {
        clearAll();
      }

      operandCurrent += input;
    } else if (!isNaN(parseInt(operandCurrent))) {
      let success = true;

      if (state <= 0) {
        state = 1;
      } else {
        success = equal();
        state = 1;
      }

      if (success) {
        operation = operations[target];
        operator = input;
        operandCurrent = "";
      }
    }
  } else {
    if (state < 0) {
      clearAll();
    }
    // Handle Number Inputs
    if (input == ".") {
      if (!operandCurrent) {
        operandCurrent = "0";
      } else if (operandCurrent.includes(input)) {
        input = "";
      }
    }

    operandCurrent += input;
  }

  updateDisplay();
}

function add() {
  return parseFloat(operandLeft) + parseFloat(operandRight);
}

function subtract() {
  return parseFloat(operandLeft) - parseFloat(operandRight);
}

function multiply() {
  return parseFloat(operandLeft) * parseFloat(operandRight);
}

function divide() {
  return parseFloat(operandLeft) / parseFloat(operandRight);
}

function clear() {
  if (isNaN(operandCurrent)) {
    operandCurrent = "";
  } else if (!operandCurrent && state != 0) {
    operator = "";
    operandCurrent = operandLeft;
    state = 0;
  } else {
    operandCurrent = operandCurrent.slice(0, -1);
  }
}

function clearAll() {
  operandLeft = "";
  operandRight = "";
  operandCurrent = "";
  operation = undefined;
  operator = "";
  state = 0;
}

function equal() {
  if (state != 1 || operation === undefined || isNaN(operandCurrent)) {
    return false;
  }

  let result = operation();

  // Decimal Formatting
  if (!Number.isInteger(result)) {
    result = result.toFixed(2);
  }

  clearAll();
  operandLeft = result.toString();
  operandCurrent = operandLeft;

  state = -1;

  return true;
}

function updateDisplay() {
  if (state <= 0) {
    operandLeft = operandCurrent;
  } else {
    operandRight = operandCurrent;
  }

  let textDisplay = operandLeft;

  if (operator) {
    textDisplay += ` ${operator}`;

    if (operandRight) {
      textDisplay += ` ${operandRight}`;
    }
  }

  display.textContent = textDisplay;
}
