import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

import { getCurrentWeather, citySuggestions } from "@/shared/api/weather";
import { convertTemp } from "@/shared/utils/convertTemp";

import SearchBar from "@/components/weather/main/SearchBar";
import WeatherInfo from "@/components/weather/main/WeatherInfo";
import WeatherDetail from "@/components/weather/main/WeatherDetail";
import MainPageSkeleton from "@/components/weather/main/MainSkeleton";

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
      setContentHeight("h-[605px]");
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
      const temp = convertTemp(weatherData.main.temp, isCelsius);
      setDisplayTemp(temp);
    }
  }, [weatherData, isCelsius]);

  return (
    // Main Container
    <div
      className={`relative w-[400px] bg-white bg-opacity-10 backdrop-blur-md border-2 border-white border-opacity-20 rounded-2xl p-5 text-white font-medium transition-all duration-300 ease-in-out ${contentHeight}`}
    >
      {/* Search Container */}
      <SearchBar
        query={query}
        setQuery={setQuery}
        handleSubmit={handleSubmit}
        handleSuggestions={handleSuggestions}
        suggestions={suggestions}
      />

      {loading ? (
        <div className="flex justify-center items-center h-[605px] ">
          <MainPageSkeleton />
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
          {displayTemp && (
            <WeatherInfo
              weatherData={weatherData}
              displayTemp={displayTemp}
              isCelsius={isCelsius}
            />
          )}

          {/* Little Detail Container */}
          {weatherData && <WeatherDetail weatherData={weatherData} />}

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
