// src/dashboard.js
import './styles/global.css';


// 🔹 Imports
import { db, auth } from './firebase/firebase.js';
import { collection, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { confirmBooking } from './booking.js';

// 🔹 User Greeting
const username = localStorage.getItem("tesstripUser") || sessionStorage.getItem("tesstripUser") || "Lucky";
document.getElementById("greeting").textContent = `Hi ${username}`;

// 🔹 Auth Check & Booking Redirect
let trips = [];

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    localStorage.removeItem("tesstripUser");
    window.location.href = "login.html";
  } else {
    const tripToBook = localStorage.getItem("tripToBook");
    if (tripToBook) {
      const confirmed = await confirmBooking(tripToBook);
      if (confirmed) {
        alert("✅ Trip booking confirmed for: " + tripToBook);
        localStorage.removeItem("tripToBook");

        const bookedTrip = trips.find(t => t.id === tripToBook);
        const amount = bookedTrip ? bookedTrip.budget : 500000;

        makePayment(user.displayName || "TessTrip User", user.email || "noemail@tesstrip.com", amount);
      }
    }
  }
});

// 🔹 DOM Elements
const rows = document.getElementById("vacationRows");
const journalEntries = document.getElementById("journalEntries");
const passportProgress = document.getElementById("passportProgress");
const countdownBtn = document.getElementById("countdownBtn");
const tripResults = document.getElementById("tripResults");
const vibeSelect = document.getElementById("vibeSelect");
const progressBar = document.getElementById("progressBarFill");
const events = [];

// 🔹 Load Vacation Plans
const tripSnapshot = await getDocs(collection(db, "vacationPlans"));
tripSnapshot.forEach((docItem) => {
  const data = docItem.data();
  trips.push(data);
  rows.innerHTML += `
    <tr>
      <td>${data.destination}</td>
      <td>${data.date}</td>
      <td>₦${data.budget}</td>
      <td>${data.status || "Planned"}</td>
      <td>${data.payment || "0% paid"}</td>
    </tr>`;
  events.push({ title: data.destination, start: data.date });
});

// 🔹 Render Calendar
const calendarEl = document.getElementById("calendar");
if (calendarEl) {
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    events: events
  });
  calendar.render();
}

// 🔹 Passport Stamps
const stamps = trips.length;
passportProgress.textContent = `Progress: ${"🟢".repeat(stamps)}${"⚪".repeat(4 - stamps)} (${stamps}/4)`;
if (progressBar) progressBar.style.width = `${Math.min((stamps / 4) * 100, 100)}%`;

// 🔹 Countdown to Next Trip
if (countdownBtn) {
  countdownBtn.addEventListener("click", () => {
    const upcoming = trips
      .filter(t => new Date(t.date) > new Date())
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    if (!upcoming.length) return alert("No upcoming vacations to countdown.");

    const diff = Math.ceil((new Date(upcoming[0].date) - new Date()) / (1000 * 60 * 60 * 24));
    alert(`⏳ Countdown: ${diff} day(s) to your next vacation in ${upcoming[0].destination}`);
  });
}

// 🔹 Load Journals
const journalSnapshot = await getDocs(collection(db, "tripJournals"));
journalSnapshot.forEach((docItem) => {
  const { title, text, date } = docItem.data();
  journalEntries.innerHTML += `
    <div class="journal-entry">
      <h3>${title}</h3>
      <p>${text}</p>
      <small>${date}</small>
    </div>`;
});

// 🔹 Save Journal Entry
document.getElementById("journalForm").onsubmit = async (e) => {
  e.preventDefault();
  const title = document.getElementById("journalTitle").value;
  const text = document.getElementById("journalText").value;
  const date = document.getElementById("journalDate").value;

  try {
    await addDoc(collection(db, "tripJournals"), { title, text, date, createdAt: new Date() });
    journalEntries.innerHTML += `<div class="journal-entry"><h3>${title}</h3><p>${text}</p><small>${date}</small></div>`;
    e.target.reset();
  } catch (err) {
    alert("Error saving journal: " + err.message);
  }
};

// 🔹 Tab Switcher
window.showTab = function (id) {
  document.querySelectorAll(".tab-content").forEach(div => div.classList.remove("active"));
  document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  document.querySelector(`.tab-btn[onclick="showTab('${id}')"]`).classList.add("active");
};

// 🔹 Vibe Filter
document.getElementById("tripFilterForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const vibe = vibeSelect.value;
  if (vibe === "Select") {
    tripResults.innerHTML = `<p>Please select a vibe to search.</p>`;
    return;
  }
  const vibeTrips = trips.filter((t) => (t.vibe || "").toLowerCase() === vibe.toLowerCase());
  tripResults.innerHTML = vibeTrips.length
    ? vibeTrips.map((t) => `
        <div class="card" style="margin-top: 1rem;">
          <h4>${t.destination}</h4>
          <p>Date: ${t.date}</p>
          <p>Budget: ₦${t.budget}</p>
          <p>Vibe: ${t.vibe}</p>
        </div>`).join("")
    : `<p>No trips match "${vibe}". Try another vibe!</p>`;
});

// 🔹 Admin Support (Placeholder)
const contactAdminBtn = document.getElementById("contactAdminBtn");
if (contactAdminBtn) {
  contactAdminBtn.addEventListener("click", async () => {
    const message = prompt("Hi! What do you need help with?");
    if (message) alert("Thanks! Your message has been sent to the admin.");
  });
}

// 🔹 Notification Request
Notification.requestPermission().then(permission => {
  if (permission === "granted") {
    console.log("🔔 Notification permission granted.");
  }
});

// 🔹 Logout
document.getElementById("logoutBtn").addEventListener("click", async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("tesstripUser");
    window.location.href = "login.html";
  } catch (err) {
    alert("Logout failed: " + err.message);
  }
});

// 🔹 Payment Function
function makePayment(name, email, amount) {
  FlutterwaveCheckout({
    public_key: "FLWPUBK_TEST-xxxxxxxxxxxxxxxxxxxxx-X",
    tx_ref: "TESS_" + Date.now(),
    amount: amount,
    currency: "NGN",
    payment_options: "card, mobilemoney, ussd",
    customer: { email, name },
    callback: async function (data) {
      try {
        const tripToBook = localStorage.getItem("tripToBook");

        await addDoc(collection(db, "payments"), {
          name, email, amount, tripId: tripToBook,
          tx_ref: data.tx_ref,
          transaction_id: data.transaction_id,
          status: data.status,
          createdAt: new Date()
        });

        // Update booked trip
        const tripSnapshot = await getDocs(collection(db, "vacationPlans"));
        for (const docItem of tripSnapshot.docs) {
          const trip = docItem.data();
          if (trip.id === tripToBook) {
            const tripRef = doc(db, "vacationPlans", docItem.id);
            await updateDoc(tripRef, {
              status: "Booked",
              payment: "100% paid"
            });
            break;
          }
        }

        alert("✅ Payment successful!");
        window.location.href = "success.html";
      } catch (err) {
        alert("✅ Payment succeeded, but failed to update trip: " + err.message);
      }
    },
    onclose: function () {
      alert("Payment was closed.");
    },
    customizations: {
      title: "TessTrip Booking",
      description: "Quarterly Vacation",
      logo: "images/logo.png",
    }
  });
}
