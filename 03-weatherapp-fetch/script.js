const input = document.getElementById("searchBar");
const searchButton = document.getElementById("searchButton");
const data = document.getElementById("display");


fetch(`https://api.openweathermap.org/data/2.5/forecast?id=524901&q=Stockholm&appid=${}`)
