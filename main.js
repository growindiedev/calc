let storeNum = 0;
let storeOp = 0;
let store = [];

let operations = {
  add: (a, b) => {
    return a + b;
  },

  subtract: (a, b) => {
    return a - b;
  },

  multiply: (a, b) => {
    return a * b;
  },

  divide: (a, b) => {
    return a / b;
  },

  power: (a, b) => {
    return a ** b;
  },
};

let operate = (a, operator, b) => {
  let res = operations[operator](Number(a), Number(b));
  return res;
};

let screen = document.querySelector(".screen");

document.querySelectorAll("button").forEach((btn) =>
  btn.addEventListener("click", (e) => {
    //(screen.innerText += e.target.innerText)
    let value = e.target.value;
    let isNum = Array.from(btn.classList).includes("num");
    let isOperation = Array.from(btn.classList).includes("operate");
    let result = 0;

    if (isNum) {
      storeNum += value;
      isNum = false;
    } else if (isOperation) {
      storeOp = value;
      isOperation = false;
    }

    if (storeNum && storeOp) {
      let result;
      store.push(storeNum);
      store.push(storeOp);
      if (store.length > 3) {
        console.log(store[0], store[1], store[2]);
        result = operate(store[0], store[1], store[2]);
        if (store[3] == "equal") {
          //complete this
          screen.innerText = result;
          console.log("rio", result);
          return result;
        }
        let newStore = [result, store[3]];
        store = newStore;
        console.log("store", store);
      }
      storeNum = 0;
      storeOp = 0;
    }
  })
);
