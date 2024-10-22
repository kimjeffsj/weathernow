import { useEffect, useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { getForecast } from "@/shared/api/weather";

import WeatherIcon from "@/shared/ui/WeatherIcon";
import Loading from "@/shared/ui/Loading";
import AnimatedNumber from "@/shared/ui/AnimatedNumber";

const DetailedWeather = () => {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contentHeight, setContentHeight] = useState("min-h-[615px]");
  const [displayTemp, setDisplayTemp] = useState("null");

  const { city, lat, lon } = useParams();
  const navigate = useNavigate();
  const { isCelsius } = useOutletContext();

  useEffect(() => {
    const fetchForecast = async () => {
      setLoading(true);
      setError(null);
      try {
        const forecastData = await getForecast(lat, lon);
        setForecast(forecastData);
      } catch (error) {
        console.error("Error fetching forecast data: ", error);
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
    if (loading) {
      setContentHeight("h-[615px]");
    } else if (error) {
      setContentHeight("min-h-[200px]");
    } else if (forecast) {
      setContentHeight("h-[860px]");
    } else {
      setContentHeight("min-h-[105px]");
    }
  }, [loading, error, forecast]);

  useEffect(() => {
    if (forecast?.list) {
      const newTemps = {};
      forecast.list.forEach((item, index) => {
        const temp = isCelsius
          ? Math.round(item.main.temp)
          : Math.round((item.main.temp * 9) / 5 + 32);
        const maxTemp = isCelsius
          ? Math.round(item.main.temp_max)
          : Math.round((item.main.temp_max * 9) / 5 + 32);
        const minTemp = isCelsius
          ? Math.round(item.main.temp_min)
          : Math.round((item.main.temp_min * 9) / 5 + 32);

        newTemps[`temp_${index}`] = temp;
        newTemps[`max_temp_${index}`] = maxTemp;
        newTemps[`min_temp_${index}`] = minTemp;
      });
      setDisplayTemp(newTemps);
    }
  }, [forecast, isCelsius]);

  return (
    // Main Container
    <div
      className={`relative mt-5 mb-8 w-[90%] md:w-[50%] bg-white bg-opacity-10 backdrop-blur-md border-2 border-white border-opacity-20 rounded-2xl p-5 text-white font-medium transition-all duration-300 ease-in-out ${contentHeight}`}
    >
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

      {loading ? (
        <div className="h-[500px] flex items-center justify-center">
          <Loading />
        </div>
      ) : error ? (
        <div className="mt-4 p-4 bg-red-500 bg-opacity-70 text-white rounded-lg">
          <p className="font-bold text-lg mb-2">Error:</p>
          <p>{error}</p>
        </div>
      ) : forecast ? (
        <div className="detailed-container">
          {/* Hourly Forecast */}
          <div className="mb-10 hourlyForecast">
            <h3 className="text-lg font-semibold mb-4">Hourly Forecast</h3>
            <div className="weather-details flex overflow-x-auto py-4 bg-gray-800 bg-opacity-50 rounded-lg">
              {hourlyForecast.map((hour, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-20 text-center mx-2"
                >
                  <p className="mb-2">
                    {new Date(hour.dt * 1000).getHours()}:00
                  </p>
                  <WeatherIcon
                    main={hour.weather[0].main}
                    styling={"w-8 h-6 mx-auto mb-2"}
                  />
                  <AnimatedNumber
                    val={displayTemp[`temp_${index}`]}
                    unit={`°${isCelsius ? "C" : "F"}`}
                    className="font-bold"
                  />
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
                    <WeatherIcon
                      styling={"w-8 h-6 mx-auto"}
                      main={day.weather[0].main}
                    />
                    <p className="text-sm capitalize">
                      {day.weather[0].description}
                    </p>
                  </div>
                  <div className="w-1/4 text-center">
                    <AnimatedNumber
                      val={displayTemp[`max_temp_${index}`]}
                      unit={`°${isCelsius ? "C" : "F"}`}
                      className="font-bold"
                    />
                    <p className="text-sm">High</p>
                  </div>
                  <div className="w-1/4 text-center">
                    <AnimatedNumber
                      val={displayTemp[`min_temp_${index}`]}
                      unit={`°${isCelsius ? "C" : "F"}`}
                      className="font-bold"
                    />
                    <p className="text-sm">Low</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DetailedWeather;
