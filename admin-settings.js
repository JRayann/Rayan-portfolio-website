if (localStorage.getItem("adminLoggedIn") !== "true") {
  window.location.href = "login.html";
}

const newUsername = document.getElementById("newUsername");
const newPassword = document.getElementById("newPassword");
const saveBtn = document.getElementById("saveSettings");
const message = document.getElementById("settingsMessage");

newUsername.value = localStorage.getItem("adminUsername") || "admin";

saveBtn.addEventListener("click", () => {
  if (newUsername.value.trim() === "" || newPassword.value.trim() === "") {
    message.style.display = "block";
    message.style.color = "#ef4444";
    message.textContent = "Please enter username and password.";
    return;
  }

  localStorage.setItem("adminUsername", newUsername.value.trim());
  localStorage.setItem("adminPassword", newPassword.value.trim());

  message.style.display = "block";
  message.style.color = "#4ade80";
  message.textContent = "Account updated successfully.";
});