// /// <reference path="./base-component.ts" />
// /// <reference path="../decorators/autobind.ts" />
// /// <reference path="../state/project-state.ts" />
// /// <reference path="../models/project.ts" />
// /// <reference path="../models/drag-drop.ts" />

import BaseComponent from "./base-component.js";
import { DragTarget } from "../models/drag-drop.js";
import { Project, ProjectStatus } from "../models/project.js";
import { autobind } from "../decorators/autobind.js";
import { projectState } from "../state/project-state.js";
import { ProjectItem } from "./project-item.js";

// namespace App {
  // Project List
  export class ProjectList extends BaseComponent<HTMLDivElement, HTMLElement> 
    implements DragTarget {
    assignedProjects: Project[] = [];

    constructor(private type: 'active' | 'finished') {
      super(
        'project-list',
        'app',
        false,
        `${type}-projects`
      );

      this.configure();
      this.renderContent();
    }

    @autobind
    dragOverHandler(event: DragEvent) {
      event.preventDefault();
      if(event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
        const listEl = this.element.querySelector("ul")!;
        listEl.classList.add("droppable");
      }
    }

    @autobind
    dropHandler(event: DragEvent): void {
      const projId = event.dataTransfer!.getData('text/plain');
      projectState.moveProject(
        projId, 
        this.type === 'active' 
          ? ProjectStatus.Active 
          : ProjectStatus.Finished
      );
    }

    @autobind
    dragLeaveHandler(_: DragEvent): void {
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.remove("droppable");
    }

    configure() {
      this.element.addEventListener('dragover', this.dragOverHandler);
      this.element.addEventListener('dragleave', this.dragLeaveHandler);
      this.element.addEventListener('drop', this.dropHandler);

      projectState.addListener((projects: Project[]) => {
        const releventProject = projects.filter((project: Project) => {
          if(this.type === 'active') {
            return project.status === ProjectStatus.Active;
          } else {
            return project.status === ProjectStatus.Finished;
          }
        });

        this.assignedProjects = releventProject;
        this.renderProjects();
      });
    }

    renderContent() {
      const listId = `${this.type}-project-list`;
      this.element.querySelector('ul')!.id = listId;
      this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + 'PROJECT';
    }

    private renderProjects() {
      const listEl = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement;
      listEl.innerHTML = '';
      for(const projItem of this.assignedProjects) {
        new ProjectItem(this.element.querySelector('ul')!.id, projItem);
      }
    }  
  }
// }