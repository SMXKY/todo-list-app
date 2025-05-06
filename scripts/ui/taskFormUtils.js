const dateTimeText = document.querySelector(".js-date-time-text");
const dateInputValue = document.querySelector(".js-task-date-time");

export const handleDataTimeClick = () => {
  const calendar = document.querySelector(".js-calendar");
  calendar.showPicker();
};

export const updateDateTimeOnUI = () => {
  const dateDateTime = new Date(dateInputValue.value);
  //   console.log(dateDateTime);
  const year = dateDateTime.getFullYear();
  const month = String(dateDateTime.getMonth() + 1).padStart(2, "0");
  const day = String(dateDateTime.getDate()).padStart(2, "0");

  dateTimeText.innerHTML = `${year}-${month}-${day}`;
};
