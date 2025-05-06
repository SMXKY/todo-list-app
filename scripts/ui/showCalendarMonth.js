import { allTasks, Task } from "../models/Task.model.js";

const monthInput = document.querySelector(".js-month-pick");
const monthText = document.querySelector(".js-month-text");

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const showCalendarMonth = () => {
  monthInput.showPicker();
};

monthInput.addEventListener("input", () => {
  const date = new Date(monthInput.value);
  const monthName = monthNames[date.getMonth()];
  monthText.innerHTML = `${monthName} ${date.getFullYear()}`;

  renderCalendar(date.getMonth() + 1, date.getFullYear());
});

export const renderCalendar = (month, year) => {
  // month: 1–12
  const days = generateMonthCells(year, month, true);
  const calendar = document.querySelector(".js-calendar-entries");
  calendar.innerHTML = ""; // **clear** previous render

  days.forEach((day) => {
    // build a YYYY-MM-DD string or null
    const dateStr = day.date !== null ? `${year}-${month}-${day.date}` : null;

    // filter your tasks array
    const dayTodos = dateStr
      ? allTasks.filter((todo) => todo.dueDate === dateStr)
      : [];

    // console.log(dateStr, allTasks);

    // build the HTML for tasks
    const tasksHtml = dayTodos
      .map(
        (todo) => `
            <div class="calendar-task">
              <p class="calendar-entry-title" >${todo.title}</p>
              <div class="check-box">
                <div class="check-box-circle js-calendar-todo  ${
                  todo.isDone ? "done-calendat-todo" : ""
                }" data-id="${todo.id}"></div>
                <p>Done</p>
              </div>
            </div>
          `
      )
      .join("");

    // append one calendar‐cell
    calendar.innerHTML += `
            <div class="calendar-entry ${
              day.isDayofTheMonth ? "" : "placeholder"
            }">
              <div class="calendar-entry-date-number">${day.date || ""}</div>
              <div class="calendar-tasks">
                ${tasksHtml}
              </div>
              ${
                day.isDayofTheMonth
                  ? `<p class="calendar-entry-date">${monthNames[month - 1]} ${
                      day.date
                    }, ${year}</p>`
                  : ""
              }
            </div>
          `;
  });

  document.querySelectorAll(".js-calendar-todo").forEach((todo) => {
    todo.addEventListener("click", () => {
      //   console.log(todo, allTasks, todo.dataset.id);
      const task = allTasks.find(
        (t) => Number(t.id) === Number(todo.dataset.id)
      );
      //   console.log(task);
      if (task) {
        task.checkTodo();
        localStorage.setItem("tasks", JSON.stringify(allTasks));
        renderCalendar(month, year);
      }
    });
  });
};

function generateMonthCells(year, monthOneBased, startOnMonday = false) {
  if (monthOneBased < 1 || monthOneBased > 12) {
    throw new Error("monthOneBased must be between 1 and 12");
  }

  // Setup names
  const dayNames = startOnMonday
    ? [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ]
    : [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

  // How many days in the requested month?
  const daysInMonth = new Date(year, monthOneBased, 0).getDate();

  // Day-of-week of the 1st (0=Sun … 6=Sat)
  const rawFirstDow = new Date(year, monthOneBased - 1, 1).getDay();
  // Convert so Monday=0 if needed
  const firstWeekdayIndex = startOnMonday ? (rawFirstDow + 6) % 7 : rawFirstDow;

  const cells = [];
  let weekNum = 1;

  // 1) Placeholders before the 1st of the month
  for (let i = 0; i < firstWeekdayIndex; i++) {
    cells.push({
      day: `${dayNames[i]} ${weekNum}`,
      isDayofTheMonth: false,
      items: [],
      date: null,
    });
  }

  // 2) Real days of the month
  for (let d = 1; d <= daysInMonth; d++) {
    const dt = new Date(year, monthOneBased - 1, d);
    const rawDow = dt.getDay();
    const dowIdx = startOnMonday ? (rawDow + 6) % 7 : rawDow;

    // Start a new week after Sunday (or Saturday if Sun‑start)
    if (d > 1 && dowIdx === 0) {
      weekNum++;
    }

    cells.push({
      day: `${dayNames[dowIdx]} ${weekNum}`,
      isDayofTheMonth: true,
      items: [],
      date: d,
    });
  }

  return cells;
}
