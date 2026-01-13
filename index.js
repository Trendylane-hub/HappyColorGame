import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, deleteUser as firebaseDeleteUser } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

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

// ----------------------------
// LOGIN
// ----------------------------
window.login = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if(email === "chaudhryzakariya2014@gmail.com") {
      // admin panel
      document.getElementById("login").style.display = "none";
      document.getElementById("adminPanel").style.display = "block";
    } else {
      // normal user panel
      document.getElementById("login").style.display = "none";
      document.getElementById("userPanel").style.display = "block";
      document.getElementById("userEmail").textContent = email;
    }
  } catch(error) {
    alert(error.message);
  }
}

// ----------------------------
// LOGOUT
// ----------------------------
window.logout = () => {
  document.getElementById("login").style.display = "block";
  document.getElementById("adminPanel").style.display = "none";
  document.getElementById("userPanel").style.display = "none";
}

// ----------------------------
// ADMIN: CREATE USER
// ----------------------------
window.createUser = async () => {
  const email = document.getElementById("newEmail").value;
  const password = document.getElementById("newPassword").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("User created successfully!");
  } catch(error) {
    alert(error.message);
  }
}

// ----------------------------
// ADMIN: DELETE USER (must be logged in as admin)
// ----------------------------
window.deleteUser = async () => {
  const email = document.getElementById("deleteEmail").value;

  try {
    const user = auth.currentUser;
    if(!user || user.email !== "chaudhryzakariya2014@gmail.com") {
      alert("You must be logged in as admin to delete users");
      return;
    }

    // Firebase Auth requires admin SDK or backend to delete another user
    alert("Deleting users requires a backend. For now, only sign-out users is possible.");
  } catch(error) {
    alert(error.message);
  }
}

