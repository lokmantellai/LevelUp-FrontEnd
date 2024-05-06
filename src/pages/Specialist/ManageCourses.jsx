import { Header, SlideBar } from "../../components/SpecialistDashboard/Components";
import sort from '../../assets/SpecialistDashboard/sort.svg'
import filter from '../../assets/SpecialistDashboard/filter.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Cours from "../../components/SpecialistDashboard/Cours";
import { useState, useEffect } from "react";
import axios from 'axios'; // Import Axios




export default function ManageCourses() {


    const [isLoading, setIsLoading] = useState(true);
    const [courses, setCourses] = useState([])
    const [refresh, setRefresh] = useState(localStorage.getItem("jwt-token-refresh"))
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const token = localStorage.getItem('jwt-token-access');
                if (!token) {
                    // Handle case when token is missing
                    return;
                }
                const axiosInstance = axios.create({
                    baseURL: 'http://192.168.205.126:8000',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const response = await axiosInstance.get('/users/courses');
                if (response.status === 200) {
                    setCourses(response.data);
                    setTotalPages(response.data.total_pages);
                } else {
                    console.error('Error fetching courses:', response.statusText);
                }
            } catch (error) {
                if (error.message === "Request failed with status code 401") {
                    axios.post('http://192.168.205.126:8000/users/api/token/refresh/', {
                        refresh: localStorage.getItem("jwt-token-refresh")
                    })
                        .then(res => {
                            localStorage.setItem('jwt-token-access', res.data.access);
                            setRefresh(res.data.access);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            } finally {
                // Set loading state to false regardless of success or failure
                setIsLoading(false);
            }
        };

        fetchCourses();
    }, [refresh, currentPage]);


    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (isLoading) {
        return <div>Loading ..</div>;
    }



    return (
        <div className="flex  bg-[#FFFFFC]" >
            <SlideBar />
            <div className="flex flex-col flex-1">
                <Header />
                <div className="flex flex-col h-[100%] w-[100%]">
                    <div className="flex flex-col px-[50px] py-[50px] gap-[20px]">
                        <div className="flex justify-between items-center w-[100%]">
                            <h1 className=" text-[22px] text-[#3D3700] font-medium  ">Courses</h1>
                            <div className="flex gap-[20px]">
                                <button className="flex items-center justify-around px-[20px] py-[20px] w-[120px] h-[50px] bg-[#FFF8B2] text-[#3D3700] text-[16px] font-medium rounded-[8px] hover:bg-[#FCE932] ">
                                    Sort
                                    <img src={sort} alt="" className="w-[20px]" />
                                </button>
                                <button className="flex items-center justify-around px-[20px] py-[20px] w-[120px] h-[50px] bg-[#FFF8B2] text-[#3D3700] text-[16px] font-medium rounded-[8px] hover:bg-[#FCE932] ">
                                    Filter
                                    <img src={filter} alt="" className="w-[20px]" />
                                </button>
                                <button className="flex items-center justify-around px-[20px] py-[20px] w-[50px] h-[50px] bg-[#FAE200] text-[#3D3700] text-[16px] font-medium rounded-[8px] hover:bg-[#FFD24C]">
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div>
                        </div>
                        <div className="w-[100%] h-[2px] bg-[#3D3700]">
                        </div>
                        <div className="attributs">
                            <div className=" grid grid-cols-9 gap-5">
                                <h1 className="text-[18px] col-span-3"> Title </h1>
                                <h1 className="text-[18px] col-span-2"> Id </h1>
                                <h1 className="text-[18px] col-span-2"> Degree </h1>
                                <h1 className="text-[18px] col-span-2"> Level </h1>
                            </div>
                        </div>
                        <div className="courses ">
                            {courses.map((e, index) =>
                                <Cours data={e} index={index} />
                            )
                            }
                        </div>
                    </div>
                    <div>
                        <div>

                        </div>

                    </div>

                </div>


            </div>
        </div>

    )


}

