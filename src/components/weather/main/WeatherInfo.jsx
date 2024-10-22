import PropTypes from "prop-types";
import WeatherIcon from "@/shared/ui/WeatherIcon";
import AnimatedNumber from "@/shared/ui/AnimatedNumber";

const WeatherInfo = ({ weatherData, displayTemp, isCelsius }) => {
  return (
    <div className="text-center weather-icon">
      <WeatherIcon
        styling={"w-3/5 mx-auto"}
        main={weatherData.weather[0].main}
      />
      <div className="mt-5 mb-1.5">
        <AnimatedNumber
          val={displayTemp}
          unit={`°${isCelsius ? "C" : "F"}`}
          className="text-6xl font-bold"
        />
      </div>
      <p className="text-2xl capitalize description">
        {weatherData.weather[0].description}
      </p>
    </div>
  );
};

WeatherInfo.propTypes = {
  weatherData: PropTypes.object.isRequired,
  displayTemp: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isCelsius: PropTypes.bool.isRequired,
};

export default WeatherInfo;
