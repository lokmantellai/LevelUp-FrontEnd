import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Arrow from "../assets/Arrow.svg";
import { useRegister } from "../context/hooks";

function ProgressBar() {
  const [progressWidth, setProgressWidth] = useState(0);
  const navigate = useNavigate();
  const { current, prev, all } = useRegister();
  useEffect(() => {
    const newWidth = Math.round((current * 100) / all);
    setProgressWidth(newWidth);
  }, [current, all]);
  return (
    <header className="flex justify-center">
      {prev !== undefined && (
        <button
          onClick={() => {
            navigate(prev);
          }}
        >
          <img src={Arrow} className="w-2 h-4" alt="Arrow" />
        </button>
      )}
      <div className="ms-5 max-w-[40rem] lg:w-[45%] w-[65%] h-3 bg-[#FFF8B2] rounded-full">
        <div
          style={{ width: `${progressWidth}%` }}
          className="transition duration-1000 h-full bg-[#FAE200] rounded-full"
        ></div>
      </div>
    </header>
  );
}

export default ProgressBar;
