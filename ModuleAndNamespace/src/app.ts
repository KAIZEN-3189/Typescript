// /// <reference path="./models/drag-drop.ts" />
// /// <reference path="./models/project.ts" />
// /// <reference path="./state/project-state.ts" />
// /// <reference path="./components/project-input.ts" />
// /// <reference path="./components/project-list.ts" />

import { ProjectInput } from "./components/project-input.js";
import { ProjectList } from "./components/project-list.js";

// namespace App {
  new ProjectInput();
  new ProjectList('active');
  new ProjectList('finished');
// }