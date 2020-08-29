// /// <reference path="./base-component.ts" />
// /// <reference path="../decorators/autobind.ts" />
// /// <reference path="../util/validation.ts" />
// /// <reference path="../state/project-state.ts" />

import BaseComponent from "./base-component.js";
import * as Validation from "../util/validation.js";
import { autobind as Autobind } from "../decorators/autobind.js";
import { projectState } from "../state/project-state.js";

// namespace App {
  // Project Input Class
  export class ProjectInput extends BaseComponent<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
      super(
        'project-input',
        'app',
        true,
        'user-input',
      );
      
      this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement;
      this.descriptionInputElement = this.element.querySelector("#description") as HTMLInputElement;
      this.peopleInputElement = this.element.querySelector("#people") as HTMLInputElement;

      this.configure();
    }

    private gatherUserInput(): [string, string, number] | void {
      const enteredTitle = this.titleInputElement.value;
      const enteredDescription = this.descriptionInputElement.value;
      const enteredPeople = this.peopleInputElement.value;

      const titleValidatable: Validation.Validatable = {
        value: enteredTitle,
        required: true
      };

      const descriptionValidatable: Validation.Validatable = {
        value: enteredDescription,
        required: true, 
        minLength: 1
      };

      const peopleValidatable: Validation.Validatable = {
        value: +enteredPeople,
        required: true,
        min: 1
      };

      if(
        !Validation.validate(titleValidatable) ||
        !Validation.validate(descriptionValidatable) ||
        !Validation.validate(peopleValidatable)
      ) {
        alert("Invalid entry!!!");
        return;
      } else {
        return [enteredTitle, enteredDescription, +enteredPeople];
      }
    }

    private clearInputs() {
      this.titleInputElement.value = '';
      this.descriptionInputElement.value = '';
      this.peopleInputElement.value = '';
    }

    @Autobind
    private submitHandler(event: Event) {
      event.preventDefault();
      const userInput = this.gatherUserInput();
      if(Array.isArray(userInput)) {
        const [title, description, people] = userInput;
        projectState.addProject(title, description, people);
        this.clearInputs();
      }
    }
    
    configure() {
      this.element.addEventListener('submit', this.submitHandler);
    }

    renderContent() { }
  }
// }