import { useState } from 'react';
import star from '../../assets/Landing/Star.svg'
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';

import algebra from '../../assets/Landing/algebra 1.svg'

import '../../index.css'




export default function Courses() {
    const [countup, setCountup] = useState(false)
    return (
        <div className="bg-[#006073] px-[100px] py-[100px] flex flex-col gap-[100px]
        sm:py-[50px] sm:px-[50px]
        md:py-[100px] md:px-[100px]">
            <ScrollTrigger onEnter={() => setCountup(true)} onExit={() => setCountup(false)}>
                <div className="Stats grid grid-cols-12  gap-[20px]">
                    <div className="bg-[#0095B2] h-[150px] col-span-2 flex justify-center items-center text-center rounded-[8px] 
                      xs:col-span-12
                    sm:col-span-6 
                    xl:col-span-2">
                        <h1 className="text-[24px] text-[#E8FBFF] font-semibold"><span className="text-[36px] text-[#FFD24C] font-extrabold">+{countup && <CountUp start={58} end={250} duration={2} />}</span>
                            <br />COURSES</h1>
                    </div>
                    <div className="bg-[#0095B2] h-[150px] col-span-3 flex justify-center items-center text-center rounded-[8px]
                    xs:col-span-12
                    sm:col-span-6 
                    xl:col-span-3">
                        <h1 className="text-[24px] text-[#E8FBFF] font-semibold"><span className="text-[36px] text-[#FFD24C] font-extrabold">+ {countup && <CountUp start={58} end={100} duration={2} />}K</span>
                            <br />STUDENT</h1>
                    </div>
                    <div className="bg-[#0095B2] h-[150px] col-span-3 flex justify-center items-center text-center rounded-[8px] 
                      xs:col-span-12
                    sm:col-span-5 
                    xl:col-span-3">
                        <h1 className="text-[24px] text-[#E8FBFF] font-semibold"><span className="text-[36px] text-[#FFD24C] font-extrabold">+{countup && <CountUp start={580} end={1000} duration={2} />}</span>
                            <br />TEACHER</h1>
                    </div>
                    <div className="bg-[#0095B2] h-[150px] col-span-4 flex justify-center items-center text-center rounded-[8px] leading-[19.5px]
                    xs:col-span-12
                   sm:col-span-7 
                    xl:col-span-4 ">
                        <h1 className="text-[24px] text-[#E8FBFF] font-semibold">
                            <span className="text-[36px] text-[#FFD24C] font-extrabold flex gap-[20px] items-center">
                                {countup && <CountUp start={0.0} end={4.8} duration={2} />}
                                <div className='flex flex-row gap-[10px]' >
                                    <img src={star} alt="" /><img src={star} alt="" /><img src={star} alt="" /><img src={star} alt="" /><img src={star} alt="" />
                                </div></span>
                            <br /> RATING</h1>
                    </div>
                </div>
            </ScrollTrigger >

            <div className='Courses flex   gap-[20px] justify-between'>
                <h1 className=' text-[#E8FBFF] text-[36px] font-bold'>Explore Our Inspiring Courses</h1>
                <button className='w-[180px] h-[60px] bg-[#FCEE65] text-[#3D3700] rounded-[8px] text-[18px] font-bold [transition:background-color_0.3s_ease,_box-shadow_0.3s_ease] hover:bg-[#FAE200] hover:[box-shadow:0px_4px_10px_2px_rgba(0,_0,_0,_0.25)]'>View More</button>
            </div>

            <div className='grid grid-cols-12 gap-5 '>
                <div className='imgdiv relative  bg-[#0095B2] h-[150px] col-span-3 flex justify-center items-center text-center rounded-[8px] overflow-hidden  
                   xs:col-span-12
                 sm:col-span-6 
                 xl:col-span-3'>
                    <h1 className="text-[30px] text-[#E8FBFF] font-bold">Algebra</h1>
                    <img src={algebra} className=' w-min absolute left-0 object-cover  h-full  '></img>
                </div>
                <div className='imgdiv relative  bg-[#0095B2] h-[150px] col-span-3 flex justify-center items-center text-center rounded-[8px] overflow-hidden  
                   xs:col-span-12
                 sm:col-span-6 
                 xl:col-span-3'>
                    <h1 className="text-[30px] text-[#E8FBFF] font-bold">Algebra</h1>
                    <img src={algebra} className=' w-min absolute left-0 object-cover  h-full  '></img>
                </div>
                <div className='imgdiv relative  bg-[#0095B2] h-[150px] col-span-3 flex justify-center items-center text-center rounded-[8px] overflow-hidden  
                  xs:col-span-12
                sm:col-span-6 
                 xl:col-span-3'>
                    <h1 className="text-[30px] text-[#E8FBFF] font-bold">Algebra</h1>
                    <img src={algebra} className=' w-min absolute left-0 object-cover  h-full  '></img>
                </div>
                <div className='imgdiv relative  bg-[#0095B2] h-[150px] col-span-3 flex justify-center items-center text-center rounded-[8px] overflow-hidden 
                   xs:col-span-12
                 sm:col-span-6 
                 xl:col-span-3 '>
                    <h1 className="text-[30px] text-[#E8FBFF] font-bold">Algebra</h1>
                    <img src={algebra} className=' w-min absolute left-0 object-cover  h-full  '></img>
                </div>
                <div className='imgdiv relative  bg-[#0095B2] h-[150px] col-span-3 flex justify-center items-center text-center rounded-[8px] overflow-hidden  
                   xs:col-span-12
                 sm:col-span-6 
                 xl:col-span-3'>
                    <h1 className="text-[30px] text-[#E8FBFF] font-bold">Algebra</h1>
                    <img src={algebra} className=' w-min absolute left-0 object-cover  h-full  '></img>
                </div>
                <div className='imgdiv relative  bg-[#0095B2] h-[150px] col-span-3 flex justify-center items-center text-center rounded-[8px] overflow-hidden  
                  xs:col-span-12
                sm:col-span-6 
                 xl:col-span-3'>
                    <h1 className="text-[30px] text-[#E8FBFF] font-bold">Algebra</h1>
                    <img src={algebra} className=' w-min absolute left-0 object-cover  h-full  '></img>
                </div>
                <div className='imgdiv relative  bg-[#0095B2] h-[150px] col-span-3 flex justify-center items-center text-center rounded-[8px] overflow-hidden 
                   xs:col-span-12
                 sm:col-span-6 
                 xl:col-span-3 '>
                    <h1 className="text-[30px] text-[#E8FBFF] font-bold">Algebra</h1>
                    <img src={algebra} className=' w-min absolute left-0 object-cover  h-full  '></img>
                </div>
                <div className='imgdiv relative  bg-[#0095B2] h-[150px] col-span-3 flex justify-center items-center text-center rounded-[8px] overflow-hidden  
                   xs:col-span-12
                 sm:col-span-6 
                 xl:col-span-3'>
                    <h1 className="text-[30px] text-[#E8FBFF] font-bold">Algebra</h1>
                    <img src={algebra} className=' w-min absolute left-0 object-cover  h-full  '></img>
                </div>
            </div>
        </div >

    )
}