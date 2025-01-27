// Weather API URL and key
const apiUrl = 'https://api.weatherapi.com/v1';
const apiKey = '925b099f3db54fcdb2c15912252001';  // Replace this with your actual API key

// DOM Elements
const cityInput = document.getElementById('city');
const getWeatherBtn = document.getElementById('get-weather-btn');
const getForecastBtn = document.getElementById('get-forecast-btn');
const forecastSection = document.getElementById('forecast-section');
const forecastGrid = document.getElementById('forecast');
const weatherInfo = document.getElementById('weather-info');
const locationElem = document.getElementById('location');
const temperatureElem = document.getElementById('temperature');
const conditionElem = document.getElementById('condition');
const humidityElem = document.getElementById('humidity');
const windElem = document.getElementById('wind');
const feelsLikeElem = document.getElementById('feels-like');
const sunriseSunsetElem = document.getElementById('sunrise-sunset');
const errorElement = document.getElementById('error');

// Event Listeners
getWeatherBtn.addEventListener('click', function() {
    const city = cityInput.value.trim();
    if (city === "") {
        errorElement.textContent = "Please enter a city name to get the weather.";
        return;
    }

    errorElement.textContent = ""; // Clear any previous errors
    getWeather(city);  // Call to get current weather
});

getForecastBtn.addEventListener('click', function() {
    const city = cityInput.value.trim();
    if (city === "") {
        errorElement.textContent = "Please enter a city name to get the forecast.";
        return;
    }

    errorElement.textContent = ""; // Clear any previous errors
    get5DayForecast(city);  // Call to get 5-day forecast
});

// Fetch Current Weather
function getWeather(city) {
    const url = `${apiUrl}/current.json?key=${apiKey}&q=${city}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                errorElement.textContent = 'City not found. Please try again.';
                return;
            }

            locationElem.textContent = `${data.location.name}, ${data.location.country}`;
            temperatureElem.textContent = `${Math.round(data.current.temp_c)}°C`;
            conditionElem.textContent = data.current.condition.text;
            humidityElem.textContent = `Humidity: ${data.current.humidity}%`;
            windElem.textContent = `Wind: ${data.current.wind_kph} km/h`;
            feelsLikeElem.textContent = `Feels Like: ${Math.round(data.current.feelslike_c)}°C`;
            sunriseSunsetElem.textContent = `Sunrise: ${data.forecast.forecastday[0].astro.sunrise} | Sunset: ${data.forecast.forecastday[0].astro.sunset}`;

            // Display weather info section
            weatherInfo.classList.remove('hidden');
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
            errorElement.textContent = 'Could not fetch the weather data. Please try again later.';
        });
}

// Fetch 5-Day Forecast
function get5DayForecast(city) {
    const url = `${apiUrl}/forecast.json?key=${apiKey}&q=${city}&days=5`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                errorElement.textContent = 'City not found. Please try again.';
                return;
            }

            forecastGrid.innerHTML = ''; // Clear previous forecast

            data.forecast.forecastday.forEach(forecast => {
                const forecastItem = document.createElement('div');
                forecastItem.classList.add('forecast-item');
                const date = forecast.date;

                // Populate forecast item with data
                const iconUrl = `https:${forecast.day.condition.icon}`;
                forecastItem.innerHTML = `
                    <strong>${date}</strong>
                    <img src="${iconUrl}" alt="weather icon">
                    <p>${forecast.day.condition.text}</p>
                    <p>Temp: ${Math.round(forecast.day.avgtemp_c)}°C</p>
                `;

                forecastGrid.appendChild(forecastItem);
            });

            forecastSection.classList.remove('hidden'); // Show forecast section
            errorElement.textContent = ''; // Clear any error
        })
        .catch(error => {
            console.error('Error fetching forecast:', error);
            errorElement.textContent = 'Could not fetch the 5-day forecast. Please try again later.';
        });
}
