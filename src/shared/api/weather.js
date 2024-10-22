import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/";

const handleApiError = (error) => {
  console.error("API Error:", error);
  if (error.response) {
    switch (error.response.status) {
      case 401:
        throw new Error(
          "Invalid API key. Please check your OpenWeatherMap API key."
        );
      case 404:
        throw new Error(
          "City not found. Please check the spelling and try again."
        );
      case 429:
        throw new Error("Too many requests. Please try again later.");
      default:
        throw new Error(`An error occurred: ${error.response.data.message}`);
    }
  } else if (error.request) {
    throw new Error(
      "Unable to reach the weather service. Please check your internet connection."
    );
  } else {
    throw new Error("An unexpected error occurred. Please try again.");
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
    handleApiError(error);
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
    handleApiError(error);
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
    handleApiError(error);
  }
};

export { getCurrentWeather, getForecast, citySuggestions };
