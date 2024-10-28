import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

import { getCurrentWeather, citySuggestions } from "@/shared/api/weather";
import { convertTemp } from "@/shared/utils/convertTemp";

import SearchBar from "@/features/MainPage/SearchBar";
import WeatherInfo from "@/features/MainPage/WeatherInfo";
import WeatherDetail from "@/features/MainPage/WeatherDetail";
import MainSkeleton from "@/features/MainPage/MSkeleton";

const MainPage = () => {
  const [query, setQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [displayTemp, setDisplayTemp] = useState(null);
  const [expansion, setExpansion] = useState(false);

  const { isCelsius } = useOutletContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      handleSearch(suggestions[0]);
    }
  };

  const handleSearch = async (city) => {
    setExpansion(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

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
    if (weatherData) {
      const temp = convertTemp(weatherData.main.temp, isCelsius);
      setDisplayTemp(temp);
    }
  }, [weatherData, isCelsius]);

  return (
    // Main Container
    <div
      className={`relative w-[400px] bg-white bg-opacity-10 backdrop-blur-md border-2 border-white border-opacity-20 rounded-2xl text-white font-medium`}
    >
      {/* Search Container */}
      <div className={`px-5 ${weatherData ? "pt-5" : "py-5"}`}>
        <SearchBar
          query={query}
          setQuery={setQuery}
          handleSubmit={handleSubmit}
          handleSuggestions={handleSuggestions}
          suggestions={suggestions}
        />
      </div>

      {/* Grid Container */}
      <div
        className={`grid transition-all duration-500 ease-in-out ${
          expansion ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5">
            {loading ? (
              <MainSkeleton />
            ) : error ? (
              <div className="mt-4 p-4 bg-red-500 bg-opacity-70 text-white rounded-lg">
                <p className="font-bold text-lg mb-2">Error:</p>
                <p>{error}</p>
              </div>
            ) : (
              weatherData && (
                // Weather Container
                <div className="weather-info mt-4">
                  {/* Searched City Name */}
                  <div className="city-name text-center uppercase my-4 text-3xl font-semibold">
                    <p>{weatherData.fullName}</p>
                  </div>

                  {/* Weather Main Container */}
                  <div className="relative mb-3">
                    {displayTemp && (
                      <WeatherInfo
                        weatherData={weatherData}
                        displayTemp={displayTemp}
                        isCelsius={isCelsius}
                      />
                    )}
                  </div>

                  {/* Little Detail Container */}
                  <div className="relative h-32">
                    <WeatherDetail weatherData={weatherData} />

                    {/* Link to Detail Page */}
                    <div className="absolute bottom-5 left-5 right-5 view-details-link">
                      <Link
                        to={`/weather/${encodeURIComponent(
                          weatherData.fullName
                        )}/${weatherData.lat}/${weatherData.lon}`}
                        className="block w-full py-2.5 bg-white bg-opacity-20 text-center no-underline hover:bg-opacity-30 rounded-2xl"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
