import AnimatedNumber from "@/shared/ui/AnimatedNumber";
import WeatherIcon from "@/shared/ui/WeatherIcon";
import PropTypes from "prop-types";

const HourlyForecast = ({ hourlyForecast, displayTemp, isCelsius }) => {
  return (
    <div>
      <div className="mb-10 hourlyForecast">
        <h3 className="text-lg font-semibold mb-4">Hourly Forecast</h3>
        <div className="weather-details flex overflow-x-auto py-4 bg-gray-800 bg-opacity-50 rounded-lg">
          {hourlyForecast.map((hour, index) => (
            <div key={index} className="flex-shrink-0 w-20 text-center mx-2">
              <p className="mb-2">{new Date(hour.dt * 1000).getHours()}:00</p>
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
    </div>
  );
};

HourlyForecast.propTypes = {
  hourlyForecast: PropTypes.arrayOf(PropTypes.object).isRequired,
  displayTemp: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  isCelsius: PropTypes.bool.isRequired,
};

export default HourlyForecast;
