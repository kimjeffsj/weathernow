import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    // {/* // Background */}
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/weatherIcon/background.jpg')",
      }}
    >
      <Outlet />
    </div>
  );
};

export default Layout;
