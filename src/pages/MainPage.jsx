import { useEffect, useState } from "react";
import { getCurrentWeather, citySuggestions } from "@/shared/api/weather";
import { Link, useOutletContext } from "react-router-dom";

import WeatherIcon from "@/shared/ui/WeatherIcon";
import Loading from "@/shared/ui/Loading";
import AnimatedNumber from "@/shared/ui/AnimatedNumber";

const MainPage = () => {
  const [query, setQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [contentHeight, setContentHeight] = useState("h-[105px]");
  const [displayTemp, setDisplayTemp] = useState(null);

  const { isCelsius } = useOutletContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      handleSearch(suggestions[0]);
    }
  };

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const weather = await getCurrentWeather(city.lat, city.lon);
      setWeatherData({
        ...weather,
        fullName: `${city.name}${city.state ? `, ${city.state}` : ""}, ${
          city.country
        }`,
        lat: city.lat,
        lon: city.lon,
      });
      setSuggestions([]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
    setQuery("");
  };

  const handleSuggestions = (suggestion) => {
    handleSearch(suggestion);
    setSuggestions([]);
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query) {
        setError(null);
        try {
          const data = await citySuggestions(query);
          setSuggestions(data || []);
        } catch (error) {
          setError(error.message);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    };
    const timer = setTimeout(fetchSuggestions, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (loading) {
      setContentHeight("h-[400px]");
    } else if (error) {
      setContentHeight("h-[200px]");
    } else if (weatherData) {
      setContentHeight("h-[605px]");
    } else {
      setContentHeight("h-[105px]");
    }
  }, [loading, error, weatherData]);

  useEffect(() => {
    if (weatherData) {
      const temp = isCelsius
        ? Math.round(weatherData.main.temp)
        : Math.round((weatherData.main.temp * 9) / 5 + 32);
      setDisplayTemp(temp);
    }
  }, [weatherData, isCelsius]);

  return (
    // Main Container
    <div
      className={`relative w-[400px] bg-white bg-opacity-10 backdrop-blur-md border-2 border-white border-opacity-20 rounded-2xl p-5 text-white font-medium transition-all duration-300 ease-in-out ${contentHeight}`}
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
            className="w-full h-14 bg-gray-800 bg-opacity-80 text-lg placeholder-gray-400 pl-12 pr-12 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 uppercase"
          />
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <i className="fas fa-location-dot text-xl"></i>
          </div>
          <button
            type="submit"
            className="absolute inset-y-0 right-3 flex items-center hover:text-opacity-70"
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
                onClick={() => handleSuggestions(suggestion)}
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

      {loading ? (
        <div className="flex justify-center items-center h-[500px]">
          <Loading />
        </div>
      ) : error ? (
        <div className="mt-4 p-4 bg-red-500 bg-opacity-70 text-white rounded-lg">
          <p className="font-bold text-lg mb-2">Error:</p>
          <p>{error}</p>
        </div>
      ) : weatherData ? (
        // Weather Container
        <div className="weather-info mt-4">
          {/* Searched City Name */}
          <div className="city-name text-center uppercase my-4 text-3xl font-semibold ">
            <p>{weatherData.fullName}</p>
          </div>

          {/* Weather Main Container */}
          <div className="text-center weather-icon">
            <WeatherIcon
              styling={"w-3/5 mx-auto"}
              main={weatherData.weather[0].main}
            />
            <p className="mt-5 mb-1.5">
              <AnimatedNumber
                val={displayTemp}
                unit={`°${isCelsius ? "C" : "F"}`}
                className="text-6xl font-bold"
              />
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
              to={`/weather/${encodeURIComponent(weatherData.fullName)}/${
                weatherData.lat
              }/${weatherData.lon}`}
              className="block w-full py-2.5 bg-white bg-opacity-20 text-center no-underline hover:bg-opacity-30 rounded-2xl"
            >
              View Details
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MainPage;
