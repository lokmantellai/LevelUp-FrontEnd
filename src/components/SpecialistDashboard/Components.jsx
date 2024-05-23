/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Link, useLocation, useNavigate } from "react-router-dom"
import Logo from "../../assets/Logo.png"
import NightMode from "../../assets/night-mode.svg"
import Personne from "../../assets/Vector.svg";
import Search from '../../assets/Landing/Search.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faListUl, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import Backdrop from '@mui/material/Backdrop';
import useAxios from "../../api/useAxios";
import { useAuth } from "../../context/hooks";
import Verified from "../../assets/verified(1).png"
import toast from "react-hot-toast";
import Newcourse from "./Newcourse";



export { SideBar as SideBar, Header as Header, CoursInfo as CoursInfo, UserInfo };
function SideBar() {
    const { user } = useAuth();
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
                <Link to={"/"}>
                    <li className={`relative text-center w-full py-[2rem] transition-all z-10 ${isActivePage('/') ? 'text-[#0095B2]' : 'hover:text-black group'} `}>
                        <span className="relative z-10">Dashboard</span>
                        <span className={`absolute rounded-[10px] rounded-e-none right-0 top-0 w-52 h-full bg-[#FFFFFC] opacity-0 text-[#E8FBFF] group-hover:opacity-50 transition-opacity z-0 ${isActivePage('/') ? 'opacity-100 text-[#00333D]' : ' '} `}></span>
                    </li>
                </Link>
                {user.role == "admin" &&
                    <Link to={"/users"} className="relative z-10">
                        <li className={`relative text-center w-full py-[2rem] transition-all ${isActivePage('/courses') ? 'text-[#0095B2]' : 'hover:text-black group'} `}>
                            <span className="relative z-10">Users</span>
                            <span className={`absolute rounded-[10px] rounded-e-none right-0 top-0 w-52 h-full bg-[#FFFFFC]  opacity-0 text-[#E8FBFF] group-hover:opacity-50 transition-opacity z-0 ${isActivePage('/courses') ? 'opacity-100 text-[#00333D]' : ''} `}></span>
                        </li>
                    </Link>
                }
                {user.role == "specialist" &&
                    <Link to={"/courses"} className="relative z-10">
                        <li className={`relative text-center w-full py-[2rem] transition-all ${isActivePage('/courses') ? 'text-[#0095B2]' : 'hover:text-black group'} `}>
                            <span className="relative z-10">Courses</span>
                            <span className={`absolute rounded-[10px] rounded-e-none right-0 top-0 w-52 h-full bg-[#FFFFFC]  opacity-0 text-[#E8FBFF] group-hover:opacity-50 transition-opacity z-0 ${isActivePage('/courses') ? 'opacity-100 text-[#00333D]' : ''} `}></span>
                        </li>
                    </Link>
                }
                <Link to={"/notifactions"} className="relative z-10">
                    <li className={`relative text-center w-full py-[2rem] transition-all ${isActivePage('/notifications') ? 'text-[#0095B2]' : 'hover:text-black group'} `}>
                        <span className="relative z-10">Notifactions</span>
                        <span className={`absolute rounded-[10px] rounded-e-none right-0 top-0 w-52 h-full bg-[#FFFFFC]  opacity-0 text-[#E8FBFF] group-hover:opacity-50 transition-opacity z-0 ${isActivePage('/notifications') ? 'opacity-100 text-[#00333D]' : ''} `} ></span>
                    </li>
                </Link>
                <Link to={"/setting"} className="relative z-10">
                    <li className="relative text-center w-full py-[2rem] rounded-3xl transition-all hover:text-black group">
                        <span className="relative z-10">Setting</span>
                        <span className={`absolute rounded-[10px] rounded-e-none right-0 top-0 w-52 h-full bg-[#FFFFFC] opacity-0 text-[#E8FBFF] group-hover:opacity-50 transition-opacity z-0 ${isActivePage('/setting') ? 'opacity-100 text-[#00333D]' : ''} `}></span>
                    </li>
                </Link>
            </ul >
        </div >
    )
}

function Header() {
    const { user, logout } = useAuth();
    const nav = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        // Fetch data from the backend
        axios.get('http://localhost:8000/users/courses/')
            .then(response => {
                setSuggestions(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const filteredSuggestions = suggestions.filter(suggestion =>
        suggestion.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <header className="flex justify-between flex-row shadow-lg bg-[#FFFFFC] color-[#FFFDE8] ps-36 px-28 py-6 h-[74px] border relative z-10">
            <div className="relative flex justify-between items-center py-[5px] px-[20px] bg-[#FFFDE8] w-[500px] h-[40px] rounded-[20px]">
                <img src={Search} alt="Search" className="h-[25px]" />
                <input
                    placeholder="Search For Courses. . ."
                    className="bg-[#FFFDE8] w-[400px] flex justify-center text-center focus:outline-none placeholder:text-[#453507] text-xl"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setIsDropdownOpen(e.target.value.length > 0);
                    }}
                />
                {isDropdownOpen && (
                    <ul className="absolute top-[110%] left-0 w-full bg-[#FFFDE8] border border-[#453507] rounded-md z-20">
                        {filteredSuggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                className="py-2 px-4 hover:bg-[#FAE200] cursor-pointer"
                                onClick={() => {
                                    setSearchTerm(suggestion.title);
                                    setIsDropdownOpen(false);
                                    nav(`/course/${suggestion.title.toLowerCase().replace(/\s+/g, '-')}`);
                                }}
                            >
                                {suggestion.title}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="flex gap-7">
                <button className="w-10 h-10 flex justify-center items-center bg-[#FFF0C4] rounded-full">
                    <img src={NightMode} className="w-7 h-7" alt="Night Mode" />
                </button>
                <div className="relative">
                    <button onClick={() => {
                        document.getElementById("MenuBar").classList.toggle("hidden");
                    }} className="w-10 h-10 flex justify-center items-center bg-[#FFF0C4] rounded-full">
                        <img src={Personne} className="w-7 h-7" alt="User" />
                    </button>
                    <div id="MenuBar" className="hidden flex flex-col py-2 px-4 font-normal bg-[#FFF0C4] absolute translate-y-[80%] right-0 gap-1 rounded-md">
                        <button onClick={() => { nav("/setting"); }}>Setting</button>
                        <button onClick={logout}>Logout</button>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <span className="capitalize font-medium">{user?.firstname + " " + user?.lastname}</span>
                    <span className="capitalize text-sm">{user?.role}</span>
                </div>
            </div>
        </header>
    );
}







function DeleteDialogue({ e, cancel, onDelete, url }) {

    const [showModal, setShowModal] = useState(true);
    const { privateAxios } = useAxios();

    const handleCancel = () => {
        cancel()
        setShowModal(false); // Close modal without confirmation
    };


    const handleDelete = async () => {
        const req = url || `/users/course/delete/${e.id}`;
        await toast.promise(
            privateAxios.delete(req), {
            loading: 'Loading',
            success: () => { onDelete(); return 'User Deleted!'; },
            error: 'Network Error!'
        }
        );
    };

    const handleConfirm = () => {
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

export default DeleteDialogue;




function CoursInfo({ data, closeClick, onDelete, onModify, setModifyData, setPath, setFormData }) {
    const [deleteWarn, setDeleteWarn] = useState(false);

    const handleDeleteWarn = () => {
        setDeleteWarn(true)
    }
    const handleCancelWarn = () => {
        setDeleteWarn(false)
    }

    const handleModify = () => {
        console.log('data :', data)
        setPath(`Courses / ${data?.title} Course`)
        setModifyData(data)
        onModify()
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
                <button type="button" onClick={handleModify} className="flex items-center justify-center px-[20px] py-[20px] w-[50px] h-[50px] bg-[#FCEE65] text-[#3D3700] text-[16px] font-medium rounded-[8px]  hover:bg-[#FFD24C]" >
                    <FontAwesomeIcon size="lg" icon={faPenToSquare} />
                </button>
                <button type="button" onClick={handleDeleteWarn} className="flex items-center justify-center px-[20px] py-[20px] w-[50px] h-[50px] bg-[#FFB8B8] text-[#730303] text-[16px] font-medium rounded-[8px]  hover:bg-[#AD0202] hover:text-[#FFEBEB]" >
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











function UserInfo({ data, closeClick, onDelete, baseURL, SelfId, toggleModal, setAction }) {
    const { privateAxios } = useAxios();
    const [deleteWarn, setDeleteWarn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userInfo, setUserInfo] = useState();

    const handleDeleteWarn = () => {
        setDeleteWarn(true)
    }
    const handleCancelWarn = () => {
        setDeleteWarn(false)
    }
    useEffect(() => {
        // Create a signal for aborting the Axios request
        if (data.role != "admin") {
            const abortController = new AbortController();
            const signal = abortController.signal;
            setUserInfo()
            setIsLoading(true)
            privateAxios.get(`users/profile/${data?.id}`, { signal })
                .then(res => {
                    setUserInfo(res.data)
                    setIsLoading(false)
                })
            return () => {
                abortController.abort();
            };
        } else
            setIsLoading(false)
    }, [data])
    return (
        <div className="flex flex-col gap-[21px]  w-[30%] bg-[#FFFDE8] py-[30px] px-[30px] capitalize sideBarInfo">
            <div className="flex justify-end">
                <button className=" text-[#3D3700] " onClick={closeClick}>
                    <FontAwesomeIcon size="2xl" icon={faXmark} />
                </button>
            </div>
            <div className="w-fit h-fit mx-auto relative">
                <img src={data?.img ? baseURL + data?.img : (baseURL + "/media/images/defaultPersone.png")} alt="" className="w-[160px] rounded-full mx-auto" />
                {data?.is_verified && <img src={Verified} className="verified_icon w-11 h-11 absolute bottom-0 right-3 rounded-full" />}
            </div>
            <div className="flex flex-col text-center gap-[10px]">
                <h1 className="text-[22px] text-[#3D3700] font-medium ">{data?.title}</h1>
                <h1 className="text-[18px] text-[#3D3700] font-medium ">{data?.level}</h1>
            </div>
            <div className="flex justify-around items-center">
                <Link to={`/profile/${data?.id}`} target="_blank" className="flex items-center justify-center px-[20px] py-[20px] w-[50px] h-[50px] bg-[#FCEE65] text-[#3D3700] text-[16px] font-medium rounded-[8px]  hover:bg-[#FFD24C]" >
                    <FontAwesomeIcon size="lg" icon={faListUl} />
                </Link>
                {((data.role == "admin" && data.id != SelfId) || data.role == "specialist") &&
                    <button onClick={() => {
                        setAction("edit");
                        toggleModal();
                    }} className="flex items-center justify-center px-[20px] py-[20px] w-[50px] h-[50px] bg-[#FCEE65] text-[#3D3700] text-[16px] font-medium rounded-[8px]  hover:bg-[#FFD24C]" >
                        <FontAwesomeIcon size="lg" icon={faPenToSquare} />
                    </button>
                }
                {
                    ((data.role == "admin" && data.id != SelfId) || data.role == "specialist") &&
                    <button onClick={handleDeleteWarn} className="flex items-center justify-center px-[20px] py-[20px] w-[50px] h-[50px] bg-[#FFB8B8] text-[#730303] text-[16px] font-medium rounded-[8px]  hover:bg-[#AD0202] hover:text-[#FFEBEB]" >
                        <FontAwesomeIcon size="lg" icon={faTrash} />
                    </button>
                }

            </div>
            <div className="flex gap-[40px]">
                <div className="w-[115px]">
                    <h1 className="text-[18px] text-[#3D3700] font-medium ">Full Name</h1>
                    <p className="text-[14px] text-[#3D3700] font-medium capitalize">{data?.first_name + " " + data?.last_name}</p>
                </div>
                <div >
                    <h1 className="text-[18px] text-[#3D3700] font-medium">Joined</h1>
                    <span className="text-[14px] text-[#3D3700] font-medium">{data?.date_joined?.split("T")[0]}</span>
                </div>
            </div>
            <div className="flex  items-center gap-[40px]">
                <div>
                    <h1 className="text-[18px] text-[#3D3700] font-medium w-[115px]">Id</h1>
                    <p className="text-[14px] text-[#3D3700] font-medium ">{data?.id}</p>
                </div>
                <div>
                    <h1 className="text-[18px] text-[#3D3700] font-medium ">Status</h1>
                    <p className="text-[14px] text-[#3D3700] font-medium ">{data?.is_active ? "Online" : "Offline"}</p>
                </div>
            </div>
            {
                isLoading ? <div className="h-[132px] flex justify-center items-center"> <div className="loading-circle"></div> </div>
                    :
                    <>
                        {data?.role == "student" && <StudentInfo userInfo={userInfo} />}
                        {data?.role == "teacher" && <TeacherInfo userInfo={userInfo} />}
                    </>
            }
            {deleteWarn && <DeleteDialogue e={data} cancel={handleCancelWarn} onDelete={onDelete} url={`users/user/delete/${data?.id}`} />}
        </div>
    )
}

/* 
{"University":"Constantine","Score":0,"EnrollCourse":[],"CanEdit":false,"img":"/images/defaultPersone.png"}
*/
function StudentInfo({ userInfo }) {
    return (
        <>
            <div className="flex  items-center justify-between">
                <div>
                    <h1 className="text-[18px] text-[#3D3700] font-medium">Degree</h1>
                    <p className="text-[14px] text-[#3D3700] font-medium ">{userInfo?.Degree}</p>
                </div>
                <div>
                    <h1 className="text-[18px] text-[#3D3700] font-medium ">Speciality</h1>
                    <p className="text-[14px] text-[#3D3700] font-medium ">{userInfo?.Speciality}</p>
                </div>
            </div>
            <div>
                <h1 className="text-[18px] text-[#3D3700] font-medium ">University</h1>
                <p className="text-[14px] text-[#3D3700] font-medium ">{userInfo?.University}</p>
            </div>
        </>
    )
}
function TeacherInfo({ userInfo }) {
    return (
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-[18px] text-[#3D3700] font-medium ">Courses</h1>
                <p className="text-[14px] text-[#3D3700] font-medium ">
                    {userInfo?.Courses?.map(el => el.title).join(', ')}
                </p>
            </div>
        </div>
    )
}