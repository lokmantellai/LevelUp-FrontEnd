/* eslint-disable react/prop-types */

import { faPlus, faArrowDownWideShort, faFilter } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react";
import PaginationButtons from "../../components/PaginationButtons";
import Sort from "../../components/SpecialistDashboard/Sort";
import _ from 'lodash'
import useAxios from "../../api/useAxios";
import UsersList from "../../components/AdminDashboard/UsersList";
import { useAuth } from "../../context/hooks";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserInfo } from '../../components/SpecialistDashboard/Components';
import toast, { Toaster } from 'react-hot-toast';


export default function ManageUsers() {


    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([])
    const [deleted, setDeleted] = useState(false)


    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [records, setRecords] = useState(0)
    const lastRecord = currentPage === totalPages ? records : currentPage * 8;
    const firstRecord = (currentPage * 8) - 7;
    const [selectedUser, setSelectedUser] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [action, setAction] = useState("")
    const [dataChanged, setDataChanged] = useState(true);
    const [sort, setSort] = useState('id')
    const [order, setOrder] = useState('asc')
    const [filterOpen, setFilterOpen] = useState(false)
    const [sortOpen, setSortOpen] = useState(false)
    const [addUserForm, setAddUserForm] = useState(false)
    const { privateAxios, baseURL } = useAxios();
    const { user } = useAuth();

    useEffect(() => {
        if (deleted) {
            setDeleted(false); // Reset the deleted state after fetching
            setSelectedUser()
        }
        fetchUsers();

    }, [currentPage, deleted, sort, order, dataChanged]);


    const fetchUsers = async () => {
        setIsLoading(true)
        try {
            const response = await privateAxios.get(`/users/usersList?page=${currentPage}&ordering=${_.lowerCase(sort)}&order_direction=${_.lowerCase(order)}`);
            if (response.status === 200) {
                const responseData = response.data;
                console.log(responseData)
                setUsers(responseData.results);
                setTotalPages(responseData.total_pages);
                setRecords(responseData.count)
                setIsLoading(false);
            }
        }
         catch {
            setIsLoading(false);
         }
    };

    const handlePageChange = (object, page) => {
        setCurrentPage(page)
    };

    const handleCourseClick = (course) => {
        setSelectedUser(users.filter((el)=> {return el.id == course.id})[0]);
    };
    const handleClose = () => {
        setSelectedUser()
    }
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    const onDelete = () => {
        setDeleted(true);
        setDataChanged(!dataChanged);
    }
    return (
        <>
            <Toaster />
            { 
                <div className="flex">
                    {isModalOpen && <FormAddUser toggleModal={toggleModal} action={action} userInfo={selectedUser} setDataChanged={setDataChanged}  dataChanged={dataChanged}/>}
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
                                    <button className="flex items-center justify-center px-[20px] py-[20px] w-[50px] h-[50px] bg-[#FAE200] text-[#3D3700] text-[16px] font-medium rounded-[8px] hover:bg-[#FFD24C]"
                                        onClick={() => {
                                            setIsModalOpen(true)
                                            setAction("add")
                                        }}
                                    >
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
                            {isLoading ? <div className="h-[390px] flex justify-center items-center"> <div className="loading-circle w-[60px] h-[60px] border-5"></div> </div> : <UsersList data={users} onCourseClick={handleCourseClick} /> }
                            </div>
                            <div className="pagination flex justify-between items-center ">
                                <h1 className="text-[16px] text-[#3D3700]">{firstRecord} to {lastRecord} of {records}</h1>
                                <PaginationButtons totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
                            </div>
                        </div>
                        {(selectedUser && !isLoading) && <UserInfo toggleModal={toggleModal} setAction={setAction} SelfId={user.user_id} baseURL={baseURL} data={selectedUser} closeClick={handleClose} onDelete={onDelete} />}
                    </div>}
        </>
    )


}

function FormAddUser({ toggleModal, userInfo, action, setDataChanged,dataChanged }) {
    if (action == "add")
        userInfo = null
    const { privateAxios } = useAxios();
    const [formData, setFormData] = useState({
        first_name: userInfo?.first_name || '',
        last_name: userInfo?.last_name || '',
        email: userInfo?.email || '',
        password: '', 
        confirmPassword: '',
        role: userInfo?.role ? userInfo.role.charAt(0).toUpperCase() + userInfo.role.slice(1) : 'Type',
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [errors, setErrors] = useState({});

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            setFormData({
                ...formData,
                ["img"]: file,
            })
            reader.readAsDataURL(file);
        }
    }
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate form data
        const validationErrors = {};
        if (!formData.first_name.trim()) {
            validationErrors.first_name = 'First name is required';
        }
        if (!formData.last_name.trim()) {
            validationErrors.last_name = 'Last name is required';
        }
        if (!formData.email.trim()) {
            validationErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validationErrors.email = 'Invalid email format';
        }
        if (formData.password.length < 7 && formData.password.length > 0)
            validationErrors.password = 'Password must be at least 8 char'; 
        if (!formData.password.trim() && action === "add") {
            validationErrors.password = 'Password is required';
        }         
        if (formData.password !== formData.confirmPassword) {
            validationErrors.confirmPassword = 'Passwords do not match';
        }
        if (formData.role === 'Type') {
            validationErrors.role = 'Please select a role';
        }
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            try {
                const formDataToSubmit = new FormData();
                for (const field in { ...formData }) 
                    formDataToSubmit.append(field, formData[field])
                if (formDataToSubmit.get("password") == "") {
                    formDataToSubmit.delete("password")
                    formDataToSubmit.delete("confirmPassword")
                }
                console.log(formDataToSubmit)
                // Submit form data to backend endpoint
                let response;
                if (action == "add")
                    response = privateAxios.post(`users/register/${formData.role.toLowerCase()}/`, formDataToSubmit);
                else if (action == "edit")
                    response = privateAxios.put(`users/modify/${userInfo?.id}/`, formDataToSubmit);
                await toast.promise(
                    response, {
                        loading: 'Loading',
                        success: () => {
                            if (action === 'add') {
                                return 'User successfully created!';
                            } else if (action === 'edit') {
                                return 'User details successfully updated!';
                            }
                            return 'Operation completed successfully!';
                        },
                        error: (err) => {
                            if (err?.response?.data?.email) {
                                return 'Email already in use';
                            }
                            return 'Network error';
                        }
                    }
                );
                // Reset form and close modal
                setFormData({
                    first_name: '',
                    last_name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    role: 'Type',
                });
                setImagePreview(null);
                toggleModal();
                setDataChanged(!dataChanged);
            } catch (error) {
            /*  if (error?.response?.data?.email) {
                } */
                // Handle error response
            }
        }
    };

        return (
            <div className="overflow-y-auto overflow-x-hidden flex fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full bg-gray-800 bg-opacity-50">
                <div className="relative p-4 w-full max-w-[40rem] max-h-full">
                    <div className="relative bg-white rounded-lg shadow ">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t " >
                            <h3 className="text-lg font-semibold text-gray-900 " >
                                {action === "add" ? "Create New User" : "Modify User"}
                            </h3>
                            <button onClick={toggleModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-base w-8 h-8 ms-auto inline-flex justify-center items-center :hover:bg-gray-600 ">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">dark
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-4 md:p-5">
                            <div className="grid gap-3 mb-4 grid-cols-4">
                                <div className="col-span-2">
                                    <label htmlFor="first_name" className="block mb-2 text-base font-medium text-gray-900 ">First Name</label>
                                    <input  value={formData.first_name} onChange={handleChange} name="first_name" type="text"  id="first_name" className=" bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg   block w-full p-2.5 focus-within:outline-none" required="" />
                                    {errors.first_name && <span className="text-red-500 text-sm">{errors.first_name}</span>}
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="last_name" className="block mb-2 text-base font-medium text-gray-900 ">Last Name</label>
                                    <input  value={formData.last_name} onChange={handleChange} type="text" name="last_name" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg   block w-full p-2.5 focus-within:outline-none" required="" />
                                    {errors.last_name && <span className="text-red-500 text-sm">{errors.last_name}</span>}
                                </div>
                                <div className="col-span-4">
                                    <label htmlFor="email" className="block mb-2 text-base font-medium text-gray-900 ">Email</label>
                                    <input  value={formData.email} on onChange={handleChange} type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg   block w-full p-2.5 focus-within:outline-none" required="" />
                                    {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                                </div>
                                <div className="col-span-4">
                                    <label htmlFor="password" className="block mb-2 text-base font-medium text-gray-900 ">Password</label>
                                    <input value={formData.password} onChange={handleChange} type="password" name="password" id="password" placeholder="**********" className=" bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg   block w-full p-2.5 focus-within:outline-none" required="" />
                                    {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                                </div>
                                <div className="col-span-4">
                                    <label htmlFor="confirmPassword" className="block mb-2 text-base font-medium text-gray-900 ">Confirm Password</label>
                                    <input value={formData.confirmPassword} onChange={handleChange} type="password" name="confirmPassword" id="confirmPassword" placeholder="**********" className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg   block w-full p-2.5 focus-within:outline-none" required="" />
                                    {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword}</span>}
                                </div>
                                <div className="col-span-3 sm:col-span-2">
                                    <label htmlFor="category" className="block mb-2 text-base font-medium text-gray-900 ">Account Type</label>
                                    <DropdownButton disabled={["student", "teacher"].includes(userInfo?.role)} id="dropdown-basic-button" title={formData.role} >
                                        <Dropdown.Item onClick={(ev) => {
                                            ev.preventDefault();
                                            setFormData({
                                                ...formData,
                                                ["role"]: "Admin",
                                            });
                                        }}>Admin</Dropdown.Item>
                                        <Dropdown.Item  onClick={(ev) => {
                                            ev.preventDefault();
                                            setFormData({
                                                ...formData,
                                                ["role"]: "Specialist",
                                            });
                                        }}>Specialist</Dropdown.Item>
                                    </DropdownButton>
                                    {errors.role && <span className="text-red-500 text-sm">{errors.role}</span>}
                                </div>
                                <div className="col-span-3 sm:col-span-4 my-2 flex items-center gap-10">
                                    <div>
                                        <input
                                            id="files"
                                            type="file"
                                            className='hidden'
                                            onChange={handleFileChange}
                                            accept="image/*" // accept only image files
                                        />
                                        <label htmlFor="files" className="inline-flex items-center bg-[#FCEE65] hover:bg-[#FCE932] text-[#3D3700] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-4 py-2.5 text-center cursor-pointer">Upload </label>
                                    </div>
                                    {imagePreview ? (
                                        <div className="">
                                            <img src={imagePreview} alt="Preview" className="w-14 h-14 rounded-full" />
                                        </div>)
                                        : <span>No image selected for profile</span>
                                    }
                                </div>
                            </div>
                            <button type="submit" className="inline-flex items-center bg-[#FCEE65] hover:bg-[#FCE932] text-[#3D3700] focus:ring-4 focus:outline-none  font-medium rounded-lg text-base px-5 py-2.5 text-center">
                                Save
                            </button>
                            <button type='button' onClick={() => {
                                 // Reset form and close modal
                                    setFormData({
                                        first_name: '',
                                        last_name: '',
                                        email: '',
                                        password: '',
                                        confirmPassword: '',
                                        role: 'Type',
                                    });
                                    setImagePreview(null);
                                    toggleModal();
                            }} className="text-black inline-flex items-center bg-[#f5f5f5] hover:bg-gray-2 00 focus:ring-4 focus:outline-none  font-medium rounded-lg text-base px-4 py-2.5 text-center ml-3">
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    
}