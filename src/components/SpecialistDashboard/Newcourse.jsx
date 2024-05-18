import { useState, useEffect } from "react"
import Step1 from './Step1';
import Step2 from './Step2';


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

export default function Newcourse() {

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ title: '', description: '', degree: '', level: '', category: '' });
    const [errors, setErrors] = useState({});
    const [courseTitles, setCourseTitles] = useState([]);

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
            } else if (courseTitles.includes(formData.title)) {
                newErrors.title = 'Course title already exists';
            } else if (formData.title.length < 5 || formData.title.length > 20) {
                newErrors.title = 'Title must be between 5 and 100 characters';
            } else if (formData.description.length < 20 || formData.description.length > 500) {
                newErrors.description = 'Description must be between 20 and 500 characters';
            }
        }
        // else if (step === 2) {}
        //     
        setErrors(newErrors);
        console.log(newErrors)
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
        // Replace with your actual API call to save the draft
        try {
            const response = await fetch('http://localhost:8000/users/courses/drafts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Draft saved successfully');
        } catch (error) {
            console.error('Error saving draft:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateStep()) {
            // Replace with your actual API call to submit the form
            try {
                const response = await fetch('http://localhost:8000/users/courses/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log('Form submitted successfully');
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        }
    };

    const renderStep = () => {
        if (step === 1) {
            return <Step1 formData={formData} setFormData={setFormData} errors={errors} />;
        }
        if (step === 2) {
            return <Step2 formData={formData} setFormData={setFormData} errors={errors} />;
        }
        return null;
    };




    const color = step == 1 ? '#0095B2' : '#E8FBFF'
    const color1 = step == 2 ? '#0095B2' : '#E8FBFF'
    const text = step == 2 ? '#E8FBFF' : '#0095B2'


    return (
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
                    <div className="flex justify-between items-center w-[100%]">
                        <button type="button" className="flex justify-center items-center w-[120px] h-[50px] rounded-[5px] text-[18px] bg-[#FFF8B2]" onClick={handleSaveDraft}>Save Draft</button>
                        <div className="flex justify-center items-center ">
                            {step > 1 && <button className="flex justify-center items-center w-[100px] h-[50px] rounded-[5px] text-[18px]" type="button" onClick={handlePreviousStep}>Previous</button>}
                            {step < 2 && <button className="flex justify-center items-center w-[100px] h-[50px] rounded-[5px] text-[18px] bg-[#FCEE65] hover:bg-[#FAE200]" onClick={handleNextStep}>Next</button>}
                            {step === 2 && <button className="flex justify-center items-center w-[100px] h-[50px] rounded-[5px] text-[18px]" type="button" onClick={handleSubmit}>Submit</button>}
                        </div>
                    </div>
                </form>
            </div>




        </div>

    )
}