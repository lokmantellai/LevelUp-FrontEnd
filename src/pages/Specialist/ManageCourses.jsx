import { Header, SideBar, CoursInfo } from "../../components/SpecialistDashboard/Components";
import filter from '../../assets/SpecialistDashboard/filter.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faArrowDownWideShort, faFilter } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react";
import axios from 'axios'; // Import Axios
import PaginationButtons from "../../components/PaginationButtons";
import CoursesList from "../../components/SpecialistDashboard/CoursesList";




export default function ManageCourses() {


    const [isLoading, setIsLoading] = useState(false);
    const [courses, setCourses] = useState([])
    const [refresh, setRefresh] = useState(localStorage.getItem("jwt-token-refresh"))


    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [records, setRecords] = useState(0)
    const lastRecord = currentPage === totalPages ? records : currentPage * 8;
    const firstRecord = (currentPage * 8) - 7;


    const [selectedCours, setSelectedCours] = useState()



    useEffect(() => {
        const fetchCourses = async () => {
            setIsLoading(true)
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
                const response = await axiosInstance.get(`/users/courses/?page=${currentPage}`);
                if (response.status === 200) {
                    const responseData = response.data;
                    setCourses(responseData.results);
                    setTotalPages(responseData.total_pages);
                    setRecords(responseData.count)

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






    const handlePageChange = (object, page) => {
        setCurrentPage(page)
    };

    const handleCourseClick = (course) => {
        setSelectedCours(course);
    };
    const handleClose = () => {
        setSelectedCours()
    }


    return (
        <div className="flex  bg-[#FFFFFC]" >
            <SideBar />
            <div className=" flex flex-col flex-1 pb-[20] ">
                <Header />
                {isLoading ? <div className="flex text-[80px] h-[100%] justify-center py-[300px]">Loading ...</div> :
                    <div className="flex">
                        <div className=" flex flex-col h-[100%] w-[100%] justify-between px-[50px] pb-[20px]">
                            <div className="flex flex-col  pt-[50px] pb-[30px] gap-[20px]">
                                <div className="flex justify-between items-center w-[100%]">
                                    <h1 className=" text-[30px] text-[#3D3700] font-medium  ">Courses</h1>
                                    <div className="flex gap-[20px]">
                                        <button className="flex items-center justify-around px-[20px] py-[20px] w-[120px] h-[50px] bg-[#FFF8B2] text-[#3D3700] text-[16px] font-medium rounded-[8px] hover:bg-[#FCE932] ">
                                            Sort
                                            <FontAwesomeIcon size="lg" icon={faArrowDownWideShort} />                                        </button>
                                        <button className="flex items-center justify-around px-[20px] py-[20px] w-[120px] h-[50px] bg-[#FFF8B2] text-[#3D3700] text-[16px] font-medium rounded-[8px] hover:bg-[#FCE932] ">
                                            Filter
                                            <FontAwesomeIcon size="lg" icon={faFilter} />
                                        </button>
                                        <button className="flex items-center justify-center px-[20px] py-[20px] w-[50px] h-[50px] bg-[#FAE200] text-[#3D3700] text-[16px] font-medium rounded-[8px] hover:bg-[#FFD24C]">
                                            <FontAwesomeIcon size="lg" icon={faPlus} />
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
                                <CoursesList data={courses} onCourseClick={handleCourseClick} />
                            </div>
                            <div className="pagination flex justify-between items-center ">
                                <h1 className="text-[16px] text-[#3D3700]">{firstRecord} to {lastRecord} of {records}</h1>
                                <PaginationButtons totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
                            </div>
                        </div>
                        {selectedCours && <CoursInfo data={selectedCours} closeClick={handleClose} />}
                    </div>}
            </div>
        </div >

    )


}

