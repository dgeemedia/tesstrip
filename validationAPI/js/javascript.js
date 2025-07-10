document.querySelector("button").addEventListener("click", function (e) {
  const code = document.querySelector("#code");
  const message = document.querySelector("#message");

  if (code.checkValidity()) {
    message.textContent = "✔ 👍 ✅ A valid code was entered.";
    message.style.backgroundColor = "#e5ffe5";
  } else {
    message.textContent = "❌ The code is invalid. Please enter a valid one.";
    message.style.backgroundColor = "#ffe5e5";
  }
  message.style.visibility = "visible";
});


//Geolocation
/*
const button = document.querySelector("#location-button");
const location = document.querySelector(".location");
        
button.addEventListener("click", function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        // output
        location.innerHTML = `Latitude: ${latitude} 🧭 Longitude: ${longitude}`;
        location.innerHTML += `Region: ${getRegion(latitude, longitude)}`;
      },
      function (error) {
        location.textContent = `Error: ${error.message}`;
      }
    );  
    } else {
      location.textContent = "Geolocation is not supported by this browser.";
    }
});

function getRegion(lat, lon) {
  if (lon > 180) lon -= 360; //normalize to -180..180

  switch (true) {
    // North America (excl. Mexico/Central America)
    case lat >= 24 && lat <= 83 && lon >= -172 && lon <= -52:
      return "North America" ;
    // Mexico and Central America
    case lat >= 7 && lat < 24 && lon >= -118 && lon <= -77:
      return "Mexico and Central America";
    // South America
    case lat >= -56 && lat <= 13 && lon >= -82 && lon <= -34:
      return "South America";
    // Europe
    case lat>= 35 && lat <= 71 && lon >= -25 && lon <= 45:
      return "Europe";
    // Africa
    case lat >= -35 && lat <= 37 && lon >= -17 && lon <= 52:
      return "Africa";
    // Asia
    case lat >= 5 && lat <= 80 && lon >= 45 && lon <= 180:
      return "Asia";
    // Oceania
    case lat >= -50 && lat <= 0 && lon >= 110 && lon <= 180:
      return "Oceania";
    default:
      return "Not mapped";
  }
}
*/