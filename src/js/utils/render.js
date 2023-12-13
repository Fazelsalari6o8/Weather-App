"use strict";

import { searchInput } from "../app.js";
import { getDate } from "./customeDate.js";

const renderCurrentWeather = (data, container) => {
  if (!data) return;
  searchInput.value = data.name;
  const weatherJsx = `
      <h1>${data.name}, ${data.sys.country}</h1>
      <div id="main-info">
          <img src="https://openweathermap.org/img/w/${
            data.weather[0].icon
          }.png" alt="weather icon" title="${data.weather[0].description}"/>
          <span>${data.weather[0].main}</span>
          <p>${Math.round(data.main.temp)} °C</p>
      </div>
      <div id="info">
          <p>Humidity:<span>${data.main.humidity} %</span></p>
          <p>Wind Speed:<span>${data.wind.speed} m/s</span></p>
      </div>`;

  container.innerHTML = weatherJsx;
};

const renderForecastWeather = (data, container) => {
  if (!data) return;
  container.innerHTML = "";
  data = data.list.filter((obj) => obj.dt_txt.endsWith("12:00:00"));
  data.forEach((item) => {
    const forecastJsx = `
          <div>
              <img src="https://openweathermap.org/img/w/${
                item.weather[0].icon
              }.png" alt="weather icon" title="${item.weather[0].description}"/>
              <h3>${getDate(item.dt)}<h3>
              <p>${Math.round(item.main.temp)} °C</p>
              <span>${item.weather[0].main}</span>
          </div>`;

    container.innerHTML += forecastJsx;
  });
};

export { renderCurrentWeather, renderForecastWeather };
