
import add from '../../assets/SpecialistDashboard/addimage.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useState, useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast';

export default function Step1({ formData, setFormData, errors }) {


    const levelRef = useRef(null);
    const degreeRef = useRef(null)
    const categoryRef = useRef(null)

    const [degree, setDegree] = useState('')
    const [level, setLevel] = useState('')
    const [category, setCategory] = useState('')
    const [selectedImage, setSelectedImage] = useState(add)

    const [isHovered, setIsHovered] = useState(false);


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file != add) {


            if (file.type.startsWith('image/')) {
                setSelectedImage(URL.createObjectURL(file));
                toast.success('Upload successful! Your image has been successfully uploaded.')
            } else {
                toast.error("Upload failed! Please make sure you select an image file.")
            }
        }

    };



    const handleLevel = (e) => {
        setLevel(e)
        if (levelRef.current) {
            if (levelRef.current.style.display == 'hidden') {
                levelRef.current.classList.toggle('flex');
            } else {
                levelRef.current.classList.toggle('hidden');
            }
        }
    }

    const handleDegree = (e) => {
        setDegree(e)
        if (degreeRef.current) {
            if (degreeRef.current.style.display == 'hidden') {
                degreeRef.current.classList.toggle('flex');
            } else {
                degreeRef.current.classList.toggle('hidden');
            }
        }
    }

    const handleCategory = (e) => {
        setCategory(e)
        console.log(e)
        if (degreeRef.current) {
            if (categoryRef.current.style.display == 'hidden') {
                categoryRef.current.classList.toggle('flex');
            } else {
                categoryRef.current.classList.toggle('hidden');
            }
        }
    }


    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            ['level']: level,
            ['degree']: degree,
            ['category']: category,
            ['img']: selectedImage,
            [name]: value
        });
    }


    return (<>
        <Toaster />
        <div className="flex flex-col w-[100%] gap-[20px]">

            <div className="flex justify-between items-center gap-[30px]">
                <input name='title' type="text" className="w-[91.6%] h-[100px] bg-[#FFFFFC] rounded-[10px] px-[50px] py-[20px] text-[28px] text-[#453507]" placeholder="Course Title ..." value={formData.title} onChange={handleChange} />
                <label htmlFor='picChooser'
                    className={`flex justify-center items-center h-[100px] w-[100px] bg-${isHovered ? '[#FFFDE8]' : '[#FFFFFC]'} rounded-[10px] transition-all duration-300 cursor-pointer`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <input id='picChooser' accept="image/*" type="file" className='hidden' onChange={handleImageChange} />
                    {selectedImage && <img className={`opacity-${isHovered ? 0 : 100} transition-all duration-300 `} src={selectedImage} alt="" />}
                    <img src={add} alt="" className={`absolute opacity-${isHovered ? 100 : 0} transition-all duration-300 `} />
                </label>
            </div>
            <div>
                <label className='w-[100%]'>
                    <h1 className='text-[22px] text-[#3D3700]'>* Description</h1>
                    <textarea name='description' className='w-[100%] h-[150px] resize-none rounded-[10px] bg-[#FFFFFC] text-[18px] px-[20px] py-[20px]' placeholder='Description ...' value={formData.description} onChange={handleChange}></textarea>
                </label>
            </div>
            <div className='flex justify-between items-start w-[100%] '>

                {/* Degree Label */}
                <label className='w-[31.5%]'>
                    <h1 className='text-[22px] text-[#3D3700]'>* Degree</h1>
                    <div className={`bg-[#FFFFFC] flex justify-between items-center h-[70px] w-[100%] py-[10px] px-[10px]  rounded-[10px] border`} onClick={() => {
                        console.log('from  degree button')
                        if (degreeRef.current) {
                            if (degreeRef.current.style.display === 'hidden') {
                                degreeRef.current.style.display = 'flex';
                            } else {
                                degreeRef.current.style.display = 'hidden';
                            }
                        }
                    }} >{degree} <FontAwesomeIcon icon={faChevronDown} /></div>
                    <div ref={degreeRef} id='degree' className=' flex flex-col bg-[#FFFFFC] w-[100%] h-[100%] justify-between hidden'>
                        <button type='button' className=' px-[10px] py-[10px] hover:bg-[#FFF8B2] hidden' onChange={handleChange} onClick={() => { degreeRef.current.classList.toggle("hidden"); }}>Beginner</button>
                        <button type='button' className=' px-[10px] py-[10px] hover:bg-[#FFF8B2]' onClick={() => { handleDegree('Bachelor 1st'); }}>Bachelor 1st</button>
                        <button type='button' className=' px-[10px] py-[10px] hover:bg-[#FFF8B2]' onClick={() => { handleDegree('Bachelor 2nd'); }}>Bachelor 2nd</button>
                        <button type='button' className=' px-[10px] py-[10px] hover:bg-[#FFF8B2]' onClick={() => { handleDegree('Bachelor 3rd'); }}>Bachelor 3rd</button>
                    </div>
                </label>

                {/* Level Label */}
                <label className='w-[31.5%]'>
                    <h1 className='text-[22px] text-[#3D3700]'>* Level</h1>
                    <div className={`bg-[#FFFFFC] flex justify-between items-center h-[70px] w-[100%] py-[10px] px-[10px]  rounded-[10px] border`} onClick={() => {
                        console.log('from  level button')
                        if (levelRef.current) {
                            if (levelRef.current.style.display === 'hidden') {
                                levelRef.current.style.display = 'flex';
                            } else {
                                levelRef.current.style.display = 'hidden';
                            }
                        }
                    }} >{level} <FontAwesomeIcon icon={faChevronDown} /></div>
                    <div ref={levelRef} id='dropDown' className='flex  flex-col bg-[#FFFFFC] w-[100%] h-[100%] justify-between hidden'>
                        <button type='button' className=' px-[10px] py-[10px] hover:bg-[#FFF8B2] hidden' onChange={handleChange} onClick={() => { levelRef.current.classList.toggle("hidden") }}>Beginner</button>
                        <button type='button' className=' px-[10px] py-[10px] hover:bg-[#FFF8B2]' onClick={() => { handleLevel('Beginner'); }}>Beginner</button>
                        <button type='button' className=' px-[10px] py-[10px] hover:bg-[#FFF8B2]' onClick={() => { handleLevel('Intermidiate'); }}>Intermidiate</button>
                        <button type='button' className=' px-[10px] py-[10px] hover:bg-[#FFF8B2]' onClick={() => { handleLevel('Advanced'); }}>Advanced</button>
                    </div>
                </label>


                {/* Category Label  */}
                <label className='w-[31.5%]'>
                    <h1 className='text-[22px] text-[#3D3700]'>* Category</h1>
                    <div className={`bg-[#FFFFFC] flex justify-between items-center h-[70px] w-[100%] py-[10px] px-[10px]  rounded-[10px] border`} onClick={() => {
                        console.log('from  category button')
                        if (categoryRef.current) {
                            if (categoryRef.current.style.display === 'hidden') {
                                categoryRef.current.style.display = 'flex';
                            } else {
                                categoryRef.current.style.display = 'hidden';
                            }
                        }
                    }} >{category} <FontAwesomeIcon icon={faChevronDown} /></div>
                    <div ref={categoryRef} className=' flex flex-col bg-[#FFFFFC] w-[100%] h-[100%] justify-between hidden'>
                        <button type='button' className=' px-[10px] py-[10px] hover:bg-[#FFF8B2] hidden' onChange={handleChange} onClick={() => { categoryRef.current.classList.toggle("hidden"); }}>Beginner</button>
                        <button type='button' className=' px-[10px] py-[10px] hover:bg-[#FFF8B2]' onClick={() => { handleCategory('DataScience'); }}>DataScience</button>
                        <button type='button' className=' px-[10px] py-[10px] hover:bg-[#FFF8B2]' onClick={() => { handleCategory('Math'); }}>Math</button>
                        <button type='button' className=' px-[10px] py-[10px] hover:bg-[#FFF8B2]' onClick={() => { handleCategory('Networking') }}>Networking</button>
                    </div>
                </label>

            </div>
            {errors.title && <span style={{ color: 'red' }}>{errors.title}</span>}
        </div >
    </>
    );
}
