
import { Swiper, SwiperSlide } from 'swiper/react';
import { courses } from '../../assets/Landing/Data.js'
import { Autoplay, Pagination } from 'swiper/modules';
// Import Swiper styles


import 'swiper/css/pagination'
import 'swiper/css/autoplay'

import student from '../../assets/Landing/student.png'


export default function Stories() {






    return (
        <div className="bg-[#FFFDE8] py-[100px] px-[100px] flex flex-col gap-[10px]">
            <h1 className='text-[#453507] text-[36px] font-extrabold'>Students Stories</h1>
            <Swiper

                className='flex flex-row'
                // install Swiper modules
                modules={[Autoplay, Pagination]}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                    easing: 'ease', // Easing function for the transition 
                }}
                loop={true} // Enable loop
                effect="coverflow"
                spaceBetween={50}
                slidesPerView={3}
                breakpoints={{
                    1536: {
                        slidesPerView: 3,
                        spaceBetween: 50
                    },
                    1280: {
                        slidesPerView: 2,
                        spaceBetween: 40
                    },
                    320: {
                        slidesPerView: 1
                    }

                }}

            >
                {courses.map((ele) =>
                    <SwiperSlide key={courses.indexOf(ele)} className='bg-[#FFF0C4] w-[400px]  py-[50px] px-[50px] flex flex-col gap-[20px] items-center rounded-[10px]'>
                        <img src={student} alt="" className='w-[100px] h-[100px] rounded-full' />

                        <div className='text-center flex flex-col gap-[20px]'>
                            <h1 className='text-[18px] text-[#453507] font-bold'>{ele.Name}</h1>
                            <h1 className='text-[18px] text-[#453507] font-bold'>{ele.Univ}</h1>
                            <p className='text-[18px] text-[#453507] font-bold'>{ele.Story}</p>
                        </div>
                    </SwiperSlide>
                )}


            </Swiper>

        </div >
    )
}