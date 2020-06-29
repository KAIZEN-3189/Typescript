// const person: {
//   name: string;
//   age: number;
// } = {
// const person: {
//     name: string,
//     age: number, 
//     hobbies: string[],
//     role: [number, string] // Tuples
//   } = {  
//   name: 'Prateek Magarde',
//   age: 31,
//   hobbies: ['Sports', 'Cooking'],
//   role: [2, 'author']
// };

// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;

enum Role { ADMIN, READ_ONLY = 5, AUTHOR }; // 0, 1, 2 === 5, 6, 7 === 0, 5, 6

const person = {  
name: 'Prateek Magarde',
age: 31,
hobbies: ['Sports', 'Cooking'],
role: Role.AUTHOR
};

// person.role.push('admin'); // push is allowed here with Tuples

let favorateActivities: string[];
favorateActivities = ['Sports'];

// console.log(person.name);
for(const hobby of person.hobbies) {
  // console.log(hobby.toUpperCase());
}

if(person.role === Role.AUTHOR) {
  console.log("User is Author");
}