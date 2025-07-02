// src/auth/login.js
import '../../styles/global.css';

import { auth } from '../firebase.js';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail
} from 'firebase/auth';

document.querySelector("form").onsubmit = async (e) => {
  e.preventDefault();
  const email = e.target[0].value;
  const password = e.target[1].value;
  const remember = document.getElementById("rememberMe").checked;

  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const user = userCred.user;

    if (!user.emailVerified) {
      alert("Please verify your email address first.");
      document.getElementById("resendPrompt").style.display = "block";
      return;
    }

    const name = user.displayName || "Traveler";
    (remember ? localStorage : sessionStorage).setItem("tesstripUser", name);
    window.location.href = "dashboard.html";
  } catch (err) {
    alert(err.message);
  }
};

document.getElementById("resendEmailLink").onclick = async () => {
  const user = auth.currentUser;
  if (!user) return alert("Please log in first.");
  await sendEmailVerification(user);
  document.getElementById("resendStatus").textContent = "✅ Verification email resent.";
  document.getElementById("resendStatus").style.display = "block";
};

document.getElementById("resetLink").onclick = async () => {
  const email = prompt("Enter your email:");
  if (!email) return;
  await sendPasswordResetEmail(auth, email);
  alert("Reset email sent!");
};

onAuthStateChanged(auth, (user) => {
  if (user?.emailVerified) window.location.href = "dashboard.html";
});
