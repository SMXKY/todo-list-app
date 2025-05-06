const alertHolder = document.querySelector(".js-alert-holder");

export const alertId = {
  id: null,
};

export const showAlert = (title, text, type) => {
  if (alertId.id) {
    clearTimeout(alertId.id);
    alertId.id = null;
  }

  const html = `      
    <div class="alert-content">
      <img src="./assets/${type}.png" alt="alert-icon" class="alert-icon" />
      <div class="alert-text">
        <p class="alert-title">${title}</p>
        <p class="alert-note">${text}</p>
      </div>
    </div>
    <img src="./assets/Close.png" alt="close-icon" class="close-btn" />
  `;
  alertHolder.innerHTML = html;
  alertHolder.style.borderLeft = `solid 0.5rem ${
    type === "win" ? "#00D084" : "#FF3C38"
  }`;
  alertHolder.classList.add("show-alert");

  const alertTime = type === "loss" ? 3000 : 5000;
  alertId.id = setTimeout(() => {
    hideAlert();
    alertId.id = null;
  }, alertTime);

  return;
};

export const hideAlert = () => {
  // Clear any pending timeout to prevent multiple calls
  if (alertId.id) {
    clearTimeout(alertId.id);
    alertId.id = null;
  }
  alertHolder.classList.remove("show-alert");
};
