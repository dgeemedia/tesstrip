// 🏝️ Featured Vacation Rotator — Updates content inside #featuredVacation in .vacation-highlight section
const experiences = [
  {
    title: "Cape Verde Getaway",
    description: "Relax and network with top professionals in a serene island setting. Limited slots available!",
    image: "images/placeholder.png",
    link: "signup.html"
  },
  {
    title: "Togo Eco Getaway",
    description: "Explore eco-lodges and nature trails. Great for couples and solo adventurers.",
    image: "images/placeholder.png",
    link: "signup.html"
  },
  {
    title: "Ghana Business Adventure",
    description: "Join our exclusive networking and sightseeing combo in Accra.",
    image: "images/placeholder.png",
    link: "signup.html"
  },
  {
    title: "Badagry Beach Escape",
    description: "Weekend of calm, culture, and creativity at the coast.",
    image: "images/placeholder.png",
    link: "signup.html"
  }
];

let current = 0;

// 📸 Renders one experience at a time
function showFeatured(index) {
  const exp = experiences[index];
  const container = document.getElementById("featuredVacation"); // Target div in .vacation-highlight
  if (container) {
    container.innerHTML = `
      <img src="${exp.image}" alt="${exp.title}">
      <div class="featured-info">
        <h3>${exp.title}</h3>
        <p>${exp.description}</p>
        <button onclick="window.location.href='${exp.link}'">Reserve My Spot</button>
      </div>
    `;
  }
}

// 🔁 Rotate featured experience every 8 seconds
export function initFeaturedRotation() {
  showFeatured(current); // ⏱️ First load
  setInterval(() => {
    current = (current + 1) % experiences.length;
    showFeatured(current);
  }, 8000);
}
