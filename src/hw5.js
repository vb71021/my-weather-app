//function changeToCelsius(event) {
//let degreesF = document.querySelector("#degrees");

//degreesF.innerHTML = 17;
//}
//let celsiusUnit = document.querySelector("#celsius");
//celsiusUnit.addEventListener("click", changeToCelsius);

//function changeToFahrenheit(event) {
//let degreesC = document.querySelector("#degrees");
//degreesC.innerHTML = 66;
//}
//let fahrenheitUnit = document.querySelector("#fahrenheit");
//fahrenheitUnit.addEventListener("click", changeToFahrenheit);

// setting date and time
let now = new Date();

let dayToday = document.querySelector("#day");
dayToday.innerHTML = now.getDate();

let monthToday = document.querySelector("#month");
monthToday.innerHTML = now.getMonth() + 1;

let yearToday = document.querySelector("#year");
yearToday.innerHTML = now.getFullYear();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let weekDay = document.querySelector("#week-day");
let weekDayName = days[now.getDay()];
weekDay.innerHTML = ` ${weekDayName}`;

let timeToday = document.querySelector("h3");
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let seconds = now.getSeconds();
if (seconds < 10) {
  seconds = `0${seconds}`;
}
timeToday.innerHTML = `Last updated ${hours}:${minutes}:${seconds}`;

function showCity(event) {
  event.preventDefault();
  let newCity = document.querySelector("#user-city-input");
  let currentCity = document.querySelector("#city-current");

  if (newCity.value) {
    currentCity.innerHTML = newCity.value;
    //} else {
    // alert("Type city,please");
  }
}
function showTemp() {
  function getTemperature(response) {
    let newTemp = Math.round(response.data.main.temp);
    let newDegrees = document.querySelector("#degrees");
    newDegrees.innerHTML = newTemp;
    let newDescr = response.data.weather[0].description;
    let descriptionFromAPI = document.querySelector(".description");
    descriptionFromAPI.innerHTML = newDescr;
    let icon = document.querySelector("#icon-description");
    let iconId = response.data.weather[0].icon;
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${iconId}.png`);
  }

  let anotherCity = document.querySelector("#user-city-input");
  let apiKey = "d9cd27eb3f86fe62cc5c47529385e41c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${anotherCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getTemperature);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", showCity);
form.addEventListener("submit", showTemp);

function showCurrentWeather() {
  function showMyPosition(position) {
    console.log(position);
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    let apiKey = "d9cd27eb3f86fe62cc5c47529385e41c";
    let apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

    function showMyWeather(response) {
      let currentCityName = response.data.name;
      let name = document.querySelector("#city-current");
      name.innerHTML = currentCityName;
      let currentCityTemp = Math.round(response.data.main.temp);
      let temperature = document.querySelector("#degrees");
      temperature.innerHTML = currentCityTemp;
      let newDescr = response.data.weather[0].description;
      let descriptionFromAPI = document.querySelector(".description");
      descriptionFromAPI.innerHTML = newDescr;
      let wind = document.querySelector("#wind");
      wind.innerHTML = Math.round(response.data.wind.speed);
      let humidity = document.querySelector("#humidity");
      humidity.innerHTML = Math.round(response.data.main.humidity);
      let iconMain = document.querySelector("#icon-description");
      iconId = response.data.weather[0].icon;
      iconMain.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${iconId}.png`
      );
      console.log(response);
    }
    axios.get(apiUrl2).then(showMyWeather);
  }
  navigator.geolocation.getCurrentPosition(showMyPosition);
}
let button = document.querySelector("button");

button.addEventListener("click", showCurrentWeather);

showCurrentWeather();
