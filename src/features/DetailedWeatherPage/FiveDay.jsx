import PropTypes from "prop-types";
import WeatherIcon from "@/shared/ui/WeatherIcon";
import AnimatedNumber from "@/shared/ui/AnimatedNumber";

const FiveDay = ({ dailyForecast, displayTemp, isCelsius }) => {
  return (
    <div>
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
              <p className="text-sm capitalize">{day.weather[0].description}</p>
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
  );
};

FiveDay.propTypes = {
  dailyForecast: PropTypes.arrayOf(PropTypes.object).isRequired,
  displayTemp: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  isCelsius: PropTypes.bool.isRequired,
};

export default FiveDay;
