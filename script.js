let expenses = [];
let editId = null;

function displayExpense(expense) {
  const list = document.getElementById("list");
  const li = document.createElement("li");
  li.id = String(expense.id);
  li.className =
    "list-group-item d-flex justify-content-between align-items-center";
  li.innerHTML = `
    <div>
      <div class="fw-semibold">
        ${expense.text} <span class="badge bg-secondary">${
    expense.category
  }</span>
      </div>
      <small class="text-muted">₹ ${Number(expense.amount).toFixed(2)}</small>
    </div>
    <div class="d-flex gap-2">
      <button class="btn btn-sm btn-outline-secondary">Edit</button>
      <button class="btn btn-sm btn-outline-danger">Delete</button>
    </div>
  `;

  const [editBtn, deleteBtn] = li.getElementsByTagName("button");
  editBtn.addEventListener("click", function () {
    onEdit(expense.id);
  });
  deleteBtn.addEventListener("click", function () {
    onDelete(expense.id);
  });

  list.appendChild(li);
}

function renderAll() {
  const list = document.getElementById("list");
  list.innerHTML = "";
  for (let i = 0; i < expenses.length; i++) displayExpense(expenses[i]);
}

function resetForm() {
  document.getElementById("form").reset();
  editId = null;
  document.getElementById("saveBtn").textContent = "Add";
  document.getElementById("cancelBtn").classList.add("d-none");
}

function onEdit(id) {
  const item = expenses.find(function (x) {
    return x.id === id;
  });
  if (!item) return;

  document.getElementById("amount").value = item.amount;
  document.getElementById("text").value = item.text;
  document.getElementById("category").value = item.category;

  editId = id;
  document.getElementById("saveBtn").textContent = "Update";
  document.getElementById("cancelBtn").classList.remove("d-none");
}

function onDelete(id) {
  expenses = expenses.filter(function (x) {
    return x.id !== id;
  });
  const li = document.getElementById(String(id));
  if (li) li.remove();
}

function handleSubmitForm(event) {
  event.preventDefault();

  const amount = document.getElementById("amount").value;
  const text = document.getElementById("text").value;
  const category = document.getElementById("category").value;

  if (!amount || Number(amount) <= 0 || !String(text).trim() || !category)
    return;

  if (editId) {
    for (let i = 0; i < expenses.length; i++) {
      if (expenses[i].id === editId) {
        expenses[i].amount = Number(amount);
        expenses[i].text = String(text).trim();
        expenses[i].category = String(category);
        break;
      }
    }
    renderAll();
  } else {
    const newItem = {
      id: Date.now(),
      amount: Number(amount),
      text: String(text).trim(),
      category: String(category),
    };
    expenses.push(newItem);
    displayExpense(newItem);
  }

  resetForm();
}

document.getElementById("form").addEventListener("submit", handleSubmitForm);
document.getElementById("cancelBtn").addEventListener("click", resetForm);
renderAll();

// const LS_KEY = "expenses_simple_crud";
// let expenses = [];
// let editId = null;

// function load() {
//   const raw = localStorage.getItem(LS_KEY);
//   expenses = raw ? JSON.parse(raw) : []; // parse array from storage
// }

// function save() {
//   localStorage.setItem(LS_KEY, JSON.stringify(expenses)); // stringify back
// }

// function displayExpense(expense) {
//   const list = document.getElementById("list");
//   const li = document.createElement("li");
//   li.id = String(expense.id);
//   li.className =
//     "list-group-item d-flex justify-content-between align-items-center";
//   li.innerHTML = `
//     <div>
//       <div class="fw-semibold">
//         ${expense.text} <span class="badge bg-secondary">${
//     expense.category
//   }</span>
//       </div>
//       <small class="text-muted">₹ ${Number(expense.amount).toFixed(2)}</small>
//     </div>
//     <div class="d-flex gap-2">
//       <button class="btn btn-sm btn-outline-secondary">Edit</button>
//       <button class="btn btn-sm btn-outline-danger">Delete</button>
//     </div>
//   `;

//   const [editBtn, deleteBtn] = li.getElementsByTagName("button");
//   editBtn.addEventListener("click", function () {
//     onEdit(expense.id);
//   });
//   deleteBtn.addEventListener("click", function () {
//     onDelete(expense.id);
//   });

//   list.appendChild(li);
// }

// function renderAll() {
//   const list = document.getElementById("list");
//   list.innerHTML = "";
//   for (let i = 0; i < expenses.length; i++) displayExpense(expenses[i]);
// }

// function resetForm() {
//   document.getElementById("form").reset();
//   editId = null;
//   document.getElementById("saveBtn").textContent = "Add";
//   document.getElementById("cancelBtn").classList.add("d-none");
// }

// function onEdit(id) {
//   const item = expenses.find(function (x) {
//     return x.id === id;
//   });
//   if (!item) return;

//   document.getElementById("amount").value = item.amount;
//   document.getElementById("text").value = item.text;
//   document.getElementById("category").value = item.category;

//   editId = id;
//   document.getElementById("saveBtn").textContent = "Update";
//   document.getElementById("cancelBtn").classList.remove("d-none");
// }
// // delete list
// function onDelete(id) {
//   expenses = expenses.filter(function (x) {
//     return x.id !== id;
//   });
//   save();
//   const li = document.getElementById(String(id));
//   if (li) li.remove();
// }

// function handleSubmitForm(event) {
//   event.preventDefault();

//   const amount = document.getElementById("amount").value;
//   const text = document.getElementById("text").value;
//   const category = document.getElementById("category").value;

//   if (!amount || Number(amount) <= 0 || !String(text).trim() || !category)
//     return;

//   if (editId) {
//     // Update existing
//     for (let i = 0; i < expenses.length; i++) {
//       if (expenses[i].id === editId) {
//         expenses[i].amount = Number(amount);
//         expenses[i].text = String(text).trim();
//         expenses[i].category = String(category);
//         break;
//       }
//     }
//     save();
//     renderAll();
//   } else {
//     // Add new
//     const newItem = {
//       id: Date.now(),
//       amount: Number(amount),
//       text: String(text).trim(),
//       category: String(category),
//     };
//     expenses.push(newItem);
//     save();
//     displayExpense(newItem);
//   }

//   resetForm();
// }

// function initialize() {
//   load();
//   renderAll();

//   document.getElementById("form").addEventListener("submit", handleSubmitForm);
//   document.getElementById("cancelBtn").addEventListener("click", resetForm);
// }

// initialize();
