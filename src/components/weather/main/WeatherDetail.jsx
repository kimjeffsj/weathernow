import PropTypes from "prop-types";

const WeatherDetail = ({ weatherData }) => {
  return (
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
  );
};

WeatherDetail.propTypes = {
  weatherData: PropTypes.object.isRequired,
};

export default WeatherDetail;
