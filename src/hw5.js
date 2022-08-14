// setting date and time
let now = new Date();

let dayToday = document.querySelector("#day");
dayToday.innerHTML = now.getDate();

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let monthToday = document.querySelector("#month");
monthToday.innerHTML = months[now.getMonth()];

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

timeToday.innerHTML = `Last updated ${hours}:${minutes}`;

function showCity(event) {
  event.preventDefault();
  let newCity = document.querySelector("#user-city-input");
  let currentCity = document.querySelector("#city-current");

  if (newCity.value) {
    currentCity.innerHTML = newCity.value;
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
    let wind = document.querySelector("#wind");
    wind.innerHTML = Math.round(response.data.wind.speed);
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = Math.round(response.data.main.humidity);

    let icon = document.querySelector("#icon-description");
    let iconId = response.data.weather[0].icon;
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${iconId}.png`);
    getForecastFromAPI(response.data.coord);

    //Celsius to Fahrenheit

    function changeToFahrenheit(event) {
      event.preventDefault();
      let degreesC = document.querySelector("#degrees");
      let degreesFahrenheit = Math.round((newTemp * 9) / 5 + 32);
      degreesC.innerHTML = degreesFahrenheit;
      celsiusUnit.classList.remove("active");
      fahrenheitUnit.classList.add("active");
    }

    let fahrenheitUnit = document.querySelector("#fahrenheit");
    fahrenheitUnit.addEventListener("click", changeToFahrenheit);

    function changeToCelsius(event) {
      event.preventDefault();
      let degreesF = document.querySelector("#degrees");
      degreesF.innerHTML = newTemp;
      fahrenheitUnit.classList.remove("active");
      celsiusUnit.classList.add("active");
    }

    let celsiusUnit = document.querySelector("#celsius");
    celsiusUnit.addEventListener("click", changeToCelsius);
  }

  let anotherCity = document.querySelector("#user-city-input");
  let apiKey = "d9cd27eb3f86fe62cc5c47529385e41c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${anotherCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getTemperature);
}

function formatDays(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function showForecast(response) {
  //day1
  let day1 = document.querySelector("#day-one");
  let nextDay1 = response.data.daily[1].dt;
  let nextDay1Formatted = formatDays(nextDay1);

  day1.innerHTML = nextDay1Formatted;
  let day1maxTemp = document.querySelector("#max-deg-d1");
  day1maxTemp.innerHTML = Math.round(response.data.daily[1].temp.max);
  let day1minTemp = document.querySelector("#min-deg-d1");
  day1minTemp.innerHTML = Math.round(response.data.daily[1].temp.min);
  let day1Descr = document.querySelector("#day-one-description");
  day1Descr.innerHTML = response.data.daily[1].weather[0].description;
  let day1icon = response.data.daily[1].weather[0].icon;
  let iconday1 = document.querySelector("#icon-forecast1");
  iconday1.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${day1icon}.png`
  );

  //day2
  let day2 = document.querySelector("#day-two");
  let nextDay2 = response.data.daily[2].dt;
  let nextDay2Formatted = formatDays(nextDay2);

  day2.innerHTML = nextDay2Formatted;
  let day2maxTemp = document.querySelector("#max-deg-d2");
  day2maxTemp.innerHTML = Math.round(response.data.daily[2].temp.max);
  let day2minTemp = document.querySelector("#min-deg-d2");
  day2minTemp.innerHTML = Math.round(response.data.daily[2].temp.min);
  let day2Descr = document.querySelector("#day-two-description");
  day2Descr.innerHTML = response.data.daily[2].weather[0].description;
  let day2icon = response.data.daily[2].weather[0].icon;
  let iconday2 = document.querySelector("#icon-forecast2");
  iconday2.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${day2icon}.png`
  );

  //day3
  let day3 = document.querySelector("#day-three");
  let nextDay3 = response.data.daily[3].dt;
  let nextDay3Formatted = formatDays(nextDay3);

  day3.innerHTML = nextDay3Formatted;
  let day3maxTemp = document.querySelector("#max-deg-d3");
  day3maxTemp.innerHTML = Math.round(response.data.daily[3].temp.max);
  let day3minTemp = document.querySelector("#min-deg-d3");
  day3minTemp.innerHTML = Math.round(response.data.daily[3].temp.min);
  let day3Descr = document.querySelector("#day-three-description");
  day3Descr.innerHTML = response.data.daily[3].weather[0].description;
  let day3icon = response.data.daily[3].weather[0].icon;
  let iconday3 = document.querySelector("#icon-forecast3");
  iconday3.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${day3icon}.png`
  );

  //day4
  let day4 = document.querySelector("#day-four");
  let nextDay4 = response.data.daily[4].dt;
  let nextDay4Formatted = formatDays(nextDay4);

  day4.innerHTML = nextDay4Formatted;
  let day4maxTemp = document.querySelector("#max-deg-d4");
  day4maxTemp.innerHTML = Math.round(response.data.daily[4].temp.max);
  let day4minTemp = document.querySelector("#min-deg-d4");
  day4minTemp.innerHTML = Math.round(response.data.daily[4].temp.min);
  let day4Descr = document.querySelector("#day-four-description");
  day4Descr.innerHTML = response.data.daily[4].weather[0].description;
  let day4icon = response.data.daily[4].weather[0].icon;
  let iconday4 = document.querySelector("#icon-forecast4");
  iconday4.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${day4icon}.png`
  );

  //day5
  let day5 = document.querySelector("#day-five");
  let nextDay5 = response.data.daily[5].dt;
  let nextDay5Formatted = formatDays(nextDay5);

  day5.innerHTML = nextDay5Formatted;
  let day5maxTemp = document.querySelector("#max-deg-d5");
  day5maxTemp.innerHTML = Math.round(response.data.daily[5].temp.max);
  let day5minTemp = document.querySelector("#min-deg-d5");
  day5minTemp.innerHTML = Math.round(response.data.daily[5].temp.min);
  let day5Descr = document.querySelector("#day-five-description");
  day5Descr.innerHTML = response.data.daily[5].weather[0].description;
  let day5icon = response.data.daily[5].weather[0].icon;
  let iconday5 = document.querySelector("#icon-forecast5");
  iconday5.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${day5icon}.png`
  );
}
function getForecastFromAPI(coordinates) {
  let lat = coordinates.lat;
  let long = coordinates.lon;
  let apiKey = "d9cd27eb3f86fe62cc5c47529385e41c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", showCity);
form.addEventListener("submit", showTemp);

function showCurrentWeather() {
  function showMyPosition(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    let apiKey = "d9cd27eb3f86fe62cc5c47529385e41c";
    let apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showForecast);

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

      //Celsius to Fahrenheit

      function changeToFahrenheit(event) {
        event.preventDefault();
        let degreesC = document.querySelector("#degrees");
        let degreesFahrenheit = Math.round((currentCityTemp * 9) / 5 + 32);
        degreesC.innerHTML = degreesFahrenheit;
        //if (celsiusUnit.classList === "active") {
        celsiusUnit.classList.remove("active");
        //}
        fahrenheitUnit.classList.add("active");
      }

      let fahrenheitUnit = document.querySelector("#fahrenheit");
      fahrenheitUnit.addEventListener("click", changeToFahrenheit);

      function changeToCelsius(event) {
        event.preventDefault();
        let degreesF = document.querySelector("#degrees");
        degreesF.innerHTML = currentCityTemp;
        fahrenheitUnit.classList.remove("active");
        celsiusUnit.classList.add("active");
      }

      let celsiusUnit = document.querySelector("#celsius");
      celsiusUnit.addEventListener("click", changeToCelsius);
    }

    axios.get(apiUrl2).then(showMyWeather);
  }
  navigator.geolocation.getCurrentPosition(showMyPosition);
}
let button = document.querySelector("button");

button.addEventListener("click", showCurrentWeather);

showCurrentWeather();
