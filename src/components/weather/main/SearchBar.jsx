import PropTypes from "prop-types";

const SearchBar = ({
  query,
  setQuery,
  handleSubmit,
  handleSuggestions,
  suggestions,
}) => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          placeholder="ENTER YOUR LOCATION"
          className="w-full h-14 bg-gray-800 bg-opacity-80 text-lg placeholder-gray-400 pl-12 pr-12 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 uppercase"
        />
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <i className="fas fa-location-dot text-xl"></i>
        </div>
        <button
          type="submit"
          className="absolute inset-y-0 right-3 flex items-center hover:text-opacity-70"
        >
          <i className="fas fa-magnifying-glass text-xl"></i>
        </button>
      </form>

      {/* City Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-gray-800 bg-opacity-80 rounded-lg mt-1 max-h-60 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestions(suggestion)}
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
            >
              {suggestion.name}
              {suggestion.state && `, ${suggestion.state}`},{" "}
              {suggestion.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleSuggestions: PropTypes.func.isRequired,
  suggestions: PropTypes.array.isRequired,
};

export default SearchBar;
