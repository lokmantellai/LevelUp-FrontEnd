import { useNavigate } from "react-router-dom";
import Arrow from "../assets/Arrow.svg"
import { useContext } from "react";

function ProgressBar({ all, current,prev }) {
    let progress = Math.round((current * 100) / all);
    let style = { width: progress + "%" }
    let navigate = useNavigate();
    let value = {}
    return (
        <header className="flex justify-center">
            {prev != undefined &&
                <button onClick={() => {
                    navigate(prev)
            }}>
                <img src={Arrow} className="w-2 h-4" />                  
            </button>}
            <div className="ms-5 max-w-[40rem] lg:w-[45%] w-[65%] h-3 bg-[#FFF8B2] rounded-full" >
                <div  style={style} className={`h-full bg-[#FAE200] rounded-full`}></div>
            </div>
        </header> 
  )
}

export default ProgressBar