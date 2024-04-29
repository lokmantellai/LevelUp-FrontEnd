import Check from "../assets/check.svg"
import ArrowWhite from "../assets/Arrow-white.svg"
export default function SlideBar({text,data}) {
  return (
      <div className="div">
             <h4 className="text-3xl mt-8 mb-4">Bachelor 1st year</h4>
            <div className="flex justify-between items-center w-[90%] ps-12">
              <button className="w-10 h-10 bg-[#00333D] flex justify-center items-center rounded-lg">
                <img src={ArrowWhite}  />
              </button>
                <div className="grid grid-cols-3 items-between gap-5 w-[90%]">
                  <button data-id={1} onClick={(ev) => { ev.target.classList.toggle("checkedChoice") }} className="h-20 bg-[#E8FBFF] flex items-center justify-center text-3xl rounded-lg relative"><img src={Check} className="absolute left-14 hidden" />{data[0]}</button>
                  <button data-id={2} onClick={(ev) => { ev.target.classList.toggle("checkedChoice") }} className="h-20 bg-[#E8FBFF] flex items-center justify-center text-3xl rounded-lg relative"><img src={Check} className="absolute left-14 hidden" />{data[1]}</button>
                  <button data-id={3} onClick={(ev) => {ev.target.classList.toggle("checkedChoice")}} className="h-20 bg-[#E8FBFF] flex items-center justify-center text-3xl rounded-lg relative"><img src={Check} className="absolute left-14 hidden"/>{data[2]}</button>
                </div>
              <button className="rotate-180 w-10 h-10 bg-[#00333D] flex justify-center items-center rounded-lg ">
                <img src={ArrowWhite}  />
              </button>
             </div>
         
      </div>
  )
}
