
import add from '../../assets/SpecialistDashboard/addimage.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useState, useRef } from 'react'

export default function Step1({ formData, setFormData, errors }) {


    const levelRef = useRef(null);
    const degreeRef = useRef(null)
    const categoryRef = useRef(null)

    const [degree, setDegree] = useState('')
    const [level, setLevel] = useState('')
    const [category, setCategory] = useState('')

    const [selectedImage, setSelectedImage] = useState(add)

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            setFormData({
                ...formData,
                ['img']: file,
            })
            reader.readAsDataURL(file);
            console.log('hi from if')

        }
        console.log('hi')

    };


    console.log(selectedImage)

    const handleLevel = (e) => {
        setLevel(e)
        console.log('from handle level')
        if (levelRef.current) {
            if (levelRef.current.style.display === 'none') {
                levelRef.current.style.display = 'flex';
            } else {
                levelRef.current.style.display = 'none';
            }
        }
    }

    const handleDegree = (e) => {
        setDegree(e)
        console.log('from handle degree')
        if (degreeRef.current) {
            if (degreeRef.current.style.display === 'none') {
                degreeRef.current.style.display = 'flex';
            } else {
                degreeRef.current.style.display = 'none';
            }
        }
    }

    const handleCategory = (e) => {
        setCategory(e)
        console.log('from handle category')
        if (degreeRef.current) {
            if (categoryRef.current.style.display === 'none') {
                categoryRef.current.style.display = 'flex';
            } else {
                categoryRef.current.style.display = 'none';
            }
        }

    }


    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            'level': level,
            'degree': degree,
            'category': category,
            [name]: value
        });
    }

    return (
        <div className="flex flex-col w-[100%] gap-[20px]">
            <div className="flex justify-between items-center gap-[30px]">
                <input name='title' type="text" className="w-[91.6%] h-[100px] bg-[#FFFFFC] rounded-[10px] px-[50px] py-[20px] text-[28px] text-[#453507]" placeholder="Course Title ..." value={formData.title} onChange={handleChange} />
                <label htmlFor='picChooser' className="flex justify-center items-center h-[100px] w-[100px] bg-[#FFFFFC] rounded-[10px] ">
                    <input id='picChooser' accept="image/*" type="file" className='hidden' onClick={handleImageChange} />
                    {selectedImage && <img src={selectedImage} alt="" />}
                </label>

            </div>
            <div>
                <label >
                    <h1 className='text-[22px] text-[#3D3700]'>* Description</h1>
                    <textarea name='description' className='w-[100%] h-[150px] resize-none rounded-[10px] bg-[#FFFFFC] text-[18px] px-[20px] py-[20px]' placeholder='Description ...' value={formData.description} onChange={handleChange}></textarea>
                </label>
            </div>
            <div className='flex justify-between items-start w-[100%] '>

                {/* Degree Label  */}

                <label className='w-[31.5%]'>
                    <h1 className='text-[22px] text-[#3D3700]'>* Degree</h1>
                    <div type='button' className={`bg-[#FFFFFC] flex justify-between items-center h-[70px] w-[100%] py-[10px] px-[10px]  rounded-[10px] border`} onClick={() => {
                        console.log('from  degree button')
                        if (degreeRef.current) {
                            if (degreeRef.current.style.display === 'none') {
                                degreeRef.current.style.display = 'flex';
                            } else {
                                degreeRef.current.style.display = 'none';
                            }
                        }
                    }} >{degree} <FontAwesomeIcon icon={faChevronDown} /></div>
                    <div ref={degreeRef} className=' flex flex-col bg-[#FFFFFC] w-[100%] h-[100%] justify-between hidden'>
                        <button type='button' className=' px-[10px] py-[10px] hover:bg-[#FFF8B2] hidden' onClick={() => { document.getElementById("dropDown").classList.toggle("hidden"); }}>Beginner</button>
                        <button type='button' className=' px-[10px] py-[10px] hover:bg-[#FFF8B2]' onClick={() => { handleDegree('Bachelor 1st'); }}>Bachelor 1st</button>
                        <button type='button' className=' px-[10px] py-[10px] hover:bg-[#FFF8B2]' onClick={() => { handleDegree('Bachelor 2nd'); }}>Bachelor 2nd</button>
                        <button type='button' className=' px-[10px] py-[10px] hover:bg-[#FFF8B2]' onClick={() => { handleDegree('Bachelor 3rd'); }}>Bachelor 3rd</button>
                    </div>
                </label>


                {/* Level Label  */}
                <label className='w-[31.5%]'>
                    <h1 className='text-[22px] text-[#3D3700]'>* Level</h1>
                    <div type='button' className={`bg-[#FFFFFC] flex justify-between items-center h-[70px] w-[100%] py-[10px] px-[10px]  rounded-[10px] border`} onClick={() => {
                        console.log('from  level button')
                        if (levelRef.current) {
                            if (levelRef.current.style.display === 'none') {
                                levelRef.current.style.display = 'flex';
                            } else {
                                levelRef.current.style.display = 'none';
                            }
                        }
                    }} >{level} <FontAwesomeIcon icon={faChevronDown} /></div>
                    <div ref={levelRef} id='dropDown' className=' flex flex-col bg-[#FFFFFC] w-[100%] h-[100%] justify-between hidden'>
                        <button type='button' className=' px-[10px] py-[10px] hover:bg-[#FFF8B2] hidden' onClick={() => { document.getElementById("dropDown").classList.toggle("hidden"); }}>Beginner</button>
                        <button type='button' className=' px-[10px] py-[10px] hover:bg-[#FFF8B2]' onClick={() => { handleLevel('Beginner'); }}>Beginner</button>
                        <button type='button' className=' px-[10px] py-[10px] hover:bg-[#FFF8B2]' onClick={() => { handleLevel('Intermidiate'); console.log('from button') }}>Intermidiate</button>
                        <button type='button' className=' px-[10px] py-[10px] hover:bg-[#FFF8B2]' onClick={() => { handleLevel('Advanced'); console.log('from button') }}>Advanced</button>
                    </div>
                </label>


                {/* Category Label  */}


                <label className='w-[31.5%]'>
                    <h1 className='text-[22px] text-[#3D3700]'>* Category</h1>
                    <div type='button' className={`bg-[#FFFFFC] flex justify-between items-center h-[70px] w-[100%] py-[10px] px-[10px]  rounded-[10px] border`} onClick={() => {
                        console.log('from  category button')
                        if (categoryRef.current) {
                            if (categoryRef.current.style.display === 'none') {
                                categoryRef.current.style.display = 'flex';
                            } else {
                                categoryRef.current.style.display = 'none';
                            }
                        }
                    }} >{category} <FontAwesomeIcon icon={faChevronDown} /></div>
                    <div ref={categoryRef} id='dropDown' className=' flex flex-col bg-[#FFFFFC] w-[100%] h-[100%] justify-between hidden'>
                        <button type='button' className=' px-[10px] py-[10px] hover:bg-[#FFF8B2] hidden' onClick={() => { document.getElementById("dropDown").classList.toggle("hidden"); }}>Beginner</button>
                        <button type='button' className=' px-[10px] py-[10px] hover:bg-[#FFF8B2]' onClick={() => { handleCategory('DataScience'); }}>DataScience</button>
                        <button type='button' className=' px-[10px] py-[10px] hover:bg-[#FFF8B2]' onClick={() => { handleCategory('Math'); }}>Math</button>
                        <button type='button' className=' px-[10px] py-[10px] hover:bg-[#FFF8B2]' onClick={() => { handleCategory('Networking') }}>Networking</button>
                    </div>
                </label>
            </div>
            {errors.title && <span style={{ color: 'red' }}>{errors.title}</span>}
        </div >
    );
}
