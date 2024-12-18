import { useEffect, useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";

import { getForecast } from "@/shared/api/weather";
import { convertTemp, convertMaxMinTemp } from "@/shared/utils/convertTemp";

import DetailedWeatherSkeleton from "@/features/DetailedWeatherPage/DWSkeleton";
import HourlyForecast from "@/features/DetailedWeatherPage/HourlyForecast";
import FiveDay from "@/features/DetailedWeatherPage/FiveDay";

const DetailedWeather = () => {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayTemp, setDisplayTemp] = useState(null);
  const [expansion, setExpansion] = useState(false);

  const { city, lat, lon } = useParams();
  const navigate = useNavigate();
  const { isCelsius } = useOutletContext();

  useEffect(() => {
    const fetchForecast = async () => {
      setExpansion(true);
      await new Promise((resolve) => setTimeout(resolve, 300));

      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));

      try {
        const forecastData = await getForecast(lat, lon);
        setForecast(forecastData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchForecast();
  }, [lat, lon]);

  let dailyForecast = [];
  let hourlyForecast = [];
  if (forecast && forecast.list) {
    dailyForecast = forecast.list.filter((item, index) => index % 8 === 0);
    hourlyForecast = forecast.list.slice(0, 24);
  }

  const [cityName, stateName, countryName] =
    decodeURIComponent(city).split(", ");
  const newCityName = [cityName, stateName, countryName]
    .filter(Boolean)
    .join(", ");

  useEffect(() => {
    if (forecast?.list) {
      const newTemps = {};
      forecast.list.forEach((item, index) => {
        const temp = convertTemp(item.main.temp, isCelsius);
        const { max, min } = convertMaxMinTemp(
          {
            max: item.main.temp_max,
            min: item.main.temp_min,
          },
          isCelsius
        );

        newTemps[`temp_${index}`] = temp;
        newTemps[`max_temp_${index}`] = max;
        newTemps[`min_temp_${index}`] = min;
      });
      setDisplayTemp(newTemps);
    }
  }, [forecast, isCelsius]);

  return (
    // Main Container
    <div
      className={`relative mt-5 mb-8 w-[90%] md:w-[50%] bg-white bg-opacity-10 backdrop-blur-md border-2 border-white border-opacity-20 rounded-2xl text-white font-medium`}
    >
      <div className="px-5 pt-5">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="back-btn w-[20%] py-1.5 bg-white bg-opacity-20 text-center no-underline hover:bg-opacity-30 rounded-2xl"
        >
          <i className="fas fa-arrow-left mr-2"></i>Back
        </button>

        {/* City Name */}
        <h2 className="text-4xl font-bold my-6 uppercase city-name">
          {newCityName}
        </h2>
      </div>

      <div
        className={`grid transition-all duration-500 ease-in-out ${
          expansion ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center">
              <DetailedWeatherSkeleton />
            </div>
          ) : error ? (
            <div className="mt-4 p-4 bg-red-500 bg-opacity-70 text-white rounded-lg">
              <p className="font-bold text-lg mb-2">Error:</p>
              <p>{error}</p>
            </div>
          ) : (
            forecast && (
              <div className="detailed-container px-5 pb-5">
                {/* Hourly Forecast */}
                {displayTemp && (
                  <HourlyForecast
                    hourlyForecast={hourlyForecast}
                    displayTemp={displayTemp}
                    isCelsius={isCelsius}
                  />
                )}

                <div className="dailyForecast">
                  {/* 5 Day Forecast */}
                  {displayTemp && (
                    <FiveDay
                      dailyForecast={dailyForecast}
                      displayTemp={displayTemp}
                      isCelsius={isCelsius}
                    />
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailedWeather;
