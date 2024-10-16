import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/";

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
    console.error("Error fetching weather data: " + error);
    throw error;
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
    console.error("Error fetching forecast data: ", error);
    throw error;
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
    console.error("Error fetching city suggestions: ", error);
    return [];
  }
};

export { getCurrentWeather, getForecast, citySuggestions };
