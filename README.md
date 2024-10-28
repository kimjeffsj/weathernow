## WeatherNow

WeatherNow is a user-friendly application designed to provide accurate and up-to-date weather information using OpenWeatherAPI. By searching for a city name, users can access current weather conditions and forecasts. The app is ideal for anyone needing quick and reliable weather updates.

## Table of Contents

- [Installation](#installation)

- [Usage](#usage)

- [Features](#features)

- [External Libraries and Frameworks](#external)

- [License](#license)

- [Contact](#contact)

## <a id="installation">**Installation**</a>

To install and set up WeatherNow locally, follow these steps:

1. Clone the repository:

```

git clone https://github.com/kimjeffsj/weathernow.git

```

2. Install the dependencies:

```

npm install

```

3. Set up environment variables:

- Copy the `sample.env` file to a new file named `.env`

- Update the values in `.env` with your specific configuration

## Configuration

Make sure make a `.env` file in the root directory of the project and add the following environment variables:

```

VITE_OPENWEATHER_API_KEY=YOUR_OPENWEATHER_API_KEY

```

Make sure to replace the placeholder values with your actual configuration.

To run the app in dev mode:

```

npm run dev

```

## <a id="usage">**Usage**</a>

WeatherNow allows users to search for weather information by city name. The app converts city names into geographic coordinates for precise location-based weather data. It also suggests city names to ensure accurate searches.

## <a id="features">**Features**</a>

- **City Name Search:** Enter a city name to find current weather and forecasts.

- **Location Suggestions:** Get suggestions for city names to ensure correct searches.

- **Main Page Information:** View current weather details such as temperature, wind speed, and humidity.

- **Detailed Forecasts:** Access detailed hourly forecasts for the next 48 hours and daily forecasts for the next 5 days.

- **Temperature Toggle:** Switch between Fahrenheit and Celsius for temperature readings.

## <a id="external">**External Libraries and Frameworks**</a>

The project utilizes several external libraries to enhance functionality and styling:

- **axios**: A promise-based HTTP client for making API requests to OpenWeatherAPI.

- **shadcn-ui**: A UI library for building modern web applications with pre-designed components.

- **@radix-ui/react-switch**: Provides accessible UI components for building custom switches.

- **Tailwind CSS**: A utility-first CSS framework used to style the application. It provides a set of predefined classes that help in rapidly building custom designs without leaving your HTML. Tailwind CSS is configured with PostCSS and Autoprefixer to ensure compatibility across different browsers.

- **tailwindcss-animate**: Adds animation utilities to Tailwind CSS for enhanced UI effects.

## <a id="license">**License**</a>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## <a id="contact">**Contact**</a>

Seongjun Jeff Kim - [kim.jeffsj@gmail.com](mailto:kim.jeffsj@gmail.com)

Project Link: [https://github.com/kimjeffsj/WeatherNow](https://github.com/kimjeffsj/WeatherNow)
