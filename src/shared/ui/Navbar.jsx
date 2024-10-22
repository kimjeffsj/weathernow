import { Link } from "react-router-dom";
import { Switch } from "@/components/ui/switch";

// eslint-disable-next-line react/prop-types
const Navbar = ({ isCelsius, toggleTempUnit }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white bg-opacity-10 backdrop-blur-md z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-white text-xl font-bold">
              WeatherNow
            </Link>
          </div>
          <div className="flex items-center">
            <span className="text-white mr-2">{isCelsius ? "°C" : "°F"}</span>
            <Switch checked={isCelsius} onCheckedChange={toggleTempUnit} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
