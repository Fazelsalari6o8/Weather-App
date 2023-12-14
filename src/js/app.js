"use strict";

import getWeatherData from "./utils/httpReq.js";
import { renderCurrentWeather, renderForecastWeather } from "./utils/render.js";
import { showModal, removeModal } from "./utils/modal.js";
import { showTime } from "./utils/showClock.js";

const currentWeather = "current";
const forecastWeather = "forecast";

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const weatherContainer = document.getElementById("weather");
const locationBtn = document.getElementById("location");
const forecastContainer = document.getElementById("forecast");
const modalBtn = document.getElementById("modal-btn");
const loader = document.getElementById("loader");
const seconds = document.getElementById("seconds");

setInterval(() => seconds.classList.toggle("hidden-seconds"), 1000);
setInterval(showTime, 1000);

const showLoader = () => {
  weatherContainer.innerHTML = "";
  weatherContainer.appendChild(loader);
};

const searchHandler = async () => {
  const cityName = searchInput.value.trim();
  if (!cityName) {
    showModal("Please enter city name!");
    return;
  }

  showLoader();
  const currentData = await getWeatherData(currentWeather, cityName);
  renderCurrentWeather(currentData, weatherContainer);

  const forecastData = await getWeatherData(forecastWeather, cityName);
  renderForecastWeather(forecastData, forecastContainer);
};

const positionCallback = async (position) => {
  showLoader();
  const currentData = await getWeatherData(currentWeather, position.coords);
  renderCurrentWeather(currentData, weatherContainer);

  const forecastData = await getWeatherData(forecastWeather, position.coords);
  renderForecastWeather(forecastData, forecastContainer);
};
const errorCallback = (error) => {
  showModal(error.message);
  showLoader();
};

const locationHandler = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(positionCallback, errorCallback);
  } else {
    showModal("Your browser does not support geo location");
  }
};

const initHandler = async () => {
  const currentData = await getWeatherData(currentWeather, "بندرعباس");
  renderCurrentWeather(currentData, weatherContainer);

  const forecastData = await getWeatherData(forecastWeather, "بندرعباس");
  renderForecastWeather(forecastData, forecastContainer);
};

const enterHandler = (event) => {
  return event.key === "Enter" ? searchHandler() : null;
};

searchBtn.addEventListener("click", searchHandler);
locationBtn.addEventListener("click", locationHandler);
document.addEventListener("DOMContentLoaded", initHandler);
document.addEventListener("keydown", enterHandler);
modalBtn.addEventListener("click", () => {
  removeModal();
  initHandler();
});

export { showLoader, initHandler, searchInput };
