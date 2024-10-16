import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import DetailedWeather from "../pages/DetailedWeather";

import "./styles/index.css";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/weather/:city/:lat/:lon" element={<DetailedWeather />} />
      </Routes>
    </div>
  );
};

export default App;
