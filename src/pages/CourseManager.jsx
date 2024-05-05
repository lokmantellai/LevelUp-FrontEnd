import { Link } from "react-router-dom"
import Logo from "../assets/Logo.png"
import NightMode from "../assets/night-mode.svg"
import Personne from "../assets/Vector.svg";

function CourseManager() {
  return (
      <div className="flex">
          <SlideBar />
          <Header />
      </div>

  )
}
export default CourseManager

function SlideBar() {
    return (
        <div className="min-h-screen bg-[#0095B2] w-60 flex flex-col items-center py-10">
            <Link to={"/"}>
                <img src={Logo} className="w-48 mb-24"/>
            </Link>
        <ul className="w-full flex flex-col gap-10 font-medium text-lg text-[#E8FBFF]">
        <li className="relative text-center w-full py-[2rem] transition-all hover:text-black group">
            <span className="absolute rounded-[30px] rounded-e-none right-0 top-0 w-52 h-full bg-[#FFFFFC] opacity-0 group-hover:opacity-100 transition-opacity z-0"></span>
            <Link to={"/dashboard"} className="relative z-10">Dashboard</Link>
        </li>
        <li className="relative text-center w-full py-[2rem]  transition-all hover:text-black group">
            <span className="absolute rounded-[30px] rounded-e-none right-0 top-0 w-52 h-full bg-[#FFFFFC] opacity-0 group-hover:opacity-100 transition-opacity z-0"></span>
            <Link to={"/courses"} className="relative z-10">Courses</Link>
        </li>
        <li className="relative text-center w-full py-[2rem] rounded-3xl transition-all hover:text-black group">
            <span className="absolute rounded-[30px] rounded-e-none right-0 top-0 w-52 h-full bg-[#FFFFFC]  opacity-0 group-hover:opacity-100 transition-opacity z-0"></span>
            <Link to={"/notifactions"} className="relative z-10">Notifactions</Link>
        </li>
        <li className="relative text-center w-full py-[2rem] rounded-3xl transition-all hover:text-black group">
            <span className="absolute rounded-[30px] rounded-e-none right-0 top-0 w-52 h-full bg-[#FFFFFC] opacity-0 group-hover:opacity-100 transition-opacity z-0"></span>
            <Link to={"/setting"} className="relative z-10">Setting</Link>
        </li>
    </ul>
        </div>
    )
}
function Header() {
    return (
        <header className="flex justify-between flex-row shadow-lg bg-[#FFFFFC] color-[#FFFDE8] ps-36 px-28 py-6 h-24 border flex-1" >
            <div className="w-[40rem]">
                <input placeholder="Search For Courses. . ." className="bg-[#FFF8B2] w-full h-full flex justify-center text-center focus:outline-none placeholder:text-[#453507] text-xl"/>
            </div>
            <div className="flex  gap-7">
                <button className="w-9 h-9 flex justify-center items-center bg-[#FFF0C4] rounded-full">
                    <img src={NightMode} className="w-7 h-7" />
                </button>
                <button className="w-9 h-9 flex justify-center items-center bg-[#FFF0C4] rounded-full">
                    <img src={Personne} className="w-7 h-7" />
                </button>
                <div className="flex flex-col items-center">
                    <span className="capitalize font-medium">lokman tellai</span>
                    <span className="capitalize text-sm">software engineer</span>
                </div>
            </div>
        </header>
    )
}
