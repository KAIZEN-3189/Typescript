// const userName = "Prateek";

// let age = 30;

// age = 29;

// function add(a: number, b: number) {
//   let result;
//   result = a + b;
//   return result;
// }

// if(age > 20) {
//   let isOld;
//   isOld = true;
// }
// console.log(isOld);

// const add = (a: number, b: number) => {
//   return a + b;
// };

// const add = (a: number, b: number = 1) => a + b;
// console.log(add(2,5));

// const printOutput: (a: number | string) => void = output  => console.log(output);
// printOutput(add(5));

const button = document.querySelector('button');
if(button) {
  button.addEventListener('click', event => console.log(event));
}

const hobbies = ['Sports', 'Cooking'];
const activeHobbies = ['Hiking', ...hobbies];

// activeHobbies.push(hobbies[0], hobbies[1]);

activeHobbies.push(...hobbies);

console.log(activeHobbies);


const person = {
  personName: 'Prateek',
  personAge: 31
};

const copiedPerson = { ...person };

console.log(copiedPerson);

const add = (...numbers: number[]) => {
  return numbers.reduce((currentResult, currentValue) => {
    return currentResult + currentValue;
  }, 0);
};

const addNumber = add(5, 2, 3, 5, 6);
console.log(addNumber);

// const hobby1 = hobbies[0];
// const hobby2 = hobbies[1];

// Array Destructuring
const [hobby1, hobby2, ...remainingHobbies] = hobbies;

console.log(hobbies, hobby1, hobby2);

// Object Destructuring
const { personAge: userAge, personName: userName } = person;