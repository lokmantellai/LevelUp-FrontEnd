import {CoursInfo, UserInfo } from "../../components/SpecialistDashboard/Components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faArrowDownWideShort, faFilter } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react";
import PaginationButtons from "../../components/PaginationButtons";
import CoursesList from "../../components/SpecialistDashboard/CoursesList";
import Sort from "../../components/SpecialistDashboard/Sort";
import _ from 'lodash'
import useAxios from "../../api/useAxios";
import UsersList from "../../components/AdminDashboard/UsersList";
import { useAuth } from "../../context/hooks";




export default function ManageUsers() {


    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([])
    const [refresh, setRefresh] = useState(localStorage.getItem("jwt-token-refresh"))
    const [deleted, setDeleted] = useState(false)


    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [records, setRecords] = useState(0)
    const lastRecord = currentPage === totalPages ? records : currentPage * 8;
    const firstRecord = (currentPage * 8) - 7;
    const [selectedUser, setSelectedUser] = useState()


    const [sort, setSort] = useState('id')
    const [order, setOrder] = useState('asc')
    const [fiter, setFilter] = useState('')

    const [filterOpen, setFilterOpen] = useState(false)
    const [sortOpen, setSortOpen] = useState(false)


    const { privateAxios, baseURL } = useAxios();

    const { user } = useAuth();

    console.log("sort : ", sort, "order :", order)

    const onDelete = () => {
        setDeleted(true)
    }


    useEffect(() => {
        if (deleted) {
            setDeleted(false); // Reset the deleted state after fetching
            setSelectedUser()
        }
        fetchUsers();
    }, [refresh, currentPage, deleted, sort, order]);


    const fetchUsers = async () => {
        setIsLoading(true)
        try {
            const response = await privateAxios.get(`/users/usersList?page=${currentPage}&ordering=${_.lowerCase(sort)}&order_direction=${_.lowerCase(order)}`);
            if (response.status === 200) {
                const responseData = response.data;
                setUsers(responseData.results);
                setTotalPages(responseData.total_pages);
                setRecords(responseData.count)
            } else {
                console.error('Error fetching courses:', response.statusText);
            }
        } finally {
            // Set loading state to false regardless of success or failure
            setIsLoading(false);
        }
    };



    const handlePageChange = (object, page) => {
        setCurrentPage(page)
    };

    const handleCourseClick = (course) => {
        setSelectedUser(course);
    };
    const handleClose = () => {
        setSelectedUser()
    }


    return (
        <>
             {isLoading ? <div className="flex text-[80px] h-[100%] justify-center py-[300px]">Loading ...</div> :
                    <div className="flex">
                        <div className=" flex flex-col h-[100%] w-[100%] justify-between px-[50px] pb-[20px]">
                            <div className="flex flex-col  pt-[50px] pb-[30px] gap-[20px]">
                                <div className="flex justify-between items-center w-[100%]">
                                    <h1 className=" text-[30px] text-[#3D3700] font-medium  ">Users</h1>
                                    <div className="relative flex gap-[20px]">
                                        <button onClick={() => { setSortOpen(true) }} className="flex items-center justify-around px-[20px] py-[20px] w-[120px] h-[50px] bg-[#FFF8B2] text-[#3D3700] text-[16px] font-medium rounded-[8px] hover:bg-[#FCE932] ">
                                            Sort
                                            <FontAwesomeIcon size="lg" icon={faArrowDownWideShort} />                                        </button>
                                        <button className="flex items-center justify-around px-[20px] py-[20px] w-[120px] h-[50px] bg-[#FFF8B2] text-[#3D3700] text-[16px] font-medium rounded-[8px] hover:bg-[#FCE932] ">
                                            Filter
                                            <FontAwesomeIcon size="lg" icon={faFilter} />
                                        </button>
                                        <button className="flex items-center justify-center px-[20px] py-[20px] w-[50px] h-[50px] bg-[#FAE200] text-[#3D3700] text-[16px] font-medium rounded-[8px] hover:bg-[#FFD24C]">
                                            <FontAwesomeIcon size="lg" icon={faPlus} />
                                        </button>
                                        {sortOpen && <Sort sorted={sort} ordred={order} onSort={(e) => { setSort(e.sort), setOrder(e.order) }} handleClose={() => { setSortOpen(false) }} />}
                                    </div>
                                </div>
                                <div className="w-[100%] h-[2px] bg-[#3D3700]">
                                </div>
                                <div className="attributs">
                                    <div className=" grid grid-cols-9 gap-5">
                                        <h1 className="text-[18px] col-span-3 ps-3"> Name </h1>
                                        <h1 className="text-[18px] col-span-1"> Id </h1>
                                        <h1 className="text-[18px] col-span-3"> Email</h1>
                                        <h1 className="text-[18px] col-span-2"> Role </h1>
                                    </div>
                                </div>
                                <UsersList data={users} onCourseClick={handleCourseClick} />
                            </div>
                            <div className="pagination flex justify-between items-center ">
                                <h1 className="text-[16px] text-[#3D3700]">{firstRecord} to {lastRecord} of {records}</h1>
                                <PaginationButtons totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
                            </div>
                        </div>
                        {selectedUser && <UserInfo SelfId={user.user_id} baseURL={baseURL} data={selectedUser} closeClick={handleClose} onDelete={onDelete} />}
                    </div>}

        </>
    )


}

