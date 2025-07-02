// src/auth/signup.js
import '../../styles/global.css';

import { auth, db } from '../firebase.js';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification
} from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

const form = document.querySelector("form");
const loader = document.getElementById("loader");
const tripId = new URLSearchParams(window.location.search).get("trip");

form.onsubmit = async (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();
  const password = form.password.value;
  const confirmPassword = form.confirmPassword.value;

  if (password !== confirmPassword) return alert("Passwords do not match.");
  loader.style.display = "block";

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCred.user);
    await addDoc(collection(db, "users"), {
      uid: userCred.user.uid,
      name, email, phone,
      createdAt: new Date()
    });

    localStorage.setItem("tesstripUser", name);
    if (tripId) localStorage.setItem("tripToBook", tripId);
    alert(`🎉 Signup successful! A verification email has been sent to ${email}`);
    window.location.href = "login.html";
  } catch (err) {
    loader.style.display = "none";
    alert(err.code.includes("email-already-in-use")
      ? "Email already in use. Try logging in."
      : "Signup failed: " + err.message);
  }
};

// 🧱 PWA setup
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(() => console.log("✅ Service Worker registered"))
    .catch(err => console.warn("SW error:", err));
}
