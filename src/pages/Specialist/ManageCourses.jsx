import { CoursInfo } from "../../components/SpecialistDashboard/Components";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faArrowDownWideShort, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, useRef, createContext } from "react";
import PaginationButtons from "../../components/PaginationButtons";
import CoursesList from "../../components/SpecialistDashboard/CoursesList";
import Sort from "../../components/SpecialistDashboard/Sort";

import _ from 'lodash'
import useAxios from "../../api/useAxios";
import Newcourse from "../../components/SpecialistDashboard/Newcourse";
import toast, { Toaster } from "react-hot-toast";



export const GlobalContext = createContext();

export default function ManageCourses() {

    const componentRef = useRef();

    const [path, setPath] = useState('Courses')
    const [formData, setFormData] = useState({ title: '', img_url: null, description: '', degree: '', level: '', is_draft: false, lessons: [] });
    const [lastForm, setLastForm] = useState({ title: '', img_url: null, description: '', degree: '', level: '', is_draft: false, lessons: [] })
    const [xclicked, setXclicked] = useState(false)
    const [newCourseOpen, setNewCourseOpen] = useState(false)


    const [isSaved, setIsSaved] = useState()

    const [isLoading, setIsLoading] = useState(false);
    const [courses, setCourses] = useState([])
    const [refresh, setRefresh] = useState(localStorage.getItem("jwt-token-refresh"))
    const [deleted, setDeleted] = useState(false)


    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [records, setRecords] = useState(0)
    const lastRecord = currentPage === totalPages ? records : currentPage * 8;
    const firstRecord = (currentPage * 8) - 7;
    const [selectedCours, setSelectedCours] = useState()


    const [sort, setSort] = useState('id')
    const [order, setOrder] = useState('asc')
    const [level, setLevel] = useState('')
    const [degree, setDegree] = useState('')
    const [sortOpen, setSortOpen] = useState(false)

    const [modifyData, setModifyData] = useState()


    const newCourse = {
        formData,
        setFormData,
        lastForm,
        setLastForm,
        xclicked,
        setXclicked,
        setPath,
        setNewCourseOpen
    }







    const { privateAxios } = useAxios();







    const onDelete = () => {
        setDeleted(true)
    }


    useEffect(() => {
        if (deleted) {
            setDeleted(false); // Reset the deleted state after fetching
            setSelectedCours()
        }
        fetchCourses();
        //return () => instance.destroy();
    }, [refresh, currentPage, deleted, sort, order, level, degree]);



    const fetchCourses = async () => {
        setIsLoading(true)
        try {
            const response = await privateAxios.get(`/users/courses/?page=${currentPage}&degree=${degree}&level=${level}&ordering=${_.lowerCase(sort)}&order_direction=${_.lowerCase(order)}`);
            if (response.status === 200) {
                const responseData = response.data;
                setCourses(responseData.results);
                setTotalPages(responseData.total_pages);
                setRecords(responseData.count)
                setSortOpen(false)
            } else {
                console.error('Error fetching courses:', response.statusText);
            }
        } finally {
            // Set loading state to false regardless of success or failure
            setIsLoading(false);
        }
    };

    console.log("Xclicked : ", xclicked)


    const handlePageChange = (object, page) => {
        setCurrentPage(page)
    };

    const handleCourseClick = (course) => {
        setSelectedCours(course);
    };
    const handleClose = () => {
        setSelectedCours()
    }

    const handleModify = () => {
        setNewCourseOpen(true)
    }





    return (

        <>
            <Toaster />
            <GlobalContext.Provider value={newCourse}>
                <div className="flex  bg-[#FFFFFC] h-[100%]" >
                    <div className=" flex flex-col flex-1 pb-[20] ">
                        {isLoading ? <div className="flex text-[80px] h-[100%] justify-center py-[300px]"><div className="loading"></div></div> :
                            <div className="flex h-full">
                                <div className=" flex flex-col h-[100%] w-[100%] justify-between  px-[50px] pb-[20px]">
                                    <div className="flex flex-col  pt-[50px] pb-[30px] gap-[20px]">
                                        <div className="flex justify-between items-center w-[100%]">
                                            <h1 className="flex justify-center items-center text-[30px] text-[#3D3700] font-medium h-[50px] ">{path}</h1>
                                            {newCourseOpen &&
                                                <div onClick={() => { setXclicked(true); setFormData({ title: '', img_url: null, description: '', degree: '', level: '', is_draft: false, lessons: [] }) }} className="px-[10px]">
                                                    <FontAwesomeIcon size="2xl" icon={faXmark} />
                                                </div>}
                                            {!newCourseOpen &&
                                                <div className="relative flex gap-[20px]">
                                                    <button onClick={() => { setSortOpen(!sortOpen) }} className="flex items-center justify-around px-[20px] py-[20px] w-[200px] h-[50px] bg-[#FFF8B2] text-[#3D3700] text-[16px] font-medium rounded-[8px] hover:bg-[#FCE932] ">
                                                        Sort & Filter
                                                        <FontAwesomeIcon size="lg" icon={faArrowDownWideShort} />
                                                    </button>
                                                    <button onClick={() => { setNewCourseOpen(true), setPath(path + ' / Add Course') }} className="flex items-center justify-center px-[20px] py-[20px] w-[50px] h-[50px] bg-[#FAE200] text-[#3D3700] text-[16px] font-medium rounded-[8px] hover:bg-[#FFD24C]">
                                                        <FontAwesomeIcon size="lg" icon={faPlus} />
                                                    </button>
                                                    {sortOpen && <Sort className="ease-in opacity-0 transition-opacity duration-500" onOutsideClick={() => { setSortOpen(!sortOpen) }} sorted={sort} leveled={level} degreed={degree} ordred={order} onSort={(e) => { setSort(e.sort), setOrder(e.order), setLevel(e.level), setDegree(e.degree) }} handleClose={() => { setSortOpen(false) }} />}
                                                </div>
                                            }
                                        </div>
                                        <div className="w-[100%] h-[2px] bg-[#3D3700]">
                                        </div>
                                        {!newCourseOpen ?
                                            <>
                                                <div className="attributs">
                                                    <div className=" grid grid-cols-9 gap-5">
                                                        <h1 className="text-[18px] col-span-3"> Title </h1>
                                                        <h1 className="text-[18px] col-span-2"> Id </h1>
                                                        <h1 className="text-[18px] col-span-2"> Degree </h1>
                                                        <h1 className="text-[18px] col-span-2"> Level </h1>
                                                    </div>
                                                </div>
                                                <CoursesList data={courses} onCourseClick={handleCourseClick} />
                                            </> :

                                            <Newcourse data={modifyData} />

                                        }
                                    </div>
                                    {!newCourseOpen &&
                                        <div className="pagination flex justify-between items-center ">
                                            <h1 className="text-[16px] text-[#3D3700]">{firstRecord} to {lastRecord} of {records}</h1>
                                            <PaginationButtons totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
                                        </div>
                                    }
                                </div>
                                {selectedCours && !newCourseOpen && <CoursInfo data={selectedCours} closeClick={handleClose} onDelete={onDelete} onModify={handleModify} setModifyData={setModifyData} setPath={setPath} setFormData={setFormData} />}
                            </div>}
                    </div>
                </div >
            </GlobalContext.Provider>
        </>

    )





}