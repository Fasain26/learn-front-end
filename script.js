// ============================================
// SELECTORS
// ============================================

const cityInput  = document.querySelector("#city-input");
const searchBtn  = document.querySelector("#search-btn");
const content    = document.querySelector("#content");
const cityBtns   = document.querySelectorAll(".city-btn");


// ============================================
// WEATHER CODE → EMOJI + DESCRIPTION
// Open-Meteo returns a numeric weather code
// This maps those codes to something human-readable
// ============================================

const getWeatherInfo = (code) => {
  const map = {
    0:  { icon: "☀️",  description: "Clear sky"         },
    1:  { icon: "🌤️", description: "Mainly clear"       },
    2:  { icon: "⛅",  description: "Partly cloudy"      },
    3:  { icon: "☁️",  description: "Overcast"           },
    45: { icon: "🌫️", description: "Foggy"              },
    48: { icon: "🌫️", description: "Icy fog"            },
    51: { icon: "🌦️", description: "Light drizzle"      },
    53: { icon: "🌦️", description: "Drizzle"            },
    55: { icon: "🌧️", description: "Heavy drizzle"      },
    61: { icon: "🌧️", description: "Slight rain"        },
    63: { icon: "🌧️", description: "Rain"               },
    65: { icon: "🌧️", description: "Heavy rain"         },
    71: { icon: "🌨️", description: "Slight snow"        },
    73: { icon: "🌨️", description: "Snow"               },
    75: { icon: "❄️",  description: "Heavy snow"         },
    80: { icon: "🌦️", description: "Rain showers"       },
    81: { icon: "🌧️", description: "Heavy showers"      },
    95: { icon: "⛈️",  description: "Thunderstorm"       },
  };

  return map[code] || { icon: "🌡️", description: "Unknown" };
};


// ============================================
// GET COORDINATES FROM CITY NAME
// We use the Open-Meteo Geocoding API —
// converts a city name into lat/lon coordinates
// ============================================

const getCoordinates = async (cityName) => {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Geocoding failed: ${response.status}`);
  }

  const data = await response.json();

  // If no results found for this city name
  if (!data.results || data.results.length === 0) {
    throw new Error(`City "${cityName}" not found. Try a different name.`);
  }

  // Return the first result
  const { latitude, longitude, name, country } = data.results[0];
  return { latitude, longitude, name, country };
};


// ============================================
// GET WEATHER DATA
// Uses Open-Meteo weather API with lat/lon
// Fetches current weather + 7-day forecast
// ============================================

const getWeatherData = async (latitude, longitude) => {
  const url = [
    `https://api.open-meteo.com/v1/forecast`,
    `?latitude=${latitude}`,
    `&longitude=${longitude}`,
    `&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code`,
    `&daily=weather_code,temperature_2m_max,temperature_2m_min`,
    `&timezone=auto`,
    `&forecast_days=7`
  ].join("");

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Weather API failed: ${response.status}`);
  }

  return await response.json();
};


// ============================================
// RENDER STATES
// ============================================

const renderLoading = () => {
  content.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
      <p>Fetching weather data...</p>
    </div>
  `;
};

const renderError = (message, cityName) => {
  content.innerHTML = `
    <div class="error-card">
      <span class="error-icon">⚠️</span>
      <h3>Could not load weather</h3>
      <p>${message}</p>
      <button id="retry-btn">Try again</button>
    </div>
  `;

  // Add retry button listener after rendering
  document.querySelector("#retry-btn")
    ?.addEventListener("click", () => fetchWeather(cityName));
};

const renderWeather = (weatherData, locationInfo) => {
  const { current, daily } = weatherData;

  // Current conditions
  const currentWeather = getWeatherInfo(current.weather_code);
  const temp           = Math.round(current.temperature_2m);
  const feelsLike      = Math.round(current.apparent_temperature);
  const humidity       = current.relative_humidity_2m;
  const windSpeed      = Math.round(current.wind_speed_10m);

  // 7-day forecast
  const forecastHTML = daily.time.map((dateStr, i) => {
    const date    = new Date(dateStr);
    const dayName = i === 0
      ? "Today"
      : date.toLocaleDateString("en", { weekday: "short" });
    const info    = getWeatherInfo(daily.weather_code[i]);
    const max     = Math.round(daily.temperature_2m_max[i]);
    const min     = Math.round(daily.temperature_2m_min[i]);

    return `
      <div class="forecast-day">
        <span class="day-name">${dayName}</span>
        <span class="day-icon">${info.icon}</span>
        <span class="day-max">${max}°</span>
        <span class="day-min">${min}°</span>
      </div>
    `;
  }).join("");

  // Current time for "last updated"
  const now = new Date().toLocaleTimeString("en", {
    hour: "2-digit",
    minute: "2-digit"
  });

  content.innerHTML = `
    <div class="weather-card">

      <div class="weather-hero">
        <div class="location">
          <h2>${locationInfo.name}</h2>
          <p>${locationInfo.country}</p>
          <div class="condition-icon">${currentWeather.icon}</div>
        </div>
        <div class="temp-block">
          <div class="temperature">${temp}°C</div>
          <div class="feels-like">Feels like ${feelsLike}°C</div>
          <div class="feels-like" style="margin-top:8px">${currentWeather.description}</div>
        </div>
      </div>

      <div class="weather-stats">
        <div class="stat">
          <span class="stat-label">Humidity</span>
          <span class="stat-value">${humidity}<span class="stat-unit">%</span></span>
        </div>
        <div class="stat">
          <span class="stat-label">Wind Speed</span>
          <span class="stat-value">${windSpeed}<span class="stat-unit"> km/h</span></span>
        </div>
        <div class="stat">
          <span class="stat-label">Today High</span>
          <span class="stat-value">${Math.round(daily.temperature_2m_max[0])}<span class="stat-unit">°C</span></span>
        </div>
        <div class="stat">
          <span class="stat-label">Today Low</span>
          <span class="stat-value">${Math.round(daily.temperature_2m_min[0])}<span class="stat-unit">°C</span></span>
        </div>
      </div>

      <div class="forecast">
        <h3>7-Day Forecast</h3>
        <div class="forecast-days">
          ${forecastHTML}
        </div>
      </div>

      <div class="last-updated">
        Last updated at ${now}
      </div>

    </div>
  `;
};


// ============================================
// MAIN FETCH FUNCTION
// Orchestrates the full flow:
// loading → geocode → fetch weather → render
// ============================================

const fetchWeather = async (cityName) => {
  // Trim whitespace — don't fetch empty strings
  const city = cityName.trim();
  if (!city) return;

  // Step 1: show loading state immediately
  renderLoading();

  try {
    // Step 2: get coordinates from city name
    // These are two separate API calls — geocoding first, then weather
    const locationInfo = await getCoordinates(city);

    // Step 3: get weather data using those coordinates
    // Promise.all would work here too since we have both coords already
    const weatherData = await getWeatherData(
      locationInfo.latitude,
      locationInfo.longitude
    );

    // Step 4: render the weather card
    renderWeather(weatherData, locationInfo);

  } catch (error) {
    // Any error from either API call lands here
    renderError(error.message, city);
  }
};


// ============================================
// EVENT LISTENERS
// ============================================

// Search button click
searchBtn.addEventListener("click", () => {
  fetchWeather(cityInput.value);
});

// Press Enter in the input
cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") fetchWeather(cityInput.value);
});

// Quick city buttons — event delegation on their container
document.querySelector(".quick-cities").addEventListener("click", (event) => {
  if (event.target.classList.contains("city-btn")) {
    const city = event.target.dataset.city;
    cityInput.value = city;
    fetchWeather(city);
  }
});


// ============================================
// INITIAL LOAD
// Show Jakarta weather when the page first opens
// ============================================

fetchWeather("Jakarta");