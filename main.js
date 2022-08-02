let storeNum = "";
let storeOp = 0;
let store = [];
let display = 0;

console.log("checkStoreNum", storeNum);

let operations = {
  "+": (a, b) => {
    return a + b;
  },

  "-": (a, b) => {
    return a - b;
  },

  x: (a, b) => {
    return a * b;
  },

  "÷": (a, b) => {
    return a / b;
  },

  "^": (a, b) => {
    return a ** b;
  },
};

let operate = (a, operator, b) => {
  let res = operations[operator](Number(a), Number(b));
  return res;
};

let upperScreen = document.querySelector(".up");
let lowerScreen = document.querySelector(".down");
let backSpace = document.querySelector(".backspace");
let resetBtn = document.querySelector(".reset");

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
        display = storeNum;
        isNum = false;
      }
    } else if (isOperation) {
      storeOp = value;
      isOperation = false;
    }

    if (isEqual && store.length > 1 && storeNum) {
      let result = operate(store[0], store[1], storeNum);
      upperScreen.innerText =
        upperScreen.innerText = `${upperScreen.innerText} ${storeNum} =`;
      //store.push(result);
      storeNum = String(result);
      display = storeNum;
      lowerScreen.innerText = display;

      storeOp = 0;
      store = [];
      isNum = false;
      return result;
    }

    if (storeNum && storeOp) {
      //!Number(store[store.length - 1])
      store.push(storeNum);
      display = storeNum;
      storeNum = "";
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
      let result = operate(store[0], store[1], store[2]);
      console.log("res", result);
      let newStore = [result, store[3]];
      store = newStore;
      //console.log("store", store);
      display = result;
      storeNum = "";
      storeOp = 0;
    }

    upperScreen.innerText = store.join(" ").toString();
    lowerScreen.innerText = display;
    console.log("storeNum", storeNum);
    console.log("store", store);
  })
);

backSpace.addEventListener("click", (e) => {
  //e.stopPropagation;
  if (storeNum) {
    storeNum = storeNum.slice(0, storeNum.length - 1);
    display = storeNum;
    lowerScreen.innerText = display;
  }
  console.log("boii", storeNum);
});

resetBtn.addEventListener("click", (e) => {
  storeNum = "";
  storeOp = 0;
  store = [];
  display = 0;
  upperScreen.innerText = "";
  lowerScreen.innerText = display;
});
