import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getForecast } from "../shared/api/weather";

const DetailedWeather = () => {
  const [forecast, setForecast] = useState(null);
  const { city } = useParams();
  const navigate = useNavigate();

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
  const hourlyForecast = forecast.list.slice(0, 24);

  const getWeatherIcon = (main) => {
    switch (main) {
      case "Clear":
        return "/weatherIcon/clear.png";
      case "Rain":
        return "/weatherIcon/rain.png";
      case "Snow":
        return "/weatherIcon/snow.png";
      case "Clouds":
        return "/weatherIcon/cloud.png";
      case "Mist":
      case "Haze":
        return "/weatherIcon/mist.png";
      default:
        return "/weatherIcon/cloud.png";
    }
  };

  return (
    // Background
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/weatherIcon/background.jpg')" }}
    >
      {/* Main Container */}
      <div className="my-5 w-[90%] md:w-[50%] bg-white bg-opacity-10 backdrop-blur-md border-2 border-white border-opacity-20 rounded-2xl p-5 text-white">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="back-btn w-[20%] py-1.5 bg-white bg-opacity-20 text-center no-underline hover:bg-opacity-30 rounded-2xl"
        >
          <i className="fas fa-arrow-left mr-2"></i>Back
        </button>

        {/* City Name */}
        <h2 className="text-5xl font-bold my-6 uppercase city-name">{city}</h2>

        {/* Hourly Forecast */}
        <div className="mb-10 hourlyForecast">
          <h3 className="text-lg font-semibold mb-4">24 Hour Forecast</h3>
          <div className="weather-details flex overflow-x-auto py-4 bg-gray-800 bg-opacity-50 rounded-lg">
            {hourlyForecast.map((hour, index) => (
              <div key={index} className="flex-shrink-0 w-20 text-center mx-2">
                <p className="mb-2">{new Date(hour.dt * 1000).getHours()}:00</p>
                <img
                  src={getWeatherIcon(hour.weather[0].main)}
                  alt="Weather Icon"
                  className="w-8 h-6 mx-auto mb-2"
                />
                <p className="font-bold">{Math.round(hour.main.temp)}°C</p>
              </div>
            ))}
          </div>
        </div>

        {/* 5 Day Forecast */}
        <div className="dailyForecast">
          <h3 className="text-lg font-semibold mb-4">5 Day Forecast</h3>
          <div className="space-y-4 weather-details">
            {dailyForecast.map((day, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-800 bg-opacity-50 rounded-lg p-4"
              >
                <div className="w-1/4">
                  <p className="font-semibold">
                    {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </p>
                  <p className="text-sm">
                    {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="w-1/4 text-center">
                  <img
                    src={getWeatherIcon(day.weather[0].main)}
                    alt="Weather Icon"
                    className="w-8 h-6 mx-auto"
                  />
                  <p className="text-sm capitalize">
                    {day.weather[0].description}
                  </p>
                </div>
                <div className="w-1/4 text-center">
                  <p className="font-bold">{Math.round(day.main.temp_max)}°C</p>
                  <p className="text-sm">High</p>
                </div>
                <div className="w-1/4 text-center">
                  <p>{Math.round(day.main.temp_min)}°C</p>
                  <p className="text-sm">Low</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedWeather;
