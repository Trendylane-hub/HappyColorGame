// Simple user "database" with hashed passwords
const users = {
  "admin": {
    hash: "ef92b778bafe771e89245b89ecbcfabc5c414d3aa22e46d6748b1370a25b1f78", // hash of 'admin123'
    role: "admin"
  },
  "bob": {
    hash: "a8b64babdffb15e79b062db50eebca4f8ffde44de23a95d833f1d11ecdfdf6e3", // hash of 'test123'
    role: "user"
  }
};

// Helper: hash password using SHA-256
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// Login function
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

// Logout
function logout() {
  document.getElementById("login").style.display = "block";
  document.getElementById("adminPanel").style.display = "none";
  document.getElementById("userPanel").style.display = "none";
}

// Admin: Create new user
async function createUser() {
  const username = document.getElementById("newUsername").value;
  const password = document.getElementById("newPassword").value;

  if(users[username]) return alert("User already exists");

  const passwordHash = await hashPassword(password);
  users[username] = { hash: passwordHash, role: "user" };
  alert("User created!");
}

// Admin: Delete user
function deleteUser() {
  const username = document.getElementById("deleteUsername").value;

  if(!users[username]) return alert("User not found");
  if(username === "admin") return alert("Cannot delete admin!");

  delete users[username];
  alert("User deleted!");
}
