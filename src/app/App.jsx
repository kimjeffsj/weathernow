import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DetailedWeather from "../pages/DetailedWeather";

const App = () => {
  return (
    <div>
      <h1>Welcome to Weather Now</h1>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />}></Route>
        <Route path="/weather/:city" element={<DetailedWeather />} />
      </Routes>
    </div>
  );
};

export default App;
