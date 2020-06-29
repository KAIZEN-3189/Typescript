let userInput: unknown;
// let userInput: any;
let userName: string;

// userInput = 5;
userInput = "Prateek";
if(typeof userInput === "string") {
  userName = userInput;
}

function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code};

  // while(true) {}
}

const result = generateError("Invalid Input!!", 500);
console.log(result);

