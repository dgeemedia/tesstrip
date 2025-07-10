
const hambutton = document.querySelector('.🍔');
const mainnav = document.querySelector('.navigation');

hambutton.addEventListener('click', () => {mainnav.classList.toggle('responsive')}, false);

// To solve the mid resizing issue with responsive class [window.onresize]
window.addEventListener('resize', () => {
	if (window.innerWidth > 760) { // window.innerWidth includes the scrollbar (if any), document.documentElement.clientWidth does not
		mainnav.classList.remove('responsive');
	}
    displayViewportSize(); // Update viewport info on resize
});

// ✅ NEW: Display viewport size in <aside>
function displayViewportSize() {
	const aside = document.querySelector("aside");
	aside.textContent = `Viewport: ${window.innerWidth}px × ${window.innerHeight}px`;
}

// Run once on load
displayViewportSize();