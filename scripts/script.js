let display = document.querySelector("#display p");
let numpad = document.querySelector("#numpad");

let operandLeft = "0";
let operandRight = "";
let operator = "";
let operation = undefined;
let state = 0;

// State will be 0 when editing the left operand, and 1 on the right operand

let keys = {
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
  add: "+",
  subtract: "-",
  multiply: "x",
  divide: "/",
};

let operations = {
  add: () => add(),
  subtract: () => subtract(),
  multiply: () => multiply(),
  divide: () => divide(),
};

let functions = {
  clear: () => clear(),
  clearAll: () => clearAll(),
  equal: () => equal(),
};

numpad.addEventListener("click", (e) => {
  let target = e.target.id;

  let input = keys[target];
  console.log(input);
  if (target in operations) {
    console.log("YES", operations[input]);
  }
});

function add() {
  return parseInt(operandLeft) + parseInt(operandRight);
}

function subtract() {
  return parseInt(operandLeft) - parseInt(operandRight);
}

function multiply() {
  return parseInt(operandLeft) * parseInt(operandRight);
}

function divide() {
  return parseInt(operandLeft) / parseInt(operandRight);
}

function clear() {
  switch (state) {
    case 0:
      operandLeft = "";
      break;
    case 1:
      if (operandRight == "") {
        operator = "";
        state = 0;
      } else {
        operandRight = "";
      }
      break;
  }
}

function clearAll() {
  operandLeft = "";
  operandRight = "";
  operation = "";
  operator = "";
  state = 0;
}

function equal(nextOperation = "") {
  let result = operation();

  clearAll();
  operandLeft = result;

  if (nextOperation) {
    operator = nextOperation;
    state = 1;
  } else {
    state = 0;
  }
}
