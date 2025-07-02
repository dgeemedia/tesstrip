// 💸 Vacation savings plan calculator logic inside #plannerModal
function calculatePlan() {
  const income = parseFloat(document.getElementById('income').value);
  const tripCost = parseFloat(document.getElementById('tripCost').value);
  const months = parseInt(document.getElementById('months').value);

  if (!income || !tripCost || !months) {
    alert("Please fill in all planner fields.");
    return;
  }

  const monthlySave = (tripCost / months).toFixed(2);
  const percentage = ((monthlySave / income) * 100).toFixed(1);

  document.getElementById('output').innerHTML = `
    <p>You need to save <strong>₦${monthlySave}</strong> monthly for ${months} months.</p>
    <p>This is about <strong>${percentage}%</strong> of your income.</p>
    <p><a href="signup.html" class="btn">Create an Account to Track Plan</a></p>
  `;
}

// 📝 Save button in .planner-form redirects to signup
function savePlan() {
  alert("Please sign up or log in to save your vacation plan.");
  window.location.href = "signup.html";
}

export function initPlanner() {

  // 🧭 Opens the planner modal when "Plan My Vacation" button is clicked
  document.getElementById('openPlanner').onclick = () => {
    document.getElementById('plannerModal').style.display = 'block';
  };

  // ❌ Closes planner modal when close icon is clicked
  document.getElementById('closeModal').onclick = () => {
    document.getElementById('plannerModal').style.display = 'none';
  };

  // 🖱️ Closes modal when clicking outside the content
  window.onclick = (e) => {
    if (e.target === document.getElementById('plannerModal')) {
      document.getElementById('plannerModal').style.display = 'none';
    }
  };

  window.calculatePlan = calculatePlan;
  window.savePlan = savePlan;
}
