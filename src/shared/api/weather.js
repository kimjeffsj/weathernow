import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/";

const handleApiError = (error, errorMessage) => {
  console.error(errorMessage, error);
  if (error.response) {
    throw new Error(`API Error: ${error.response.data.errorMessage}`);
  } else if (error.request) {
    throw new Error("Network Error: Unable to reach the server");
  } else {
    throw new Error("Error: " + error.message);
  }
};

const getCurrentWeather = async (lat, lon) => {
  try {
    const response = await axios.get(`${BASE_URL}/data/2.5/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: "metric",
      },
    });

    return response.data;
  } catch (error) {
    handleApiError(error, "Error Fetching weather data: ");
  }
};

const getForecast = async (lat, lon) => {
  try {
    const response = await axios.get(`${BASE_URL}/data/2.5/forecast`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: "metric",
      },
    });

    return response.data;
  } catch (error) {
    handleApiError(error, "Error fetching forecast data: ");
  }
};

const citySuggestions = async (cityName) => {
  if (!cityName) return [];
  try {
    const response = await axios.get(`${BASE_URL}/geo/1.0/direct`, {
      params: {
        q: cityName,
        limit: 5,
        appid: API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    handleApiError(error, "Error fetching city suggestions.");
  }
};

export { getCurrentWeather, getForecast, citySuggestions };
