# Weather App 🌤️

A modern, responsive weather dashboard that provides real-time weather updates, 6-day forecasts, and highlights for various cities. The app uses the OpenWeatherMap API and features interactive UI elements powered by JavaScript and Lucide icons.

---

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation & Usage](#installation--usage)
- [Functionality](#functionality)
- [Contributing](#contributing)
- [Feedback](#feedback)

---

## Features

- Displays current weather including:
  - Temperature
  - "Feels like" temperature
  - Weather condition
  - Sunrise & sunset times
- 6-day weather forecast
- Highlights for:
  - Clouds, Rain, Wind, Humidity, Visibility, Pressure
- Search for any city and update main dashboard
- Quick weather overview for other major cities
- Interactive cards with hover effects and keyboard navigation
- Responsive design for mobile, tablet, and desktop
- Dynamic icon updates using Lucide icons
- Automatic location detection

---

## Demo



---

## Technologies Used

- **HTML5** – Semantic markup
- **CSS3** – Responsive and modern styling with gradients, hover effects, and flex/grid layouts
- **JavaScript (ES6)** – Dynamic updates, API calls, interactive UI
- **OpenWeatherMap API** – Fetch current weather and forecast data
- **Lucide Icons** – Clean and consistent iconography

---

## Project Structure

Weather-App/
│
├─ index.html # Main HTML page
├─ styles.css # Styling for dashboard, cards, highlights, and responsiveness
├─ script.js # Handles UI interactions, animations, and icon initialization
├─ main.js # Handles fetching data from OpenWeatherMap and updating the DOM
├─ favicon.png # App icon

---

## Installation & Usage

1. **Clone the repository**  
```
git clone https://github.com/yourusername/weather-app.git
cd weather-app
```

2. Open index.html in your browser.

3. API Key Configuration
   - Replace the OPENWEATHER_KEY in main.js with your own OpenWeatherMap API key:
```
const OPENWEATHER_KEY = "YOUR_API_KEY_HERE";
```
4. Optional: Host locally
   - You can use VSCode Live Server or any local HTTP server for a better experience.

---

## Functionality
### Main Dashboard

- Shows current city, temperature, weather condition, sunrise, and sunset.

- Temperature and weather icon updates dynamically based on API data.

### Highlights

- Clouds, Rain, Wind, Humidity, Visibility, and Pressure values.

- Hover effect with subtle animations for user interaction.

### 6-Day Forecast

- Displays daily forecast with weather icon, temperature range, and day name.

- Dynamic icon updates based on weather condition.

### Search Bar

- Search for any city to update the main dashboard.

- Press Enter or click the search icon to fetch weather data.

### Other Cities

- Quick view of London, Tokyo, Sydney, and Paris.

- Click on a city card to update main dashboard with that city’s weather.

### Location Detection

- Automatically detects user location and fetches weather & forecast data.
  
- Displays errors if location is denied or unavailable.

---

## 🤝 Contributing
Contributions are welcome! To contribute:

- Fork the repository.
- Create a feature branch.
- Commit your changes and push to your fork.
- Submit a pull request.

---

## 💬 Feedback
- Found a bug? Have a feature request?
- Open an issue
- Or reach out via GitHub

