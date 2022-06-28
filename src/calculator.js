let buttonGroups = document.querySelector(".calculator-button");
let screen = document.querySelector(".calculator-screen");
let queue = [];
let input = 0;
let lastResult = 0;
const arrButton = [
  {
    name: "clear",
    label: "AC",
    class: "clear-button",
    clear: "clearAll()",
  },
  {
    name: "1",
    label: 1,
    class: "number",
    click: "numberButton('1')",
  },
  {
    name: "2",
    label: 2,
    class: "number",
    click: "numberButton('2')",
  },
  {
    name: "3",
    label: 3,
    class: "number",
    click: "numberButton('3')",
  },
  {
    name: "4",
    label: 4,
    class: "number",
    click: "numberButton('4')",
  },
  {
    name: "5",
    label: 5,
    class: "number",
    click: "numberButton('5')",
  },
  {
    name: "6",
    label: 6,
    class: "number",
    click: "numberButton('6')",
  },
  {
    name: "7",
    label: 7,
    class: "number",
    click: "numberButton('7')",
  },
  {
    name: "8",
    label: 8,
    class: "number",
    click: "numberButton('8')",
  },
  {
    name: "9",
    label: 9,
    class: "number",
    click: "numberButton('9')",
  },
  {
    name: "0",
    label: 0,
    class: "number",
    click: "numberButton('0')",
  },
  {
    name: "dot",
    label: ".",
    class: "number",
    click: "numberButton('.')",
  },
  {
    name: "plus",
    label: "+",
    class: "operator",
    clickOp: "operatorButton('+')",
  },
  {
    name: "minus",
    label: "-",
    class: "operator",
    clickOp: "operatorButton('-')",
  },
  {
    name: "multiply",
    label: "*",
    class: "operator",
    clickOp: "operatorButton('*')",
  },
  {
    name: "divide",
    label: "/",
    class: "operator",
    clickOp: "operatorButton('/')",
  },
  {
    name: "equal",
    label: "=",
    class: "operator",
    clickOp: "calculateQueue(queue)",
  },
];

// render button in DOM
const createButton = () => {
  arrButton.forEach((item) => {
    buttonGroups.innerHTML += `<button id="${item.name}" class="${item.class}" 
    onclick="${item.clear || item.click || item.clickOp}"
    >${item.label}</button>`;
  });
};
createButton();

function calculateQueue(value) {
  // value is total element
  if (input !== 0) {
    input = parseFloat(input);
    addToQueue(input);
  }
  // first element
  var answer = value[0];
  var dividedByZero = 0;
  for (var i = 2; i < value.length; i = i + 2) {
    // index of operator = total - 1
    switch (queue[i - 1]) {
      case "+":
        answer += value[i];
        break;
      case "-":
        answer -= value[i];
        break;
      case "/":
        console.log("value i", value[i]);
        if (value[i] === 0) {
          dividedByZero = 1;
        } else {
          answer = answer / value[i];
        }

        break;
      case "*":
        answer = answer * value[i];
        break;
    }
    this.lastResult = answer;
  }
  // (Number).toFixed(amount number want to show);
  answer = answer.toFixed(10);
  answer = parseFloat(answer);
  if (dividedByZero === 1) {
    clearAll();
    screen.innerHTML = "ERROR";
  } else {
    screen.innerHTML = answer;
    input = answer;
    queue = [];
  }
}

function addToQueue(input) {
  queue.push(input);
}

// reset all
function clearAll() {
  queue = [];
  input = 0;
  screen.innerHTML = "0";
}

function numberButton(arg) {
  console.log("lastResult :", this.lastResult);
  if (this.lastResult != 0) {
    clearAll();
    this.lastResult = 0;
  }
  if (screen.innerHTML === "ERROR" || (screen.innerHTML == "0" && arg != ".")) {
    screen.innerHTML = "";
  }
  if (!(arg === ".") || !input.match(/[.]/)) {
    input += arg;
    screen.innerHTML += arg;
  }
}

function operatorButton(arg) {
  if (input !== 0 && input !== "-") {
    input = parseFloat(input);
    addToQueue(input);
    addToQueue(arg);
    screen.innerHTML += arg;
    input = 0;
  }
  if (arg == "-" && isNaN(queue[0]) && input !== "-") {
    input = "-";
    screen.innerHTML = "-";
  }
}
