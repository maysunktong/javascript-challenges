const input = document.getElementById("searchBar");
const searchButton = document.getElementById("searchButton");
const displayData = document.getElementById("display");
const currentLocation = document.getElementById("currentLocation");

const API_KEY = "7aa2d007635637a4c0f76114b3985a56";

displayData.innerHTML = `<p>Please enter a city name or use current location</p>`

async function getWeatherData(lat = null, lon = null) {
  const searchKeyword = input.value.trim();
  displayData.innerHTML = `<div class="spinner"></div>`;

  let url;

  if (searchKeyword) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      searchKeyword
    )}&units=metric&appid=${API_KEY}`;
  } else if (lat !== null && lon !== null) {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  } else {
    displayData.innerHTML = `<p>Please enter a city name or use current location</p>`;
    return;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    const description = data.weather[0].description;
    const city = data.name;
    const temp = data.main.temp;

    displayData.innerHTML = `${city} is ${description} today, with ${temp}°C temperature.`;
  } catch (error) {
    console.error(error);
    displayData.innerHTML = `Error: ${error.message}`;
  }
}

function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getWeatherData(latitude, longitude);
      },
      (error) => {
        console.error(
          "Location access denied or unavailable. Showing default city."
        );
        alert("Unable to get your location. Please enter a city name.");
      }
    );
  } else {
    console.warn("Geolocation not supported");
    alert("Geolocation is not supported by this browser.");
  }
}

input.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    getWeatherData();
  }
});

currentLocation.addEventListener("click", getCurrentLocation);
searchButton.addEventListener("click", getWeatherData);
