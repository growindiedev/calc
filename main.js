let storeNum = "";
let storeOp = 0;
let store = [];

console.log("checkStoreNum", storeNum);

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

  equal: (a, b) => {},
};

let operate = (a, operator, b) => {
  let res = operations[operator](Number(a), Number(b));
  return res;
};

let screen = document.querySelector(".screen");

document.querySelectorAll("button").forEach((btn) =>
  btn.addEventListener("click", (e) => {
    let value = e.target.value;
    let isNum = Array.from(btn.classList).includes("num");
    let isOperation = Array.from(btn.classList).includes("operate");
    let isEqual = Array.from(btn.classList).includes("equal");

    if (isNum) {
      if (value === "." && storeNum.includes(".")) {
        isNum = false;
      } else {
        storeNum += value;
        isNum = false;
      }
    } else if (isOperation) {
      storeOp = value;
      isOperation = false;
    } else if (isEqual && store.length > 1 && storeNum) {
      let res = operate(store[0], store[1], storeNum);
      console.log("equal", res);
      store = [];
      storeNum = 0;
      storeOp = 0;
      return res;
    }

    if (storeNum && storeOp) {
      //!Number(store[store.length - 1])
      store.push(storeNum);
      storeNum = 0;
    }

    if (!store.length && storeOp) {
      store.push(0);
      store.push(storeOp);
      storeOp = 0;
    }

    if (!Object.keys(operations).includes(store[store.length - 1]) && storeOp) {
      // do not push the storeOp if last array value have  storeOp
      //here is the problem
      store.push(storeOp);
      storeOp = 0;
    } else if (
      Object.keys(operations).includes(store[store.length - 1]) &&
      storeOp
    ) {
      store[store.length - 1] = storeOp;
      storeOp = 0;
    }
    if (store.length > 3) {
      console.log(store[0], store[1], store[2]);
      result = operate(store[0], store[1], store[2]);
      console.log("res", result);
      let newStore = [result, store[3]];
      store = newStore;
      console.log("store", store);
      storeNum = 0;
      storeOp = 0;
      //}
    }
    console.log("checkStore", store);
  })
);
