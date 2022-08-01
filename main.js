let storeNum = 0;
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

// let toPush = (char) => {
//   let flag = false;
//   let last = store[store.length - 1];
//   if(typeof Number(last) === "number" && typeof Number(char) !== "number"){
//     flag = true;
//   } else if (typeof Number(last) !== "number" && !Object.keys(operations).includes(last) && !Object.keys(operations).includes(char)){
//     flag = true;
//   }
//   return flag;
// }

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
    } else if (isEqual && store.length > 1 && storeNum) {
      let res = operate(store[0], store[1], storeNum);
      console.log("equal", res);
      store = [];
      storeNum = 0;
      storeOp = 0;
      return res;
    }

    if (storeNum || storeOp) {
      let result;
      // storeNum && store.push(storeNum);
      if (storeNum && !Number(store[store.length - 1]) && storeOp) {
        store.push(storeNum);
        storeNum = 0;
      }

      if (
        !Object.keys(operations).includes(store[store.length - 1]) &&
        storeOp
      ) {
        // do not push the storeOp if last array value have same storeOp
        //here is the problem
        store.push(storeOp);
        storeOp = 0;
      } else if (
        Object.keys(operations).includes(store[store.length - 1]) &&
        storeOp
      ) {
        store[store.length - 1] = storeOp;
        storeOp = 0;
      } else if (!store.length && storeOp) {
        store.push(0);
        store.push(storeOp);
        storeOp = 0;
      }
      //store[0] && storeOp && store.push(storeOp);
      if (store.length > 3) {
        console.log(store[0], store[1], store[2]);
        result = operate(store[0], store[1], store[2]);
        console.log("rio", result);
        let newStore = [result, store[3]];
        store = newStore;
        console.log("store", store);
        storeNum = 0;
        storeOp = 0;
      }
    }
    //console.log("checkStoreNum", storeNum);
    console.log("checkStore", store);
  })
);
