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
    let result = 0;

    if (isNum) {
      storeNum += value;
      isNum = false;
    } else if (isOperation) {
      storeOp = value;
      isOperation = false;
    } else if (isEqual && store.length > 2) {
      let res = operate(store[0], store[1], store[2]);
      console.log("equal", res);
      store = [];
      return res;
    }

    if (storeNum || storeOp) {
      let result;
      storeNum && store.push(storeNum);
      if (store[0] && storeOp) {
        store.push(storeOp);
      } else if (!store.length && storeOp) {
        store.push(0);
        store.push(storeOp);
      }
      //store[0] && storeOp && store.push(storeOp);
      if (store.length > 3) {
        console.log(store[0], store[1], store[2]);
        result = operate(store[0], store[1], store[2]);
        console.log("rio", result);

        // if (store[3] == "equal") {
        //   //complete this
        //   screen.innerText = result;
        //   console.log("rio", result);
        //   return result;
        // }

        let newStore = [result, store[3]];
        store = newStore;
        console.log("store", store);
      }
      storeNum = 0;
      storeOp = 0;
    }
    console.log("check", store);
  })
);
