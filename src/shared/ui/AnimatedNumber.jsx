import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const AnimatedNumber = ({ val, unit = "", className = "" }) => {
  const [displayedVal, setDisplayedVal] = useState(val);
  const [displayedUnit, setDisplayedUnit] = useState(unit);
  const [prevVal, setPrevVal] = useState(null);
  const [prevUnit, setPrevUnit] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (val !== displayedVal || unit !== displayedUnit) {
      setPrevVal(displayedVal);
      setPrevUnit(displayedUnit);
      setIsAnimating(true);

      const timer = setTimeout(() => {
        setDisplayedVal(val);
        setDisplayedUnit(unit);
        setIsAnimating(false);
        setPrevVal(null);
        setPrevUnit(null);
      }, 500);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [val, unit]);

  return (
    <div className="relative">
      {/* Current Number */}
      <div
        className={`${className} ${isAnimating ? "opacity-0" : "opacity-100"} `}
      >
        {displayedVal}
        {displayedUnit}
      </div>

      {/* Previous Number */}
      {isAnimating && prevVal !== null && (
        <div className={`${className} absolute inset-0 animate-slide-up`}>
          {prevVal}
          {prevUnit}
        </div>
      )}

      {/* New Number */}
      {isAnimating && (
        <div className={`${className} absolute inset-0 animate-slide-down`}>
          {val}
          {unit}
        </div>
      )}
    </div>
  );
};

export default AnimatedNumber;
