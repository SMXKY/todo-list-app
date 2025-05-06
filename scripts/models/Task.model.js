import { renderTasks } from "../renderTasks.js";

export class Task {
  constructor(title, description, dueDate, dueTime, priority, dateObj) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.dueTime = dueTime;
    this.priority = priority;
    this.createdAt = Date.now();
    this.isDone = false;
    this.id = Date.now();
    this.dateObj = dateObj;
  }

  setTitle(title) {
    this.title = title;
  }

  setDueDateTime(dueDate, dueTime) {
    this.dueDate = dueDate;
    this.dueTime = dueTime;
  }

  setDescription(description) {
    this.description = description;
  }

  setPriority(priority) {
    this.priority = priority;
  }

  checkTodo() {
    this.isDone = !this.isDone;
    // renderTasks();
  }
}

const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

export const allTasks = storedTasks.map((task) => {
  const t = new Task(
    task.title,
    task.description,
    task.dueDate,
    task.dueTime,
    task.priority,
    task.dateObj
  );
  t.id = task.id;
  t.createdAt = task.createdAt;
  t.isDone = task.isDone;
  return t;
});

export function saveTask(task) {
  allTasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(allTasks));
  return task;
}
