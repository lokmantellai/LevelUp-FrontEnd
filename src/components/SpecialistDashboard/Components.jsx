import { Link, useLocation } from "react-router-dom"
import Logo from "../../assets/Logo.png"
import NightMode from "../../assets/night-mode.svg"
import Personne from "../../assets/Vector.svg";
import Search from '../../assets/Landing/Search.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faListUl, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import Backdrop from '@mui/material/Backdrop';
import axios from 'axios'; // Import Axios
import useAxios from "../../api/useAxios";



export { SideBar as SideBar, Header as Header, CoursInfo as CoursInfo };
function SideBar() {

    const location = useLocation();


    const isActivePage = (pathname) => {
        return location.pathname === pathname;
    };


    return (
        < div className=" min-h-screen bg-[#0095B2] w-60 flex flex-col items-center py-10" >
            <Link to={"/"}>
                <img src={Logo} className="w-48 mb-24" />
            </Link>
            <ul className="w-full flex flex-col gap-10 font-medium text-lg text-[#FFFFFC] ">
                <Link to={"/dashboard"}>
                    <li className={`relative text-center w-full py-[2rem] transition-all z-10 ${isActivePage('/dashboard') ? 'text-[#0095B2]' : 'hover:text-black group'} `}>
                        <span className="relative z-10">Dashboard</span>
                        <span className={`absolute rounded-[10px] rounded-e-none right-0 top-0 w-52 h-full bg-[#FFFFFC] opacity-0 text-[#E8FBFF] group-hover:opacity-50 transition-opacity z-0 ${isActivePage('/dashboard') ? 'opacity-100 text-[#00333D]' : ' '} `}></span>
                    </li>
                </Link>
                <Link to={"/dashboard/courses"} className="relative z-10">
                    <li className={`relative text-center w-full py-[2rem] transition-all ${isActivePage('/dashboard/courses') ? 'text-[#0095B2]' : 'hover:text-black group'} `}>
                        <span className="relative z-10">Courses</span>
                        <span className={`absolute rounded-[10px] rounded-e-none right-0 top-0 w-52 h-full bg-[#FFFFFC]  opacity-0 text-[#E8FBFF] group-hover:opacity-50 transition-opacity z-0 ${isActivePage('/dashboard/courses') ? 'opacity-100 text-[#00333D]' : ''} `}></span>
                    </li>
                </Link>
                <Link to={"/dashboard/notifactions"} className="relative z-10">
                    <li className={`relative text-center w-full py-[2rem] transition-all ${isActivePage('/dashboard/notifications') ? 'text-[#0095B2]' : 'hover:text-black group'} `}>
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
        <header className="flex justify-between flex-row shadow-lg bg-[#FFFFFC] color-[#FFFDE8] ps-36 px-28 py-6 h-24 border relative z-10"  >
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
                    <span className="capitalize font-medium">lokmane tellai</span>
                    <span className="capitalize text-sm">specialist</span>
                </div>
            </div>
        </header>
    )
}






function DeleteDialogue({ e, cancel, onDelete }) {

    const [showModal, setShowModal] = useState(true);
    const { privateAxios } = useAxios();

    const handleCancel = () => {
        cancel()
        setShowModal(false); // Close modal without confirmation
    };

    const [message, setMessage] = useState('');

    const handleDelete = () => {


        privateAxios.delete(`/users/course/delete/${e.id}`)
            .then(response => {
                if (response.ok) {
                    setMessage('Course deleted successfully.');
                    // Optionally, you can perform additional actions after successful deletion
                } else {
                    setMessage('Error deleting course.');
                    // Optionally, you can handle different types of errors here
                }
                onDelete()
            })
            .catch(error => {
                setMessage('Network error. Please try again.');
                console.error('Error:', error);
            });

    };

    const handleConfirm = () => {
        console.log('delete')
        handleDelete();
        // Handle confirmation logic
        setShowModal(false); // Close modal after confirmation
    };



    return (

        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={showModal}
            onClick={handleCancel}
        >

            <div className={`fixed top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between items-center w-[500px] h-[200px] py-[40px] px-[40px] bg-[#FFFFFC] text-center rounded-2xl [box-shadow:0px_0px_10px_rgba(0,_0,_0,_0.3)] `}>  <h1 className="text-[#3D3700] text-[16px] font-medium"> Are You Really Want To Delete {e.title} Cours ?</h1>

                <div className="flex w-[250px] justify-between items-center">
                    <button className="flex items-center justify-center px-[20px] py-[20px] w-[100px] h-[30px] bg-[#FFEBEB] text-[#3D3700] text-[16px] font-medium rounded-[8px]" onClick={handleCancel} >Cancel</button>
                    <button className="flex items-center justify-center px-[20px] py-[20px] w-[100px] h-[30px] bg-[#FFEBEB] text-[#3D3700] text-[16px] font-medium rounded-[8px]" onClick={handleConfirm}>Delete</button>
                </div>
            </div>
        </Backdrop>

    )
}

function CoursInfo({ data, closeClick, onDelete }) {
    const [deleteWarn, setDeleteWarn] = useState(false);




    const handleDeleteWarn = () => {
        setDeleteWarn(true)
    }
    const handleCancelWarn = () => {
        console.log("cancled")
        setDeleteWarn(false)
    }


    return (
        <div className="flex flex-col gap-[50px] w-[30%] h-[841px] bg-[#FFFDE8] py-[30px] px-[30px] overflow-auto" >
            <div className="flex justify-end">
                <button className=" text-[#3D3700] " onClick={closeClick}>
                    <FontAwesomeIcon size="2xl" icon={faXmark} />
                </button>
            </div>
            <div className="flex justify-center items-center"><img className=" w-[100px] h-[100px]" src={'http://localhost:8000' + data?.img_url} alt="" /></div>

            <div className="flex flex-col text-center gap-[10px]">
                <h1 className="text-[22px] text-[#3D3700] font-medium ">{data?.title}</h1>
                <h1 className="text-[18px] text-[#3D3700] font-medium ">{data?.level}</h1>
            </div>
            <div className="flex justify-around items-center">
                <button className="flex items-center justify-center px-[20px] py-[20px] w-[50px] h-[50px] bg-[#FCEE65] text-[#3D3700] text-[16px] font-medium rounded-[8px]  hover:bg-[#FFD24C]" >
                    <FontAwesomeIcon size="lg" icon={faListUl} />
                </button>
                <button className="flex items-center justify-center px-[20px] py-[20px] w-[50px] h-[50px] bg-[#FCEE65] text-[#3D3700] text-[16px] font-medium rounded-[8px]  hover:bg-[#FFD24C]" >
                    <FontAwesomeIcon size="lg" icon={faPenToSquare} />
                </button>
                <button onClick={handleDeleteWarn} className="flex items-center justify-center px-[20px] py-[20px] w-[50px] h-[50px] bg-[#FFB8B8] text-[#730303] text-[16px] font-medium rounded-[8px]  hover:bg-[#AD0202] hover:text-[#FFEBEB]" >
                    <FontAwesomeIcon size="lg" icon={faTrash} />
                </button>
            </div>
            <div className="flex flex-col gap-[10px]">
                <h1 className="text-[18px] text-[#3D3700] font-medium ">Description</h1>
                <p className="text-[14px] text-[#3D3700] font-medium ">{data?.description}</p>
            </div>
            <div className="flex gap-[50%] items-center">
                <div>
                    <h1 className="text-[18px] text-[#3D3700] font-medium ">Id</h1>
                    <p className="text-[14px] text-[#3D3700] font-medium ">{data?.id}</p>
                </div>
                <div>
                    <h1 className="text-[18px] text-[#3D3700] font-medium ">Degree</h1>
                    <p className="text-[14px] text-[#3D3700] font-medium ">{data?.degree}</p>
                </div>
            </div>
            <div >
                <h1 className="text-[18px] text-[#3D3700] font-medium ">Number Of Lessons</h1>
                <h1 className="text-[18px] text-[#3D3700] font-regular ">25 Lesson</h1>
            </div>
            <div >
                <h1 className="text-[18px] text-[#3D3700] font-medium ">Number Of Enrollments</h1>
                <h1 className="text-[18px] text-[#3D3700] font-regular ">19506 Enrollment</h1>
            </div>
            {deleteWarn && <DeleteDialogue e={data} cancel={handleCancelWarn} onDelete={onDelete} />}
        </div>
    )
}
