function Logger(logString: string) {
  console.log("Logger Factory");
  
  return function(constructor: Function) {
    console.log(logString);
    console.log(constructor);
  }
}

function withTemplate(template: string, hookId: string) {
  console.log("Template Factory");

  return function<T extends {new(...args: any[]): { name: string }}>(originalConstructor: T) {
    return class extends originalConstructor {
      // _ is just to add an argument but I dont need it for now
      constructor(..._: any[]) {
        super();
        console.log("Rendering Tempate");
        const hookEl = document.getElementById(hookId);
        if(hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    }
  }
}

function TestDecorator() {
  return function(constructor: Function) {
    console.log(constructor);
    
  }
}

@Logger("Logging - Persons")
@withTemplate('<h1>My Person Object</h1>', 'app')
@TestDecorator()
class Person {
  name = "Prateek";

  constructor() {
    console.log("Creating Person Object");
  }
}

const person = new Person();
console.log(person);

// --- 

function Log(target: any, propertyName: string) {
  console.log('Property decorator--------------');
  console.log(target);
  console.log(propertyName);
  console.log("--------------------------------"); 
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor decorator--------------');
  console.log(target);
  console.log(name);
  console.log(descriptor);
  console.log("--------------------------------"); 
}

function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log("Method Decorator---------------");
  console.log(target);
  console.log(name);
  console.log(descriptor);
  console.log("--------------------------------"); 

}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log("Parameter-----------------------");
  console.log(target);
  console.log(name);
  console.log(position);
  console.log("--------------------------------"); 
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if(val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid Price!!");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  gettPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax)
  }
}

function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  console.log(descriptor);
  
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  };
  console.log(adjustedDescriptor);
  return adjustedDescriptor;
}

class Printer {
  message = "This works";

  @AutoBind
  showMessage() {
    console.log(this.message);
  }

  @AutoBind
  onHover() {
    console.log(this.message);
  }
}

const p = new Printer();
const button = document.querySelector("button")!;
// button.addEventListener("click", p.showMessage.bind(p));
button.addEventListener("click", p.showMessage);
button.addEventListener("mouseover", p.onHover);

// ---
// This can be in a separate lib

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]
  }
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [...registeredValidators[target.constructor.name][propName], 'required']
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [...registeredValidators[target.constructor.name][propName], 'positive']
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if(!objValidatorConfig) {
    return true;
  }

  let isValid = true;
  for(const prop in objValidatorConfig) {
    for(const validator of objValidatorConfig[prop]) {
      switch(validator) {
        case 'required':
          isValid = isValid && !!obj[prop];
          break;
        
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;

  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", event => {
  event.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;
  
  const title = titleEl.value;
  const price = +priceEl.value;
  
  const createdCourse = new Course(title, price);
  if(!validate(createdCourse)) {
    alert('Invalid input !!!');
    return;
  }
  console.log(createdCourse);
  
});