const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      <p className="mt-4 text-white text-lg">Loading weather data...</p>
    </div>
  );
};

export default Loading;
