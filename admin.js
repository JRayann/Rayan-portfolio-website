const API_URL = "https://script.google.com/macros/s/AKfycbxTa4RvOqDNLy--aK8cTuDh2BpTABpyrxGKCkCoHfX3cwCtZwZWqTFWcmQpSxeoAsOe/exec";

const tableBody = document.getElementById("requestsTable");
const searchInput = document.getElementById("searchInput");
const serviceFilter = document.getElementById("serviceFilter");
const statusFilter = document.getElementById("statusFilter");
const filterBtn = document.getElementById("filterBtn");
const saveChangesBtn = document.getElementById("saveChangesBtn");
const logoutBtn = document.getElementById("logoutBtn");

let requests = [];

async function loadRequests() {
  const response = await fetch(API_URL);
  requests = await response.json();

  renderStats();
  renderTable(requests);
}

function renderStats() {
  document.getElementById("totalRequests").textContent = requests.length;
  document.getElementById("newRequests").textContent =
    requests.filter(r => String(r.status).trim() === "New").length;
  document.getElementById("completedRequests").textContent =
    requests.filter(r => String(r.status).trim() === "Completed").length;
}

function renderTable(data) {
  tableBody.innerHTML = "";

  data.forEach(req => {
    const statusClass = String(req.status)
      .toLowerCase()
      .replace(" ", "-");

    tableBody.innerHTML += `
      <tr class="request-row ${statusClass}">
        <td>${req.requestId}</td>
        <td>${req.fullName}</td>
        <td>${req.service}</td>
        <td>${req.email}</td>
        <td>
          <select class="status-select" data-id="${req.requestId}">
            <option value="New" ${req.status === "New" ? "selected" : ""}>New</option>
            <option value="In Progress" ${req.status === "In Progress" ? "selected" : ""}>In Progress</option>
            <option value="Completed" ${req.status === "Completed" ? "selected" : ""}>Completed</option>
            <option value="Rejected" ${req.status === "Rejected" ? "selected" : ""}>Rejected</option>
          </select>
        </td>
      </tr>
    `;
  });

  document.querySelectorAll(".status-select").forEach(select => {
    select.addEventListener("change", function () {
      const requestId = this.dataset.id;
      const newStatus = this.value;

      const request = requests.find(r => r.requestId === requestId);

      if (request) {
        request.status = newStatus;
      }

      applyFilters();
      renderStats();
    });
  });
}

function applyFilters() {
  const searchValue = searchInput.value.toLowerCase().trim();
  const serviceValue = serviceFilter.value;
  const statusValue = statusFilter.value;

  const filtered = requests.filter(req => {
    const matchSearch =
      String(req.requestId).toLowerCase().includes(searchValue) ||
      String(req.fullName).toLowerCase().includes(searchValue) ||
      String(req.service).toLowerCase().includes(searchValue) ||
      String(req.email).toLowerCase().includes(searchValue);

    const matchService =
      serviceValue === "all" || req.service === serviceValue;

    const matchStatus =
      statusValue === "all" || req.status === statusValue;

    return matchSearch && matchService && matchStatus;
  });

  renderTable(filtered);
}

searchInput.addEventListener("input", applyFilters);
serviceFilter.addEventListener("change", applyFilters);
statusFilter.addEventListener("change", applyFilters);

if (filterBtn) {
  filterBtn.addEventListener("click", applyFilters);
}

saveChangesBtn.addEventListener("click", async () => {
  saveChangesBtn.textContent = "Saving...";
  saveChangesBtn.disabled = true;

  for (const req of requests) {
    await fetch(API_URL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        action: "updateStatus",
        requestId: req.requestId,
        status: req.status
      })
    });
  }

  saveChangesBtn.textContent = "Saved";

  setTimeout(() => {
    saveChangesBtn.textContent = "Save Changes";
    saveChangesBtn.disabled = false;
  }, 1200);
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("adminLoggedIn");
  window.location.href = "login.html";
});

loadRequests();