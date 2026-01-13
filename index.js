// ----------------------------
// USERS DATABASE (hashed passwords)
// ----------------------------
const users = {
  "admin": {
    hash: "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9", // admin123
    role: "admin"
  },
  "bob": {
    hash: "a8b64babdffb15e79b062db50eebca4f8ffde44de23a95d833f1d11ecdfdf6e3", // test123
    role: "user"
  }
};

// ----------------------------
// HELPER: SHA-256 hash function
// ----------------------------
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ----------------------------
// LOGIN FUNCTION
// ----------------------------
async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if(!users[username]) return alert("Username not found");

  const passwordHash = await hashPassword(password);
  if(passwordHash !== users[username].hash) return alert("Incorrect password");

  if(users[username].role === "admin") {
    document.getElementById("login").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
  } else {
    document.getElementById("login").style.display = "none";
    document.getElementById("userPanel").style.display = "block";
    document.getElementById("userDisplay").textContent = username;
  }
}

// ----------------------------
// LOGOUT FUNCTION
// ----------------------------
function logout() {
  document.getElementById("login").style.display = "block";
  document.getElementById("adminPanel").style.display = "none";
  document.getElementById("userPanel").style.display = "none";
}

// ----------------------------
// ADMIN: CREATE USER
// ----------------------------
async function createUser() {
  const username = document.getElementById("newUsername").value;
  const password = document.getElementById("newPassword").value;

  if(users[username]) return alert("User already exists");

  const passwordHash = await hashPassword(password);
  users[username] = { hash: passwordHash, role: "user" };
  alert("User created!");
}

// ----------------------------
// ADMIN: DELETE USER
// ----------------------------
function deleteUser() {
  const username = document.getElementById("deleteUsername").value;

  if(!users[username]) return alert("User not found");
  if(username === "admin") return alert("Cannot delete admin!");

  delete users[username];
  alert("User deleted!");
}

// ----------------------------
// EVENT LISTENERS
// ----------------------------
document.getElementById("loginBtn").addEventListener("click", login);
document.getElementById("logoutBtn1").addEventListener("click", logout);
document.getElementById("logoutBtn2").addEventListener("click", logout);
document.getElementById("createUserBtn").addEventListener("click", createUser);
document.getElementById("deleteUserBtn").addEventListener("click", deleteUser);

