import { Link, useLocation } from "react-router-dom"
import Logo from "../../assets/Logo.png"
import NightMode from "../../assets/night-mode.svg"
import Personne from "../../assets/Vector.svg";
import Search from '../../assets/Landing/Search.svg'

export { SlideBar as SlideBar, Header as Header };
function SlideBar() {

    const location = useLocation();

    const isActivePage = (pathname) => {
        return location.pathname === pathname;
    };


    return (



        < div className="min-h-screen bg-[#0095B2] w-60 flex flex-col items-center py-10" >

            <Link to={"/"}>
                <img src={Logo} className="w-48 mb-24" />
            </Link>
            <ul className="w-full flex flex-col gap-10 font-medium text-lg ">
                <Link to={"/dashboard"}>
                    <li className={`relative text-center w-full py-[2rem] transition-all z-10 ${isActivePage('/dashboard') ? '' : 'hover:text-black group'} `}>
                        <span className="relative z-10">Dashboard</span>
                        <span className={`absolute rounded-[10px] rounded-e-none right-0 top-0 w-52 h-full bg-[#FFFFFC] opacity-0 text-[#E8FBFF] group-hover:opacity-50 transition-opacity z-0 ${isActivePage('/dashboard') ? 'opacity-100 text-[#00333D]' : ' '} `}></span>
                    </li>
                </Link>
                <Link to={"/dashboard/courses"} className="relative z-10">
                    <li className={`relative text-center w-full py-[2rem] transition-all ${isActivePage('/dashboard/courses') ? '' : 'hover:text-black group'} `}>
                        <span className="relative z-10">Courses</span>
                        <span className={`absolute rounded-[10px] rounded-e-none right-0 top-0 w-52 h-full bg-[#FFFFFC]  opacity-0 text-[#E8FBFF] group-hover:opacity-50 transition-opacity z-0 ${isActivePage('/dashboard/courses') ? 'opacity-100 text-[#00333D]' : ''} `}></span>

                    </li>
                </Link>
                <Link to={"/dashboard/notifactions"} className="relative z-10">
                    <li className={`relative text-center w-full py-[2rem] transition-all ${isActivePage('/dashboard/notifications') ? '' : 'hover:text-black group'} `}>
                        <span className="relative z-10">Notifactions</span>
                        <span className={`absolute rounded-[10px] rounded-e-none right-0 top-0 w-52 h-full bg-[#FFFFFC]  opacity-0 text-[#E8FBFF] group-hover:opacity-50 transition-opacity z-0 ${isActivePage('/dashboard/notifications') ? 'opacity-100 text-[#00333D]' : ''} `} ></span>

                    </li>
                </Link>
                <Link to={"/dashboard/setting"} className="relative z-10">
                    <li className="relative text-center w-full py-[2rem] rounded-3xl transition-all hover:text-black group">
                        <span className="relative z-10">Setting</span>
                        <span className={`absolute rounded-[10px] rounded-e-none right-0 top-0 w-52 h-full bg-[#FFFFFC] opacity-0 text-[#E8FBFF] group-hover:opacity-50 transition-opacity z-0 ${isActivePage('/dashboard/setting') ? 'opacity-100 text-[#00333D]' : ''} `}></span>

                    </li>
                </Link>
            </ul >
        </div >
    )
}
function Header() {
    return (
        <header className="flex justify-between flex-row shadow-lg bg-[#FFFFFC] color-[#FFFDE8] ps-36 px-28 py-6 h-24 border " >
            <div className="flex justify-between items-center py-[5px] px-[20px]  bg-[#FFFDE8] w-[500px] h-[40px] rounded-[20px]">
                <img src={Search} alt="" className="h-[25px] " />
                <input placeholder="Search For Courses. . ." className="bg-[#FFFDE8] w-[400px] flex justify-center text-center focus:outline-none placeholder:text-[#453507] text-xl" />
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
                    <span className="capitalize text-sm">specialist</span>
                </div>
            </div>
        </header>
    )
}
