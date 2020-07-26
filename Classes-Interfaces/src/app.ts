// type AddFn = (a: number, b: number) => number;
interface AddFn {
  (a: number, b: number): number
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};

interface Named {
  readonly name?: string;
  outputName?: string; // optional
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

let user1: Greetable;

class Person implements Greetable {
  name?: string;
  age: number = 30;
  constructor(name?: string) {
    if(name) {
      this.name = name;
    }
  }
  
  greet(phrase: string) {
    if(this.name) {
      console.log(phrase + ' ' + this.name);
      this.name = phrase;
    } else {
      console.log("Hi!!!");
    }
  }
  
  someMoreMethod() {
    console.log("You can add one more method irrespective of interface");
  }
}

user1 = new Person();
user1.greet("Hi There I am");
console.log(user1);
