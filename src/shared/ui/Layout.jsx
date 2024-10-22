import { useCallback, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  const [isCelsius, setIsCelsius] = useState(true);

  const toggleTempUnit = useCallback(() => {
    setIsCelsius((prevState) => !prevState);
  }, []);

  return (
    // Background
    <div
      className="flex flex-col justify-center bg-fixed min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/weatherIcon/background.jpg')",
      }}
    >
      <Navbar isCelsius={isCelsius} toggleTempUnit={toggleTempUnit} />
      <div className="flex-grow flex justify-center items-center pt-16">
        <Outlet context={{ isCelsius, toggleTempUnit }} />
      </div>
    </div>
  );
};

export default Layout;
