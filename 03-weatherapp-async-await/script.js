const input = document.getElementById("searchBar");
const searchButton = document.getElementById("searchButton");
const displayData = document.getElementById("display");
const currentLocation = document.getElementById("currentLocation");

const API_KEY = "7aa2d007635637a4c0f76114b3985a56";

displayData.innerHTML = `<p>Please enter a city name or use current location</p>`;

async function getWeatherData(lat = null, lon = null) {
  const city = input.value.trim();
  displayData.innerHTML = `<div class="spinner"></div>`;

  let url;

  if (city) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
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

    const iconCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

    displayData.innerHTML = `${city} is ${description} today, with ${temp}°C temperature.
    <img src="${iconUrl}" alt="${description}" class="bounce" />`;

    input.value = ""; /* clear input after a fetch */

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
          "Location access denied or unavailable. Showing default city.",
          error
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

const cities = Array.from(document.querySelectorAll(".city-btn"));
cities.forEach((button) =>
  button.addEventListener("click", (e) => {
    const city = e.target.textContent.toLowerCase();
    input.value = city;
    getWeatherData();
  })
);

currentLocation.addEventListener("click", getCurrentLocation);
searchButton.addEventListener("click", getWeatherData);

/* Cities buttons */

/* popularCities.addEventListener("click", (e) => {
  if (e.target.classList.contains("city-btn")) {
    const city = e.target.textContent;
    input.value = city; 
    getWeatherData(); 
  }
});
 */
