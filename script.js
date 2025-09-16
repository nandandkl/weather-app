

// Initialize Lucide icons
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons using the global lucide object
  if (typeof lucide !== "undefined") {
    lucide.createIcons(); // replaces <i data-lucide="...">
    console.log("✅ Lucide icons initialized");
  } else {
    console.error("❌ Lucide library not found!");
  }
  // Add interactive functionality
  initializeWeatherApp()
})

function initializeWeatherApp() {

  // Add hover effects for highlight items
  const highlightItems = document.querySelectorAll(".highlight-item")
  highlightItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px) scale(1.02)"
    })

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Update time every minute
  updateCurrentTime()
  setInterval(updateCurrentTime, 60000)

  // Simulate weather data updates
  setInterval(updateWeatherData, 300000) // Update every 5 minutes
}

function showDayDetails(dayName) {
  // Create a simple modal or alert with day details
  const dayData = {
    tue: { day: "Tuesday", temp: "25°", condition: "Sunny", details: "Perfect day for outdoor activities!" },
    wed: { day: "Wednesday", temp: "19°", condition: "Rainy", details: "Don't forget your umbrella!" },
    thu: { day: "Thursday", temp: "27°", condition: "Sunny", details: "Great weather continues!" },
    fri: { day: "Friday", temp: "21°", condition: "Stormy", details: "Thunderstorms expected in the evening." },
    sat: { day: "Saturday", temp: "16°", condition: "Snow", details: "Light snowfall throughout the day." },
    sun: { day: "Sunday", temp: "24°", condition: "Sunny", details: "Perfect weekend weather!" },
  }

  const data = dayData[dayName]
  if (data) {
    alert(`${data.day}: ${data.temp} - ${data.condition}\n${data.details}`)
  }
}

function showCityDetails(cityName) {
  const cityData = {
    London: { timezone: "GMT+0", population: "9M", airQuality: "Moderate" },
    Tokyo: { timezone: "GMT+9", population: "14M", airQuality: "Good" },
    Sydney: { timezone: "GMT+10", population: "5M", airQuality: "Good" },
    Paris: { timezone: "GMT+1", population: "2M", airQuality: "Moderate" },
  }

  const data = cityData[cityName]
  if (data) {
    alert(
      `${cityName} Details:\nTimezone: ${data.timezone}\nPopulation: ${data.population}\nAir Quality: ${data.airQuality}`,
    )
  }
}

function updateWeatherData() {
  // Simulate random weather updates
  const temperatures = ["20°", "21°", "22°", "23°", "24°", "25°"]
  const randomTemp = temperatures[Math.floor(Math.random() * temperatures.length)]

  const tempElement = document.querySelector(".temperature-main")
  if (tempElement) {
    tempElement.textContent = randomTemp
  }

  // Update feels like temperature
  const feelsLikeElement = document.querySelector(".feels-like")
  if (feelsLikeElement) {
    const feelsLikeTemp = Number.parseInt(randomTemp) + Math.floor(Math.random() * 5) - 2
    feelsLikeElement.textContent = `Feels like ${feelsLikeTemp}°`
  }

  console.log("Weather data updated")
}

// Add smooth scrolling for better UX
function smoothScroll(target) {
  document.querySelector(target).scrollIntoView({
    behavior: "smooth",
  })
}

// Add keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    // Enhance tab navigation visibility
    document.body.classList.add("keyboard-navigation")
  }
})

document.addEventListener("mousedown", () => {
  document.body.classList.remove("keyboard-navigation")
})

// Add CSS for keyboard navigation
const style = document.createElement("style")
style.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid #3b82f6 !important;
        outline-offset: 2px !important;
    }
`
document.head.appendChild(style)
