// Initialize elements
const inputname = document.querySelector("#name");
const button = document.querySelector("button");
const message = document.querySelector('#message');

// Add event listener on click to store name in input
button.addEventListener("click", storeName);

function storeName() {
	if (inputname.value) {
		sessionStorage.setItem("visitor", inputname.value) || "";
		inputname.value = "";
		button.textContent = "Name Stored. Thank you!";
	}
}

// Determine if there is a stored name and display message if true
if (sessionStorage.getItem("visitor") !== null) {
	message.innerHTML = `Welcome Back ${sessionStorage.getItem("visitor")}❗`;
}
