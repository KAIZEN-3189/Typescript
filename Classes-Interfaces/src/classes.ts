// Class with abstract can't be instantiated
abstract class Department {
  static fiscalYear = 2020;
  // private id: string;
  // private name: string;
  // private employees: string[] = []; // only accessible inside of the class
  protected employees: string[] = [];

  constructor(protected readonly id: string, public name: string) {
    // this.id = id;
    // this.name = name;
    // You can not access static properties with this keyword in non-static methods 
    // console.log(Department.fiscalYear);
  }

  static createEmployee(name: string) {
    return {
      name: name
    };
  }

  // When you have to force the extended classes to have this method
  abstract describe(this: Department): void;

  addEmployee(employees: string) {
    this.employees.push(employees);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
    
  }
}

class ITDepartment extends Department {
  admins: string[];

  constructor(id: string, admins: string[]) {
    super(id, 'IT');
    this.admins = admins;
  }

  describe() {
    console.log("IT Department - ID: " + this.id);
  }
}

class Accounting extends Department{
  private lastReport: string;
  private static instance: Accounting;

  static getInstance() {
    if(this.instance) {
      return this.instance;
    }

    this.instance = new Accounting('d2', []);
    return this.instance;
  }

  get mostRecentReport() {
    if(!this.lastReport) {
      throw new Error("No Report Found");
    }
    return this.lastReport;
  }

  set mostRecentReport(report: string) {
    if(!report) {
      throw new Error("Please pass a valid value");
    }
    this.addReport(report);
  }

  private constructor(id: string, private reports: string[]) {
    super(id, 'Accounting');
    this.lastReport = reports[0];
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }

  addEmployee(name: string) {
    if(name === "Prateek") {
      return;
    }

    this.employees.push(name);
  }

  describe() {
    console.log("Accounting Department - ID: " + this.id);
  }
}

const employee1 = Department.createEmployee("Prateek");
console.log(employee1, Department.fiscalYear);

const it = new ITDepartment('d1', ["Prateek"]);
it.addEmployee('Max');
it.addEmployee('Manu');
it.describe();
it.printEmployeeInformation();
console.log(it);

const accounting = Accounting.getInstance();
const accounting2 = Accounting.getInstance();

console.log(accounting, accounting2);

// console.log(accounting.mostRecentReport);
accounting.addReport("Something went wrong...");
accounting.addEmployee("Iteesha");
console.log(accounting);

accounting.mostRecentReport = "Year end report";
console.log(accounting.mostRecentReport);
accounting.describe();