import { saveTask, Task } from "./models/Task.model.js";
import { renderTasks } from "./renderTasks.js";
import { showAlert } from "./utils/showAlert.js";

export const createTaskFormValidation = (title, description, datetime) => {
  const errors = [];

  if (!title) {
    errors.push("Task title is requried");
  } else if (!description) {
    errors.push("Task Description is required");
  }

  if (errors.length > 0) {
    return {
      isValid: false,
      error: errors[0],
    };
  }

  return {
    isValid: true,
  };
};

export const resetCreateTaskFormInputs = () => {
  const title = (document.querySelector(".js-task-title").value = "");
  const description = (document.querySelector(".js-task-description").value =
    "");
  const priority = (document.querySelector(".js-task-priority").value = "p1");
  const dateInputvalue = (document.querySelector(".js-task-date-time").value =
    "");
  document.querySelector(".js-date-time-text").innerHTML = "Today";
};

export const createTask = (e) => {
  const title = document.querySelector(".js-task-title").value;
  const description = document.querySelector(".js-task-description").value;
  const priority = document.querySelector(".js-task-priority").value;
  const dateInputValue = document.querySelector(".js-task-date-time").value;
  let dateDateTime = new Date(dateInputValue);

  if (isNaN(dateDateTime.getTime())) {
    dateDateTime = new Date();
  }

  e.preventDefault();

  if (!createTaskFormValidation(title, description).isValid) {
    showAlert(
      "Validation Error",
      createTaskFormValidation(title, description).error,
      "loss"
    );
    return;
  }

  const task = new Task(
    title,
    description,
    `${dateDateTime.getFullYear()}-${
      dateDateTime.getMonth() + 1
    }-${dateDateTime.getDate()}`,
    dateDateTime.getTime(),
    priority,
    dateDateTime
  );

  saveTask(task);

  resetCreateTaskFormInputs();
  showAlert("Task created", `${title} task successfully created`, "win");

  renderTasks();

  //   console.log(task);
};
