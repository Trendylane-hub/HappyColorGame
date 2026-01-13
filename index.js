import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCDNfAL0vzSorHkrOuOA7KomWnpZwgMsxc",
  authDomain: "happy-color-game.firebaseapp.com",
  projectId: "happy-color-game",
  storageBucket: "happy-color-game.appspot.com",
  messagingSenderId: "97392816870",
  appId: "1:97392816870:web:cf10c9b34900f19cfb8127"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Convert username → Firebase email
const usernameToEmail = (username) => {
  if(username.toLowerCase() === "admin") return "admin@happycolorgame.local";
  return `${username}@happycolorgame.local`;
};

// Login function
window.login = () => {
  const username = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const email = usernameToEmail(username);

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      if(username.toLowerCase() === "admin") {
        // Show admin panel
        document.getElementById("login").style.display = "none";
        document.getElementById("adminPanel").style.display = "block";
      } else {
        // Normal user
        document.getElementById("login").style.display = "none";
        document.getElementById("userPanel").style.display = "block";
        document.getElementById("userEmail").textContent = username;
      }
    })
    .catch(err => alert(err.message));
}

// Logout
window.logout = () => {
  signOut(auth).then(() => {
    document.getElementById("login").style.display = "block";
    document.getElementById("adminPanel").style.display = "none";
    document.getElementById("userPanel").style.display = "none";
  });
}

// Admin: Create user
window.createUser = () => {
  const username = document.getElementById("newUserEmail").value;
  const password = document.getElementById("newUserPassword").value;
  const email = usernameToEmail(username);

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => alert("User created!"))
    .catch(err => alert(err.message));
}

// Admin: Delete user (requires Cloud Functions)
window.deleteUser = () => {
  alert("Delete user requires Cloud Functions.");
}

