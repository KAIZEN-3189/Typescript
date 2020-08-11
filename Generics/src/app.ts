// Generics
// const names: Array<string> = []; // similar to string[]

// // names[0].split(' ');

// const promise: Promise<string> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("This is done!")
//   }, 2000);
// });

// promise.then(data => {
//   data.split(' ');
// });


// Constraints using extends 
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

// const mergedObj = merge< {name: string, hobbies: string[]}, { age: number} >({ name: "Prateek", hobbies: ["Sports"]}, { age: 31 });
const mergedObj = merge({ name: "Prateek", hobbies: ["Sports"]}, { age: 31 });
console.log(mergedObj.age);

interface Lengthy {
  length: number
}

function countAndDescribe<T extends Lengthy> (element: T): [T, string] {
  let descriptionText = 'Got No Elements';

  if(element.length === 1 ) {
    descriptionText = 'Got 1 Element';
  } else if( element.length > 1) {
    descriptionText = 'Got ' + element.length + ' Element';
  }
  return [element, descriptionText]
}

console.log(countAndDescribe(["Cooking", "Sports"]));

// Key of constraints
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return 'Value: ' + obj[key];
}

console.log(extractAndConvert({ name: "Prateek" }, 'name'));

class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if(this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorae = new DataStorage<string>();
textStorae.addItem("Prateek");
textStorae.addItem("Iteesha");
textStorae.removeItem("Iteesha");
console.log(textStorae.getItems());

const numberStorae = new DataStorage<number>();
numberStorae.addItem(1);
numberStorae.addItem(2);
numberStorae.removeItem(1);
console.log(numberStorae.getItems());

const objStorage = new DataStorage<object>();

const maxObj = { name: "Max"};
objStorage.addItem(maxObj);
objStorage.addItem({ name: "Manu"});
// .. 
objStorage.removeItem(maxObj);

console.log(objStorage);

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string, 
  description: string, 
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

const names: ReadonlyArray<string> = ["Prateek", "Iteesha"];
// names.push("John")