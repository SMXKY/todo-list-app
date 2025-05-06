export function initPageToggle() {
  const taskPage = document.querySelector(".js-task-page");
  const calendarPage = document.querySelector(".js-calendar-page");
  const taskBtn = document.querySelector(".js-task-page-btn");
  const calendarBtn = document.querySelector(".js-calendar-page-btn");

  if (!taskPage || !calendarPage || !taskBtn || !calendarBtn) {
    console.error("Toggle init failed: missing one of the required selectors.");
    return;
  }

  function showTasks() {
    taskPage.classList.remove("hide-page");
    calendarPage.classList.add("hide-page");
  }

  function showCalendar() {
    calendarPage.classList.remove("hide-page");
    taskPage.classList.add("hide-page");
  }

  taskBtn.addEventListener("click", showTasks);
  calendarBtn.addEventListener("click", showCalendar);
}

// Auto‑initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  initPageToggle();
});
