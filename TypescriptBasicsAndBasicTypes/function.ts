// number
function add(n1: number, n2: number) {
  return n1 + n2;
}

// void 
function printResult(num: number): void {
  console.log("Result: " + num);
}

printResult(add(5, 10));

// Function Type
// let combineValue: Function;
let combineValue: (n1: number, n2: number) => number;

combineValue = add;
// combineValue = printResult;

console.log(combineValue(5, 10));

// Function Type and Callbacks
function addAndHandle(n1: number, n2: number, callbackFn: (result: number) => void) {
  const result = n1 + n2;
  callbackFn(result);
}

addAndHandle(10, 20, (result) => {
  console.log(result);
})