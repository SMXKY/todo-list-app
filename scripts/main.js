import { createTask } from "./createTask.js";
import { initPageToggle } from "./handlePageToggle.js";
import { init, renderTasks } from "./renderTasks.js";
import {
  monthNames,
  renderCalendar,
  showCalendarMonth,
} from "./ui/showCalendarMonth.js";
import {
  hideTaskFormHandler,
  showTaskFormHandler,
} from "./ui/showTaskFormHandler.js";
import { handleDataTimeClick, updateDateTimeOnUI } from "./ui/taskFormUtils.js";

const createTaskBtn = document.querySelector(".js-create-task-btn");
const createTaskCalendarBtn = document.querySelector(".js-date-time-btn");
const closeCreateTaskForm = document.querySelector(
  ".js-close-create-task-form"
);
const saveTaskBtn = document.querySelector(".js-save-task-btn");
const dateInput = document.querySelector(".js-task-date-time");
const monthSwicthBtn = document.querySelector(".js-month-picker-btn");
const date = new Date(Date.now());
const monthText = document.querySelector(".js-month-text");

createTaskBtn.addEventListener("click", showTaskFormHandler);
createTaskCalendarBtn.addEventListener("click", handleDataTimeClick);
closeCreateTaskForm.addEventListener("click", hideTaskFormHandler);
saveTaskBtn.addEventListener("click", createTask);
dateInput.addEventListener("input", updateDateTimeOnUI);
renderTasks();
init();
monthSwicthBtn.addEventListener("click", showCalendarMonth);
monthText.innerHTML = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
renderCalendar(date.getMonth() + 1, date.getFullYear());

initPageToggle();
