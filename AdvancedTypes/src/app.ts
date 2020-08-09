type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: 'Prateek',
  privileges: ['create-server'],
  startDate: new Date()
}

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// function add(a: Combinable, b: Combinable) {
//   if(typeof a === "string" || typeof b === "string") {
//     return a.toString() + b.toString();
//   }

//   return a + b;
// }

function add(a: number, b: number): number; 
function add(a: string, b: string): string;
function add(a: number, b: string): string;
function add(a: string, b: number): string;
function add(a: Combinable, b: Combinable) {
  if(typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }

  return a + b;
}

const result = add('Prateek ', 'Magarde ');
result.split(' ');

const fetchUserData = {
  id: 'u1',
  name: 'Prateek',
  job: { title: 'CEO', company: 'My Own Company'}
};

console.log(fetchUserData?.job?.title);

const userInput = undefined;

// Only for null or undefined
const storedData = userInput ?? 'DEFAULT';

console.log(storedData);

// type UnknownEmploy = Employee | Admin;

// function printEmployeeInformation(emp: UnknownEmploy) {
//   console.log('Name' + emp.name);

//   if('privileges' in emp) {
//     console.log('Privilege: ' + emp.privileges);
//   }

//   if('startDate' in emp) {
//     console.log('Privilege: ' + emp.startDate);
//   }
// }

// printEmployeeInformation(e1);

// class Car {
//   drive() {
//     console.log("Driving...");
//   }
// }

// class Truck {
//   drive() {
//     console.log("Driving Truck...");
//   }

//   loadCargo(amt: number) {
//     console.log("Loading Cargo " + amt);
//   }
// }

// type Vehicle = Car | Truck;

// const v1 = new Car();

// const v2 = new Truck();

// function useVehicle(vehicle: Vehicle) {
//   vehicle.drive();

//   // if('loadCargo' in vehicle) {
//   //   vehicle.loadCargo(1000)
//   // }

//   if(vehicle instanceof Truck) {
//     vehicle.loadCargo(1000)
//   }
// }

// useVehicle(v1);
// useVehicle(v2);

// interface Bird {
//   type: 'bird';
//   flyingSpeed: number;
// }

// interface Horse {
//   type: 'horse';
//   runningSpeed: number;
// }

// type Animal = Bird | Horse;

// function moveAnimal(animal: Animal) {
//   let speed: number;
//   switch (animal.type) {
//     case 'bird':
//       speed = animal.flyingSpeed;
//       break;

//     case 'horse':
//       speed = animal.runningSpeed;
//       break;
//   }
//   console.log('Moving with Speed: ' + speed);
// }

// moveAnimal({ type: 'bird', flyingSpeed: 200});
// moveAnimal({ type: 'horse', runningSpeed: 150});

// // const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;
// // const userInputElement = document.getElementById('user-input') as HTMLInputElement;
// const userInputElement = document.getElementById('user-input');

// if(userInputElement) {
//   (userInputElement as HTMLInputElement).value = '123';
// }

// // I just know every property should have prop name with string and value with string
// interface ErrorContainer {
//   [prop: string]: string
// }

// const errorBag: ErrorContainer = {
//   email: 'Not a valid email', 
//   username: 'Must have first character as string'
// };

