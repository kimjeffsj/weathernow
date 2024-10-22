import { Route, Routes } from "react-router-dom";

import Layout from "@/shared/ui/Layout";
import MainPage from "@/pages/MainPage";
import DetailedWeather from "@/pages/DetailedWeather";
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
