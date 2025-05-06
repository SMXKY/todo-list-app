import { resetCreateTaskFormInputs } from "../createTask.js";

const overlay = document.querySelector(".js-overlay");
const createTaskForm = document.querySelector(".js-create-task-form");

const closeTaskFormAuto = (e) => {
  if (!createTaskForm.contains(e.target)) {
    hideTaskFormHandler();
  }
};

export const showTaskFormHandler = () => {
  overlay.classList.add("show-overlay");
  createTaskForm.classList.add("show-create-task-form");

  setTimeout(() => {
    document.addEventListener("click", closeTaskFormAuto);
  }, 100);
};

export function hideTaskFormHandler() {
  overlay.classList.remove("show-overlay");
  createTaskForm.classList.remove("show-create-task-form");
  document.removeEventListener("click", closeTaskFormAuto);
  resetCreateTaskFormInputs();

  const editTaskbtn = document.querySelector(".js-edit-task-btn");
  const createTaskBtn = document.querySelector(".js-save-task-btn");
  editTaskbtn.classList.add("hide-btn");
  createTaskBtn.classList.remove("hide-btn");
}
