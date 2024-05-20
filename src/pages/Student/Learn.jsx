import { useEffect, useState } from "react";
import lottie from "lottie-web"
import SearchIcon from "../../assets/StudentDashboard/SearchIcon.svg"
import Animation from "../../assets/StudentDashboard/Animation - 1715568128344.json"
import LearnIcon from "../../assets/StudentDashboard/Learn.png"
import Arrow from "../../assets/StudentDashboard/Arrow.svg"
import database from "../../assets/StudentDashboard/database.svg"
import { Link } from "react-router-dom";


function Learn() {
  const [activeButton, setActiveButton] = useState("All");
  const courses = [
    { title: "Database", level: "Beginner", degree: "Bachelor 1st", progress: "36%" },
    { title: "Database", level: "Beginner", degree: "Bachelor 1st", progress: "36%" },
    { title: "Database", level: "Beginner", degree: "Bachelor 1st", progress: "36%" },
    { title: "Network System", level: "Beginner", degree: "Bachelor 1st", progress: "38%" },
    // Add more courses if needed
  ];

  


  useEffect(() => {
    const instance = lottie.loadAnimation({
        container: document.querySelector(".animation"),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: Animation
    })
    return () => instance.destroy();
}, [])

  return (
    <div className='mt-[50px] px-[100px]'>
      <div className='h-[350px] bg-[#00333D] ps-[90px] rounded-[20px] flex relative gap-x-20 items-center'>
        <div className="py-[45px]">
          <h2 className='text-[36px] font-medium max-w-[450px] text-[#E8FBFF] opacity-70'>What do you want to learn today ?</h2>
              <div className="relative flex mt-[70px] items-center">
                <input placeholder="Search for courses ..." className='text-[18px] w-[545px] h-[60px] bg-[#E8FBFF] rounded-[10px] ps-[100px] pe-[26px] py-[15px] placeholder:text-[18px] placeholder:text-[#00333D] placeholder:font-medium placeholder:opacity-50 focus-visible:outline-none'/>                  
                  <button onClick={() => { console.log("Click it"); }}>
                  <img src={SearchIcon} alt='Search' className="w-[28px] h-[28px] absolute top-1/2 -translate-y-1/2 left-[26px]"/>
                </button>
              </div>
              <div className="text-[#E8FBFF] text-[18px] flex mt-[24px]">
                  Suggestions : 
                  <div className="flex ms-2 gap-1 w-fit">
                  <span className="text-[#E8FBFF] underline">Data Structures</span>
                  ,
                  <span className="text-[#E8FBFF] underline">Python</span>                      
                  </div>
              </div>
        </div>
        <div className="h-[335px] w-[580px] flex justify-end items-center overflow-hidden">
          <div className="animation "></div>
        </div>
      </div>   
      <div className="mt-[77px] mb-[73px] h-[50px] flex gap-[20px] text-[#00333D] text-[20px] font-medium justify-center">
        <button onClick={()=> {setActiveButton("All")}} className={`w-[110px] flex items-center justify-center border-[#00333D] border-[3px] rounded-xl ${activeButton === 'All' && "bg-[#00333D] text-[#E8FBFF]"}`}>All</button>
        <button onClick={()=> {setActiveButton("On Going")}} className={`w-[185px] flex items-center justify-center border-[#00333D] border-[3px] rounded-xl ${activeButton === 'On Going' && "bg-[#00333D] text-[#E8FBFF]"}`}>On Going</button>
        <button onClick={()=> {setActiveButton("Completed")}} className={`w-[185px] flex items-center justify-center border-[#00333D] border-[3px] rounded-xl ${activeButton === 'Completed' && "bg-[#00333D] text-[#E8FBFF]"}`}>Completed</button>
      </div>
      <Slider courses={courses} />
      <Slider courses={courses} />
      <Slider courses={courses} />
    </div>
  )
}

export default Learn

function Course({ title, level, degree, progress }) {
  return (
    <div className="bg-[#FFFBED] h-full rounded-[10px] relative pt-[44px] w-[318px]">
      <img src={database} alt="Database Icon" className="absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2"/>
      <div className="flex flex-col items-center gap-[5px]">
        <h5 className="text-[22px] text-[#00333D] font-medium">{title}</h5>
        <div className="flex justify-between w-full px-[34px]">
          <span className="text-[18px] text-[#00333D]">{level}</span>
          <span className="text-[18px] text-[#00333D]">{degree}</span>
        </div>
        <div className="flex items-center justify-between w-full px-[34px] gap-[15px]">
          <span className="text-[#00333D] text-[16px]">{progress}%</span>
          <div className="flex-1 h-[10px] bg-[#E8FBFF] rounded-[20px]">
            <div style={{ width: progress }} className="h-full bg-[#FAE200] rounded-[20px]"></div>
          </div>
        </div>
        <Link className="border-t-2 border-[#00333D] w-full flex justify-center items-center h-[50px] text-[18px] text-[#00333D]" to="#">
          Continue
        </Link>
      </div>
    </div>
  )
}
function Slider({courses}) {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCourses = [
    courses[(startIndex) % courses.length],
    courses[(startIndex + 1) % courses.length],
    courses[(startIndex + 2) % courses.length],
  ];
  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % courses.length);
  };

  return (
      <div className="mt-[65px]">
        <h3 className="text-[#73590B] font-medium text-[36px] mb-[63px]">In Progress </h3>
        <div className="h-[215px] flex gap-[22px] px-1 items-end">
          <div className="h-[190px] w-[190px] bg-[#E8FBFF] flex flex-col justify-center items-center shadow-card py-[38px] gap-[20px]">
            <img src={LearnIcon} />
            <span className="text-[20px] font-medium text-[#00333D]">Learn</span>
          </div>
          <div className="h-full pt-[25px] flex  w-[999px] overflow-x-hidden">
          <div className="flex gap-[22px]">
          {visibleCourses.map((course, index) => (
            <Course key={index} {...course} />
          ))}
        </div>
          </div>
          <button onClick={handleNext} className="bg-[#FFE9A6] h-[190px] rounded-[10px] w-[75px] flex justify-center items-center ms-1">
            <img src={Arrow} alt="arrow"/>
          </button>
      </div>
      </div>
  )
}