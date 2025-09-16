const OPENWEATHER_KEY = "YOUR_API_KEY_HERE";

// Get current weather
function fetchCurrentWeather(lat, lon) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_KEY}`)
        .then(res => res.json());
}

// Get forecast
function fetchForecast(lat, lon) {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_KEY}`)
        .then(res => res.json());
}

// Update highlights
function updateHighlights(current) {
    document.querySelector(".highlight-item.humidity .highlight-value").textContent = `${current.main.humidity}`;
    document.querySelector(".highlight-item.pressure .highlight-value").textContent = current.main.pressure;
    document.querySelector(".highlight-item.wind .highlight-value").textContent = `${current.wind.speed} `;
    document.querySelector(".highlight-item.visibility .highlight-value").textContent = `${(current.visibility/1000).toFixed(1)} `;
    document.querySelector(".highlight-item.clouds .highlight-value").textContent = `${current.clouds.all}`;
    document.querySelector(".highlight-item.rain .highlight-value").textContent = `${current.rain ? current.rain["1h"] : 0}`;

}

// Update current weather
function updateCurrentWeather(current) {
    document.getElementById("city").textContent = `${current.name}, ${current.sys.country}`;
    document.querySelector(".temperature-main").textContent = `${Math.round(current.main.temp)}°`;
    document.querySelector(".feels-like").textContent = `Feels like ${Math.round(current.main.feels_like)}°`;
    document.querySelector(".weather-condition").textContent = current.weather[0].description;

    const timestamp = current.dt; 
    const date = new Date(timestamp * 1000);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    document.querySelector(".date-text").textContent = formattedDate;

    const dayOptions = { weekday: 'long' };
    const dayName = date.toLocaleDateString('en-US', dayOptions);
    document.querySelector(".day-title").textContent = dayName;



    function formatTime(unix) {
        const d = new Date(unix * 1000);
        let hours = d.getHours();
        let minutes = d.getMinutes().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        return `${hours}:${minutes} ${ampm}`;
    }

    const sunriseTime = formatTime(current.sys.sunrise);
    const sunsetTime = formatTime(current.sys.sunset);

    document.querySelector(".sunrise-card .sun-time-value").textContent = sunriseTime;
    document.querySelector(".sunset-card .sun-time-value").textContent = sunsetTime;



    // Get main weather condition
    const weatherCondition = current.weather[0].main;

    // Map weather condition to a Lucide icon
    function getMainWeatherIcon(condition) {
        switch (condition.toLowerCase()) {
            case "clear": return "sun";
            case "clouds": return "cloud";
            case "rain": return "cloud-rain";
            case "snow": return "cloud-snow";
            case "thunderstorm": return "zap";
            default: return "cloud";
        }
    }

    // Select icon element and update it
    const mainIconEl = document.querySelector(".weather-icon-main");
    mainIconEl.setAttribute("data-lucide", getMainWeatherIcon(weatherCondition));

    // Re-render Lucide icons
    lucide.createIcons();



}




// Update forecast

function updateForecast(forecastData) {
    const forecastGrid = document.querySelector(".forecast-grid");
    forecastGrid.innerHTML = ""; // clear old cards

    const days = {};
    forecastData.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dayKey = date.toISOString().split("T")[0]; // YYYY-MM-DD

        if (!days[dayKey]) {
            days[dayKey] = {
                tempMin: item.main.temp_min,
                tempMax: item.main.temp_max,
                icon: item.weather[0].main,
                dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
                dayNum: date.getDate()
            };
        } else {
            days[dayKey].tempMin = Math.min(days[dayKey].tempMin, item.main.temp_min);
            days[dayKey].tempMax = Math.max(days[dayKey].tempMax, item.main.temp_max);
        }
    });

    // Get first 6 unique days including today
    const dayKeys = Object.keys(days).slice(0, 6);

    // Render forecast cards
    dayKeys.forEach(key => {
        const d = days[key];
        const iconName = getWeatherIcon(d.icon);
        const colorClass = getWeatherColor(d.icon);

        const card = document.createElement("div");
        card.classList.add("forecast-day");

        card.innerHTML = `
            <p class="forecast-day-name">${d.dayName}</p>
            <p class="forecast-date">${d.dayNum}</p>
            <i data-lucide="${iconName}" class="forecast-icon ${colorClass}"></i>
            <p class="forecast-temp">${Math.round((d.tempMin + d.tempMax) / 2)}°</p>
            <div class="forecast-range">
                <span>${Math.round(d.tempMax)}°</span>
                <span>/</span>
                <span>${Math.round(d.tempMin)}°</span>
            </div>
        `;
        forecastGrid.appendChild(card);
    });

    // Re-init Lucide icons
    lucide.createIcons();
}

// Map weather → Lucide icon
function getWeatherIcon(condition) {
    switch (condition.toLowerCase()) {
        case "clear": return "sun";
        case "clouds": return "cloud";
        case "rain": return "cloud-rain";
        case "snow": return "cloud-snow";
        case "thunderstorm": return "zap";
        default: return "cloud";
    }
}

// Map weather → color class
function getWeatherColor(condition) {
    switch (condition.toLowerCase()) {
        case "clear": return "sunny";
        case "clouds": return "cloudy";
        case "rain": return "rainy";
        case "snow": return "snowy";
        case "thunderstorm": return "stormy";
        default: return "cloudy";
    }
}


//Search functionality

function handleSearch(event) {
    if (event.key === "Enter") {
        const city = event.target.value.trim();
        if (city) {
            fetchWeatherByCity(city);
        }
    }
}


function fetchWeatherByCity(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPENWEATHER_KEY}`)
        .then(res => {
            if (!res.ok) throw new Error("City not found");
            return res.json();
        })
        .then(currentData => {
            // Fetch forecast by coordinates from the current weather data
            const { lat, lon } = currentData.coord;
            return Promise.all([currentData, fetchForecast(lat, lon)]);
        })
        .then(([currentData, forecastData]) => {
            updateCurrentWeather(currentData);
            updateHighlights(currentData);
            updateForecast(forecastData);
        })
        .catch(err => {
            console.error("Error fetching city data:", err);
            alert("City not found. Please try again!");
        });
}


function triggerSearch() {
    const input = document.querySelector(".search-bar");
    const city = input.value.trim();
    if (city) {
        fetchWeatherByCity(city);
    }
}



// Update other cities weather

const otherCities = ["London", "Tokyo", "Sydney", "Paris"];

function updateOtherCitiesWeather() {
    otherCities.forEach(city => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPENWEATHER_KEY}`)
            .then(res => res.json())
            .then(data => {
                const card = document.querySelector(`.city-item.${city.toLowerCase()}`);
                
                // Update temperature
                card.querySelector(".city-temp").textContent = `${Math.round(data.main.temp)}°`;
                // Update condition
                card.querySelector(".city-condition").textContent = data.weather[0].main;
                // Update humidity
                card.querySelector(".humidity-value").textContent = `${data.main.humidity}%`;
                // Update icon
                const iconEl = card.querySelector(".city-weather-icon");
                iconEl.setAttribute("data-lucide", getWeatherIcon(data.weather[0].main));
                iconEl.className = `city-weather-icon ${getWeatherColor(data.weather[0].main)}`;
            })
            .catch(err => console.error(`Error fetching ${city} data:`, err));
    });

    // Re-render Lucide icons after all updates
    lucide.createIcons();
}

// Call this after page load
updateOtherCitiesWeather();


document.querySelectorAll(".city-item").forEach(card => {
    card.addEventListener("click", () => {
        const cityName = card.querySelector(".city-name").textContent;
        fetchWeatherForMain(cityName);
    });
});


function fetchWeatherForMain(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPENWEATHER_KEY}`)
        .then(res => res.json())
        .then(currentData => {
            const { lat, lon } = currentData.coord;
            return Promise.all([currentData, fetchForecast(lat, lon)]);
        })
        .then(([currentData, forecastData]) => {
            // Update main dashboard
            updateCurrentWeather(currentData);
            updateHighlights(currentData);
            updateForecast(forecastData);
        })
        .catch(err => {
            console.error("Error fetching main city data:", err);
            alert("Could not fetch data for " + city);
        });
}




// Detect location and fetch data
function detectLocation() {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(pos => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;

            Promise.all([fetchCurrentWeather(lat, lon), fetchForecast(lat, lon)])
                .then(([currentData, forecastData]) => {
                    updateCurrentWeather(currentData);
                    updateHighlights(currentData);
                    updateForecast(forecastData);
                    console.log("Forecast data:", forecastData); // debug for now
                })
                .catch(err => {
                    console.error("Error fetching data:", err);
                    document.getElementById("city").textContent = "Error fetching data";
                });
        }, err => {
            console.error("Geolocation error:", err);
            document.getElementById("city").textContent = "Location access denied";
        });
    } else {
        document.getElementById("city").textContent = "Geolocation not supported";
    }
}

window.onload = detectLocation;



