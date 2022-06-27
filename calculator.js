var input = 0;

// Delete all number
function clearAll() {
  document.getElementById("answer").innerHTML = "0";
}

function numberButton(arg) {
  if (
    document.getElementById("answer").innerHTML === "ERROR" ||
    // number is 0 and is not a dot
    (document.getElementById("answer").innerHTML == "0" && arg != ".")
  ) {
    document.getElementById("answer").innerHTML = "";
  }

  if (!(arg === ".") || !input.match(/[.]/)) {
    input += arg;
    document.getElementById("answer").innerHTML += arg;
  }
}

