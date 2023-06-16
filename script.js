const inputbox = document.querySelector('.input-box');
const SearchBtn = document.getElementById('SearchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkweather(city) {
  const api_key = "ed58f9bf579c2fd09e381f4fe501494a";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  const weather_data = await fetch(url).then(response => response.json());

  if (weather_data.cod === `404`) {
    location_not_found.style.display = "flex";
    weather_body.style.display = "none";
    console.log("error");
    return;
  }

  location_not_found.style.display = "none";
  weather_body.style.display = "flex";
  temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
  description.innerHTML = `${weather_data.weather[0].description}`;

  humidity.innerHTML = `${weather_data.main.humidity}%`;
  wind_speed.innerHTML = `${weather_data.wind_speed} KM/H`;

  // Function to update the weather image based on the weather condition
  function updateWeatherImage(weather_img) {
    switch (weather_img) {
      case 'Cloudy':
        weather_img.src ='/assets/cloud.png';
        break;
      case 'Sunny':
        weather_img.src ='/assets/clear.png';
        break;
      case 'Rainy':
        weather_img.src ='/assets/rain.png';
        break;
      case 'Snow':
        weather_img.src ='/assets/snow.png';
        break;
      // Add more cases for other weather conditions as needed
      default:
        weather_img.src ='/assets/cloud.png'; // Default image if weather condition is not recognized
        break;
    }
  }

  // Example code to simulate weather update
  // Replace this with actual weather data retrieval code
  setTimeout(() => {
    const weather_img = 'Cloudy'; // Replace this with the actual weather condition

    // Update the weather image and description
    updateWeatherImage(weather_img);
    description.textContent = weather_img;
  }, 2000); // Delay for demonstration purposes, replace with your actual code

  console.log(weather_data);
}

SearchBtn.addEventListener('click', () => {
  checkweather(inputbox.value);
});
