import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getForecast } from "../shared/api/weather";

const DetailedWeather = () => {
  const [forecast, setForecast] = useState(null);
  const { city } = useParams();

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const forecastData = await getForecast(city);
        setForecast(forecastData);
      } catch (error) {
        console.error("Error fetching forecast data: ", error);
      }
    };
    fetchForecast();
  }, [city]);

  if (!forecast) return <div>Loading...</div>;

  const dailyForecast = forecast.list.filter((item, index) => index % 8 === 0);
  const hourlyForecast = forecast.list.slice(0, 16);

  return (
    <div>
      <h2>{city} - 5 Days forecast</h2>
      <div>
        {dailyForecast.map((day, index) => (
          <div key={index}>
            <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
            <p>{day.weather[0].description}</p>
            <p>High Temp: {Math.round(day.main.temp_max)}°C</p>
            <p>Low Temp: {Math.round(day.main.temp_min)}°C</p>
            <p>Precipitation: {Math.round(day.pop * 100)}%</p>
            <p>
              Wind Speed: {day.wind.speed} m/s, Direction: {day.wind.deg}°
            </p>
          </div>
        ))}
      </div>

      <h3>48 Hour forecast</h3>
      <div>
        {hourlyForecast.map((hour, index) => (
          <div key={index}>
            <p>{new Date(hour.dt * 1000).toLocaleTimeString()}</p>
            <p>{hour.weather[0].description}</p>
            <p>High Temp: {Math.round(hour.main.temp_max)}°C</p>
            <p>Low Temp: {Math.round(hour.main.temp_min)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailedWeather;
