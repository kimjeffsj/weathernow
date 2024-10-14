import { useEffect, useState } from "react";
import { getCurrentWeather, citySuggestions } from "../shared/api/weather";
import { Link } from "react-router-dom";

const MainPage = () => {
  const [query, setQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [animationKey, setAnimationKey] = useState(0);
  const [suggestions, setSuggestions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(query);
  };

  const handleSearch = async (city) => {
    try {
      const weather = await getCurrentWeather(city);
      setWeatherData(weather);
      setAnimationKey((prev) => prev + 1);
      setSuggestions([]);
    } catch (error) {
      console.error("Error searching weather data: ", error);
    }
    setQuery("");
  };

  const handleSuggestions = (suggestion) => {
    handleSearch(suggestion.name);
    setSuggestions([]);
  };

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

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query) {
        try {
          const data = await citySuggestions(query);
          setSuggestions(data || []);
        } catch (error) {
          console.error("Error fetching city suggestions: ", error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    };
    const timer = setTimeout(fetchSuggestions, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    // Background
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/weatherIcon/background.jpg')",
      }}
    >
      {/* Main Container */}
      <div
        className={`${
          weatherData ? "h-[585px]" : "h-[105px] "
        } relative w-[400px] bg-white bg-opacity-10 backdrop-blur-md border-2 border-white border-opacity-20 rounded-2xl p-5 text-white font-medium transition-all`}
      >
        {/* Search Container */}
        <div className="relative w-full max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              placeholder="ENTER YOUR LOCATION"
              className="w-full h-14 bg-gray-800 bg-opacity-80  text-lg placeholder-gray-400 pl-12 pr-12 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500  uppercase"
            />
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <i className="fas fa-location-dot  text-xl"></i>
            </div>
            <button
              type="submit"
              className="absolute inset-y-0 right-3 flex items-center  hover:text-opacity-70"
            >
              <i className="fas fa-magnifying-glass text-xl"></i>
            </button>
          </form>

          {/* City Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-gray-800 bg-opacity-80 rounded-lg mt-1 max-h-60 overflow-auto">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={(e) => handleSuggestions(suggestion, e)}
                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                >
                  {suggestion.name}
                  {suggestion.state && `, ${suggestion.state}`},{" "}
                  {suggestion.country}
                </li>
              ))}
            </ul>
          )}
        </div>

        {weatherData && (
          // Weather Container
          <div key={animationKey} className="weather-info">
            {/* Searched City Name */}
            <div className="city-name text-center uppercase my-4 text-3xl font-semibold ">
              <p>{weatherData.name}</p>
            </div>

            {/* Weather Main Container */}
            <div className="text-center weather-icon">
              <img
                src={getWeatherIcon(weatherData.weather[0].main)}
                alt="Weather Icon"
                className="w-3/5 mx-auto"
              />
              <p className="text-6xl font-bold mt-5 mb-1.5 -ml-7.5 temperature">
                {Math.round(weatherData.main.temp)}
                <span className="absolute text-2xl ml-1">°C</span>
              </p>
              <p className="text-2xl capitalize description">
                {weatherData.weather[0].description}
              </p>
            </div>

            {/* Little Detail Container */}
            <div className="absolute bottom-20 left-0 w-full px-5 flex weather-details">
              <div className="flex items-center w-1/2 pl-5">
                <i className="fas fa-water text-5xl mr-2.5"></i>
                <div>
                  <span className="text-2xl">{weatherData.main.humidity}%</span>
                  <p className="text-sm">Humidity</p>
                </div>
              </div>
              <div className="flex items-center w-1/2 pr-5 justify-end">
                <i className="fas fa-wind text-5xl mr-2.5"></i>
                <div>
                  <span className="text-2xl">
                    {Math.round(weatherData.wind.speed)} km/h
                  </span>
                  <p className="text-sm">Wind Speed</p>
                </div>
              </div>
            </div>

            {/* Link to Detail Page */}
            <div className="absolute bottom-5 left-5 right-5 view-details-link">
              <Link
                to={`/weather/${weatherData.name}`}
                className="block w-full py-2.5 bg-white bg-opacity-20  text-center no-underline hover:bg-opacity-30 rounded-2xl"
              >
                View Details
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
