import {
  createTaskFormValidation,
  resetCreateTaskFormInputs,
  createTask,
} from "./createTask.js";
import { allTasks } from "./models/Task.model.js";
import {
  hideTaskFormHandler,
  showTaskFormHandler,
} from "./ui/showTaskFormHandler.js";
import { showAlert } from "./utils/showAlert.js";

const taskHolder = document.querySelector(".js-all-tasks");
let currentEditId = null;

export const renderTasks = () => {
  const groups = allTasks.reduce((acc, task) => {
    const key = new Date(task.dateObj).toISOString().split("T")[0];
    (acc[key] = acc[key] || []).push(task);
    return acc;
  }, {});

  const grouped = Object.entries(groups)
    .sort(([a], [b]) => new Date(a) - new Date(b))
    .map(([date, items]) => ({ date, items }));

  taskHolder.innerHTML = grouped
    .map(({ date, items }) => {
      const entries = items
        .map((task) => {
          const dueTime = new Date(task.dueTime).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          });
          const createdAt = new Date(task.createdAt)
            .toString()
            .replace(/\s\(.+\)/, "");
          return `
              <div class="todo-entry js-todo-main-entry ${
                task.isDone ? "done-todo" : ""
              }" data-id="${task.id}">
                <div class="todo-entry-head">
                  <div class="todo-entry-check todo-${
                    task.priority
                  } js-todo-block" data-id="${task.id}"></div>
                  <p>${task.title}</p>
                </div>
                <div class="todo-content">
                  <p class="todo-description">${task.description}</p>
                  <div class="todo-entry-options">
                    <div class="todo-due-time">
                      <img src="./assets/Clock.png" alt="clock" />
                      <p>${dueTime}</p>
                    </div>
                    <div class="todo-entry-options-rights">
                      <p><span>Created at: </span>${createdAt.replace(
                        / GMT[^\)]+/,
                        ""
                      )}</p>
                      <img src="./assets/delete (2).png" alt="delete" class="js-delete-task-btn delet-btn" data-id="${
                        task.id
                      }" />
                    </div>
                  </div>
                </div>
              </div>
            `;
        })
        .join("");
      return `
          <div class="todo js-todo" data-date="${date}">
            <div class="todo-title">
              <img src="./assets/Expand Arrow.png" class="todo-arrow" />
              <p class="todo-date">${date}</p>
            </div>
            <div class="todo-entries show-entry">
              ${entries}
            </div>
          </div>
        `;
    })
    .join("");
};

const handleToggleGroup = (el) => {
  const entries = el.nextElementSibling;
  const arrow = el.querySelector(".todo-arrow");
  const open = entries.classList.toggle("show-entry");
  arrow.classList.toggle("rotate-up", open);
};

const handleToggleDone = (id) => {
  const task = allTasks.find((t) => t.id === id);
  if (!task) return;
  task.checkTodo();
  localStorage.setItem("tasks", JSON.stringify(allTasks));
};

const handleDelete = (id) => {
  const idx = allTasks.findIndex((t) => t.id === id);
  if (idx < 0) return;
  allTasks.splice(idx, 1);
  localStorage.setItem("tasks", JSON.stringify(allTasks));
};

const handleEditSelect = (id) => {
  const task = allTasks.find((t) => t.id === id);
  if (!task) return;
  document.querySelector(".js-save-task-btn").classList.add("hide-btn");
  document.querySelector(".js-edit-task-btn").classList.remove("hide-btn");
  document.querySelector(".js-task-title").value = task.title;
  document.querySelector(".js-task-description").value = task.description;
  document.querySelector(".js-task-priority").value = task.priority;
  const dt = new Date(task.dateObj);
  document.querySelector(
    ".js-date-time-text"
  ).textContent = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(dt.getDate()).padStart(2, "0")}`;
  showTaskFormHandler();
  currentEditId = id;
};

const handleEditSubmit = (e) => {
  e.preventDefault();
  if (currentEditId === null) return;
  const title = document.querySelector(".js-task-title").value.trim();
  const desc = document.querySelector(".js-task-description").value.trim();
  const priority = document.querySelector(".js-task-priority").value;
  const dateVal = document.querySelector(".js-task-date-time").value;
  const valid = createTaskFormValidation(title, desc);
  if (!valid.isValid) {
    showAlert("Validation Error", valid.error, "loss");
    return;
  }
  let dt = new Date(dateVal);
  if (isNaN(dt.getTime())) dt = new Date();
  const task = allTasks.find((t) => t.id === currentEditId);
  task.title = title;
  task.description = desc;
  task.priority = priority;
  task.dateObj = dt;
  task.dueDate = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`;
  task.dueTime = dt.getTime();
  localStorage.setItem("tasks", JSON.stringify(allTasks));
  showAlert("Successful Update", `${task.title} updated`, "win");
  resetCreateTaskFormInputs();
  currentEditId = null;
  document.querySelector(".js-edit-task-btn").classList.add("hide-btn");
  document.querySelector(".js-save-task-btn").classList.remove("hide-btn");
  renderTasks();
  hideTaskFormHandler();
};

export const init = () => {
  taskHolder.addEventListener("click", (e) => {
    const titleEl = e.target.closest(".todo-title");
    if (titleEl) return handleToggleGroup(titleEl);
    const block = e.target.closest(".js-todo-block");
    if (block) {
      const id = Number(block.dataset.id);
      handleToggleDone(id);
      renderTasks();
      return;
    }
    const del = e.target.closest(".js-delete-task-btn");
    if (del) {
      handleDelete(Number(del.dataset.id));
      renderTasks();
      return;
    }
    const main = e.target.closest(".js-todo-main-entry");
    if (main) return handleEditSelect(Number(main.dataset.id));
  });

  document
    .querySelector(".js-edit-task-btn")
    .addEventListener("click", handleEditSubmit);
  document
    .querySelector(".js-save-task-btn")
    .addEventListener("click", createTask);

  renderTasks();
};
