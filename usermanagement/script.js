const API = "http://localhost:3000";

// ================= SHOW ALL USERS =================

async function getAllUsers() {
  let response = await fetch(`${API}/api/users`);
  response = await response.json();
  const table = document.getElementById("userTable");
  table.innerHTML = `${response
    .map((user) => {
      return `<tr>
      <td>${user.id}</td>
      <td>${user.first_name}</td>
      <td>${user.last_name}</td>
      <td>${user.gender}</td>
      <td>${user.email}</td>
      <td><button type="button" onclick="openEdit(${user.id})">Edit</button><button type="button" onclick="deleteUser(${user.id})">Delete</button>
      </td>
      
    </tr>`;
    })
    .join("")}`;

  document.querySelector(".add-box").style.display = "none";
}

// ================= GET USER BY ID =================

async function getUserById() {
  const id = document.getElementById("userIdInput").value;
  let response = await fetch(`${API}/api/users/${id}`);
  response = await response.json();
  const table = document.getElementById("userTable");
  table.innerHTML = `${response
    .map((user) => {
      return `<tr>
      <td>${user.id}</td>
      <td>${user.first_name}</td>
      <td>${user.last_name}</td>
      <td>${user.gender}</td>
      <td>${user.email}</td>
      <td><button type="button" onclick="OpenEdit(${id})" >Edit</button><button type="button" onclick="deleteUser(${id})">Delete</button>
      </td>
      
    </tr>`;
    })
    .join("")}`;
  document.querySelector(".add-box").style.display = "none";
}

// ================= DELETE USER =================

async function deleteUser(id) {
  let response = await fetch(`${API}/api/delete/${id}`, {
    method: "DELETE",
  });
  document.querySelector(".add-box").style.display = "none";

  await getAllUsers();
}

function addnewUsers() {
  const add = document.querySelector(".add-box");
  add.style.display = "block";
}

async function addUser() {
  const first_name = document.getElementById("first_name").value;
  const last_name = document.getElementById("last_name").value;
  const gender = document.getElementById("gender").value;
  const email = document.getElementById("email").value;
  console.log(first_name, last_name, gender, email, "l");

  let response = await fetch(`${API}/api/newuser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `first_name=${first_name}&last_name=${last_name}&gender=${gender}&email=${email}`,
  });
  response = await response.json();
  console.log(response);
}

// ================= OPEN EDIT FORM =================
let currentid = null;
async function openEdit(id) {
  document.querySelector(".edit-box").style.display = "block";
  let user = await fetch(`${API}/api/users/${id}`);
  user = await user.json();
  currentid = id;
  document.querySelector("#editFirst").value = user[0].first_name;
  document.querySelector("#editLast").value = user[0].last_name;
  document.querySelector("#editGender").value = user[0].gender;
  document.querySelector("#editEmail").value = user[0].email;
}

// ================= UPDATE USER =================

async function updateUser() {
  const first_name = document.querySelector("#editFirst").value;
  const last_name = document.querySelector("#editLast").value;
  const gender = document.querySelector("#editGender").value;
  const email = document.querySelector("#editEmail").value;

  let response = await fetch(`${API}/api/update/${currentid}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ first_name, last_name, gender, email }),
  });
  response = await response.json();
  console.log(response);
  await getAllUsers();
  closeEdit();
}

// ================= CLOSE EDIT FORM =================

function closeEdit() {
  document.querySelector(".edit-box").style.display = "none";
}

window.onload = getAllUsers();
