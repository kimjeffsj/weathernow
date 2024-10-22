import { useState } from "react";

const SlideToggle = () => {
  const [currentValue, setCurrentValue] = useState(10);
  const [isToggled, setIsToggled] = useState(false);
  const [animate, setAnimate] = useState("");

  const toggleValue = () => {
    // 애니메이션 시작
    setAnimate("slide-out");
    setTimeout(() => {
      // 값이 변경되면 애니메이션을 적용한 후 슬라이드 인 애니메이션 적용
      setCurrentValue((prev) => (prev === 10 ? 20 : 10));
      setAnimate("slide-in");
    }, 300);
  };

  return (
    <div className="flex flex-col items-center text-white">
      {/* 현재 숫자 */}
      <div
        className={`transition-transform duration-300 ${
          animate === "slide-out" ? "translate-y-[-100%] opacity-0" : ""
        } ${
          animate === "slide-in"
            ? "translate-y-0 opacity-100"
            : "translate-y-[100%] opacity-0"
        }`}
      >
        <p className="text-4xl font-bold">{currentValue}</p>
      </div>

      {/* 토글 버튼 */}
      <button
        onClick={toggleValue}
        className="mt-8 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Toggle Value
      </button>
    </div>
  );
};

export default SlideToggle;
