// eslint-disable-next-line react/prop-types
const WeatherIcon = ({ main, styling }) => {
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

  return (
    <img src={getWeatherIcon(main)} className={styling} alt="Weather Icon" />
  );
};

export default WeatherIcon;
