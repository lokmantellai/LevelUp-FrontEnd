import { useState, useEffect, useContext, createContext } from "react"
import Step1 from './Step1';
import Step2 from './Step2';
import toast, { Toaster } from 'react-hot-toast';
import useAxios from "../../api/useAxios";
import _ from 'lodash'
import { GlobalContext } from '../../pages/Specialist/ManageCourses';
import Backdrop from '@mui/material/Backdrop';







const fetchCourseTitles = async () => {
    try {
        const response = await fetch('http://localhost:8000/users/courses/');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.map(course => course.title); // Assuming the response is an array of course objects with a title property
    } catch (error) {
        console.error('Error fetching course titles:', error);
        return [];
    }
};




export default function Newcourse({ data }) {


    const {
        formData,
        setFormData,
        lastForm,
        setLastForm,
        xclicked,
        setXclicked,
        setPath,
        setNewCourseOpen
    } = useContext(GlobalContext)







    const { privateAxios } = useAxios();



    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState({});
    const [courseTitles, setCourseTitles] = useState([]);
    const [editMode, setEditMode] = useState(false)
    const [imagePreview, setImagePreview] = useState(null)

    const [allLessons, setAllLessons] = useState([...formData.lessons])
    const [showModal, setShowModal] = useState(true);

    useEffect(() => {
        const getCourseTitles = async () => {
            const titles = await fetchCourseTitles();
            setCourseTitles(titles);
        };
        getCourseTitles();
    }, []);




    const validateStep = () => {
        const newErrors = {};
        if (step === 1) {
            if (!formData.title) {
                newErrors.title = 'Course title is required';
                toast.error('Course title is required', {
                    position: "bottom-center"
                })
            } else if (courseTitles.includes(formData.title)) {
                newErrors.title = 'Course title already exists';
                toast.error(newErrors.title, {
                    position: "bottom-center"
                })
            } else if (formData.title.length < 5 || formData.title.length > 20) {
                newErrors.title = 'Title must be between 5 and 100 characters';
                toast.error(newErrors.title, {
                    position: "bottom-center"
                })
            } else if (formData.description.length < 20 || formData.description.length > 500) {
                newErrors.description = 'Description must be between 20 and 500 characters';
                toast.error(newErrors.description, {
                    position: "bottom-center"
                })
            }
        }
        // else if (step === 2) {}
        //     
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleNextStep = (e) => {
        e.preventDefault();
        if (validateStep()) {
            setStep(step + 1);
        }
    };

    const handlePreviousStep = () => {

        setStep(step - 1);
    };

    const handleSaveDraft = async () => {
        if (validateStep()) {
            setFormData({
                ...formData,
                ["is_draft"]: true
            })
            const form = new FormData();
            for (const key in formData) {
                form.append(key, formData[key]);
            }
            if (form.get("img_url") === "null") {
                form.delete("img_url")
            }
            try {
                // Assuming the backend expects the formData in a specific format
                const response = await privateAxios.post('http://localhost:8000/users/courses/create/', form);
                toast.success('Draft saved successfully!');
            } catch (error) {
                toast.error('Failed to save draft. Please try again.');
            }
            setLastForm(formData)

        }
    };

    const handleSubmit = async () => {
        const course = {
            ...formData,
            ['lessons']: allLessons
        }
        const form = new FormData();
        for (const key in formData) {
            form.append(key, formData[key]);
        }





        if (form.get("img_url") === "null") {
            form.delete("img_url")
        }
        if (validateStep()) {
            // Replace with your actual API call to submit the form
            try {
                const response = await privateAxios.post('http://localhost:8000/users/courses/create/', form);
                toast.success("Course Created Successfully !")
            } catch (error) {
                toast.error("error")
            }
        }
        setShowModal(false)
        setNewCourseOpen(false)
        setXclicked(false);
    };



    const renderStep = () => {
        if (step === 1) {
            return <Step1 imagePreview={imagePreview} setImagePreview={setImagePreview} />;
        }
        if (step === 2) {
            return <Step2 isEdit={editMode} setIsEdit={setEditMode} allLessons={allLessons} setAllLessons={setAllLessons} />;
        }
        return null;
    };

    console.log('from Outside : ', formData)

    const handleCancel = () => {
        setXclicked(false)
    }

    const handleSave = () => {
        handleSaveDraft();
        setShowModal(false);
        setPath('Courses');
        setNewCourseOpen(false)
        setXclicked(false);
    }


    const handleXclick = () => {





        console.log('formData : ', formData)
        console.log('lastData : ', lastForm)
        console.log('Are they Equal : ', _.isEqual(formData, lastForm))
        if (_.isEqual(formData, lastForm)) {
            console.log('same')
            setPath('Courses')
            setNewCourseOpen(false)
            setFormData({ title: '', img_url: null, description: '', degree: '', level: '', is_draft: false, lessons: [] })
            setLastForm({ title: '', img_url: null, description: '', degree: '', level: '', is_draft: false, lessons: [] })
            setXclicked(false)
        }

        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={showModal}
                onClick={() => { setShowModal(false) }}>
                <div className={`fixed top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between items-center w-[500px] h-[200px] py-[40px] px-[40px] bg-[#FFFFFC] text-center rounded-2xl [box-shadow:0px_0px_10px_rgba(0,_0,_0,_0.3)] `}>  <h1 className="text-[#3D3700] text-[16px] font-medium"> You have unsaved changes. Are you sure you want to leave this page without saving? Any changes you made will be lost.</h1>
                    <div className="flex w-[250px] justify-between items-center">
                        <button className="flex items-center justify-center px-[20px] py-[20px] w-[100px] h-[30px] bg-[#FFEBEB] text-[#3D3700] text-[16px] font-medium rounded-[8px]" onClick={handleCancel} >Cancel</button>
                        <button className="flex items-center justify-center px-[20px] py-[20px] w-[100px] h-[30px] bg-[#FFEBEB] text-[#3D3700] text-[16px] font-medium rounded-[8px]" onClick={handleSave}>Save</button>
                    </div>
                </div>
            </Backdrop>)

    }



    const color = '#0095B2'
    const color1 = step == 2 ? '#0095B2' : '#E8FBFF'
    const text = step == 2 ? '#E8FBFF' : '#0095B2'


    return (
        <>
            <Toaster />
            <div>
                <div className="Stepper flex flex-col  w-[100%]justify-center items-center gap-[20px] ">
                    <div className="flex justify-between items-center w-[70%]">
                        <div className="flex w-[50px] h-[50px] rounded-[50px] justify-center text-[#E8FBFF] text-[26px] items-center" style={{ backgroundColor: color }}>1</div>
                        <h1 className="text-[#0095B2] text-[28px]">Course setup</h1>
                        <div className="w-[300px] h-[4px]  rounded-[50px] " style={{ backgroundColor: color1 }}></div>
                        <div className="flex w-[50px] h-[50px] rounded-[50px] justify-center text-[#0095B2] text-[26px] items-center" style={{ backgroundColor: color1, color: text }}>2</div>
                        <h1 className="text-[#0095B2] text-[28px]">Course content</h1>
                    </div>


                    <form className="flex flex-col justify-between items-center bg-[#FFFDE8] w-[100%] h-[100%] rounded-[10px] px-[30px] py-[30px] gap-[30px]">

                        {renderStep()}
                        {xclicked && handleXclick()}
                        {!editMode &&
                            <div className="flex justify-between items-center w-[100%]">
                                <button type="button" className="flex justify-center items-center w-[120px] h-[50px] rounded-[5px] text-[18px] bg-[#FFF8B2] hover:bg-[#FCEE65] " onClick={handleSaveDraft}>Save Draft</button>
                                <div className="flex justify-center items-center gap-[30px]">
                                    {step > 1 && <button className="flex justify-center items-center w-[100px] h-[50px] rounded-[5px] text-[18px] bg-[#FFF8B2] hover:bg-[#FCEE65] " type="button" onClick={handlePreviousStep}>Previous</button>}
                                    {step < 2 && <button className="flex justify-center items-center w-[100px] h-[50px] rounded-[5px] text-[18px] bg-[#FCEE65] hover:bg-[#FAE200]" onClick={handleNextStep}>Next</button>}
                                    {step === 2 && <button className="flex justify-center items-center w-[100px] h-[50px] rounded-[5px] text-[18px]  bg-[#FCEE65] hover:bg-[#FAE200]" type="button" onClick={handleSubmit}>Submit</button>}
                                </div>
                            </div>
                        }
                    </form>
                </div>
            </div>
        </>
    )
}