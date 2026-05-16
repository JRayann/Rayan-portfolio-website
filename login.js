const loginBtn = document.getElementById("loginBtn");

if (!localStorage.getItem("adminUsername")) {
  localStorage.setItem("adminUsername", "admin");
}

if (!localStorage.getItem("adminPassword")) {
  localStorage.setItem("adminPassword", "12345");
}

loginBtn.addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("loginError");

  const savedUsername = localStorage.getItem("adminUsername");
  const savedPassword = localStorage.getItem("adminPassword");

  if (username === savedUsername && password === savedPassword) {
    localStorage.setItem("adminLoggedIn", "true");
    window.location.href = "admin.html";
  } else {
    error.style.display = "block";
  }
});