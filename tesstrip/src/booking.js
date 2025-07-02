// src/booking.js

// =========================
// 🔗 Firebase Setup (via central module)
// =========================
import { db } from './firebase/firebase.js';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';

// =========================
// ✅ Booking Confirmation (used in dashboard after payment)
// =========================
export async function confirmBooking(tripId) {
  const tripRef = doc(db, "groupTrips", tripId);
  const tripSnap = await getDoc(tripRef);

  if (!tripSnap.exists()) {
    console.warn(`Trip ID "${tripId}" does not exist in Firestore.`);
    return false;
  }

  const data = tripSnap.data();

  if (data.bookedSlots < data.totalSlots) {
    await updateDoc(tripRef, {
      bookedSlots: increment(1)
    });
    return true;
  } else {
    alert("Sorry, that trip is fully booked now.");
    return false;
  }
}

// =========================
// 🚀 Initialize Booking UI
// =========================
export async function initBooking() {
  // 📌 Attach modal trigger globally
  window.openBookModal = (eventType) => {
    document.getElementById('bookModal').style.display = 'flex';
    document.getElementById('eventType').value = eventType;
  };

  // 📩 Handle booking modal form submission
  window.handleBooking = (e) => {
    e.preventDefault();
    const name = document.getElementById('bookName').value;
    const email = document.getElementById('bookEmail').value;
    const date = document.getElementById('bookDate').value;
    const type = document.getElementById('eventType').value;

    const eventEmail = type.toLowerCase().replace(/[^a-z]/g, '') + "@tesstrip.com";
    alert(`Thanks, ${name}! We’ll follow up from ${eventEmail}`);
    document.getElementById('bookModal').style.display = 'none';
  };

  // 🎯 Load trip slot info
  const tripId = "ghana-retreat-2025";
  const tripRef = doc(db, "groupTrips", tripId);
  const snap = await getDoc(tripRef);

  if (!snap.exists()) return;

  const data = snap.data();
  const slotsLeft = data.totalSlots - data.bookedSlots;

  const tripTitle = document.getElementById("tripTitle");
  const slotsLeftText = document.getElementById("slotsLeft");
  const bookBtn = document.getElementById("bookNowBtn");

  if (tripTitle && slotsLeftText && bookBtn) {
    tripTitle.textContent = data.title;
    slotsLeftText.textContent = slotsLeft;

    if (slotsLeft <= 0) {
      bookBtn.textContent = "Fully Booked";
      bookBtn.disabled = true;
      bookBtn.style.backgroundColor = "#aaa";
    } else {
      bookBtn.disabled = false;
      bookBtn.style.cursor = "pointer";
      bookBtn.addEventListener("click", () => {
        localStorage.setItem("tripToBook", tripId);
        window.location.href = "/signup.html?trip=" + tripId;
      });
    }
  }
}
