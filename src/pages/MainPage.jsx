import { useState } from "react";

import { getCurrentWeather } from "../shared/api/weather";
import { Link } from "react-router-dom";

const MainPage = () => {
  const [query, setQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(query);
  };

  const handleSearch = async (city) => {
    try {
      const weather = await getCurrentWeather(city);
      setWeatherData(weather);
    } catch (error) {
      console.error("Error searching weather data: ", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="City Name"
        />
        <button type="submit">Submit</button>
      </form>

      {weatherData && (
        <div>
          <div>
            <div>
              <h2>{weatherData.name}</h2>
            </div>
            <div>
              <span>{Math.round(weatherData.main.temp)}°C</span>
            </div>
            <p>Feels like: </p>
            <p>{Math.floor(weatherData.main.feels_like)}°C</p>
          </div>
          <div>
            <div>
              <p>Humidity</p>
              <p>{weatherData.main.humidity}%</p>
            </div>
            <div>
              <p>Wind Speed</p>
              <p>{Math.round(weatherData.wind.speed)} km/h</p>
            </div>
            <button>
              <Link to={`/weather/${weatherData.name}`}>Detail</Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
