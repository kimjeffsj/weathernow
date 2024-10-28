import { Route, Routes } from "react-router-dom";

import Layout from "@/shared/ui/Layout";
import MainPage from "@/features/MainPage/MainPage";
import DetailedWeather from "@/features/DetailedWeatherPage/DetailedWeatherPage";
import Navbar from "@/shared/ui/Navbar";

import "@/app/styles/index.css";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route
            path="/weather/:city/:lat/:lon"
            element={<DetailedWeather />}
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
