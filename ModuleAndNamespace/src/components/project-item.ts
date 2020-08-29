// /// <reference path="./base-component.ts" />
// /// <reference path="../decorators/autobind.ts" />
// /// <reference path="../models/project.ts" />
// /// <reference path="../models/drag-drop.ts" />

import { Draggable } from "../models/drag-drop.js";
import BaseComponent from "./base-component.js";
import { Project } from "../models/project.js";
import { autobind } from "../decorators/autobind.js";

// namespace App {
  // Project Item Class 
  export class ProjectItem extends BaseComponent<HTMLUListElement, HTMLLinkElement> 
    implements Draggable {
    private project: Project;

    get persons() {
      return this.project.people === 1 
        ? '1 Person'
        : `${this.project.people} Persons`;
    }

    constructor(hostId: string, project: Project) {
      super('single-project', hostId, false, project.id);
      this.project = project;

      this.configure();
      this.renderContent();
    }
    dragEndHandler(_: DragEvent): void {
      console.log('DragEnd');
    }

    @autobind
    dragStartHandler(event: DragEvent) {
      event.dataTransfer!.setData('text/plain', this.project.id);
      event.dataTransfer!.effectAllowed = 'move';
    }

    configure() {
      this.element.addEventListener('dragstart', this.dragStartHandler);
      this.element.addEventListener('dragend', this.dragEndHandler);
    }

    renderContent() {
      this.element.querySelector('h2')!.textContent = this.project.title;
      this.element.querySelector(
        'h3'
      )!.textContent = this.persons + ' assigned';
      this.element.querySelector('p')!.textContent = this.project.description;
    }
  }
// }