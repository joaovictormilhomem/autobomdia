
async function getWeatherMessage() {
  try {
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=-10.251386&lon=-48.332363&appid=${process.env.WEATHER_API_KEY}&units=metric&lang=pt_br`;
    const response = await fetch(weatherApiUrl);
    const weather = await response.json();
    const description = weather.weather[0].description;
    const temperature = Math.round(weather.main.temp);
    const clouds = weather.clouds.all;
    const weatherMessage = `O clima hoje está: ${description.toLocaleUpperCase()}. E a temperatura é ${temperature}°, com cerca de ${clouds} nuvens no céu!`;
    return weatherMessage;
  } catch (error) {
    console.log(error)
    return ""
  }
}

export { getWeatherMessage };