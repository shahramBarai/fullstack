import { useEffect, useState } from "react";
import axios from "axios";

const api_key = import.meta.env.VITE_SOME_KEY;

const WeatherInfo = ({ countryInfo }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const lat = countryInfo.capitalInfo.latlng[0];
    const lon = countryInfo.capitalInfo.latlng[1];
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`
      )
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.log(error);
        setWeatherData(null);
      });
  }, []);

  return (
    <div>
      <h2>Weather in {countryInfo.capital[0]}</h2>
      {weatherData === null ? (
        <div>loading...</div>
      ) : (
        <div>
          <div>
            <strong>temperature:</strong> {weatherData.main.temp} Celsius
          </div>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={weatherData.weather[0].description}
            width="150"
          />
          <div>
            <strong>wind:</strong> {weatherData.wind.speed} m/s
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherInfo;
