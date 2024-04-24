import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
// Import Swiper styles


import 'swiper/css/pagination'
import 'swiper/css/autoplay'

import lottie from "lottie-web"
import anim from "../../assets/Landing/anim.json"
import img1 from "../../assets/Landing/img1.svg"
import img2 from "../../assets/Landing/img2.svg"
import img3 from "../../assets/Landing/img3.svg"
import img4 from "../../assets/Landing/img4.svg"
import img5 from "../../assets/Landing/img5.svg"




export default function Hero() {

    const isMediumScreen = useMediaQuery({ minWidth: 1280 });

    const words = ['Gamified', 'Interactive', 'Engaging']
    const [word, setWord] = useState(words[0]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const nextWordIndex = (words.indexOf(word) + 1) % words.length;
            setWord(words[nextWordIndex]);
        }, 1500);
        return () => clearInterval(intervalId);
    }, [word, words]);


    useEffect(() => {
        const instance = lottie.loadAnimation({
            container: document.querySelector(" .rightside"),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: anim
        })
        return () => instance.destroy();
    }, [])


    return (
        <div className='hero  mx-[100px] my-[100px] flex flex-col gap-[100px] items-center 
        sm:my-[50px] sm:mx-[50px] 
        md:my-[100px] md:mx-[100px]'>
            <div className='top grid grid-cols-12 gap-5 items-center justify-between '>
                <div className='leftside flex flex-col gap-[50px] col-span-6
                xs:col-span-12 
                sm:col-span-12 
                md:col-span-6'>
                    <h1 className=' font-extrabold text-[64px] text-[#006073] 
                    xs:text-center
                    sm:text-[48px] sm:text-center
                    md:text-left
                    xl:text-[54px] 
                    2xl:text-[64px]'>Code & Conquer:CS University's
                        {isMediumScreen && < br />}<span className='text-[#FAE200]  
                        md:text-[54px] 
                        xl:text-[64px] 
                        2xl:text-[72px]'><em> {word}</em></span>  Learning</h1>
                    <p className='font-regular text-[22px] text-[#006073]
                    xs:text-center
                    sm:text-center
                    md:text-left'>
                        Embark on an epic journey through coding challenges and triumphs! Join our community, level up your skills, and unleash your potential. Ready to conquer the digital realm? Let's start the adventure!
                    </p>
                    <div className='buttons flex flex-row  gap-[20px] 
                    xs:justify-center
                    sm:justify-center
                    md:justify-start'>
                        <button className='w-[190px] h-[60px] bg-[#FFF0C4] text-[#3D3700] rounded-[8px] text-[18px] font-bold [transition:background-color_0.3s_ease,_box-shadow_0.3s_ease] hover:bg-[#FFE9A6] hover:[box-shadow:0px_4px_10px_2px_rgba(0,_0,_0,_0.25)]'>View More</button>
                        <button className='w-[190px] h-[60px] bg-[#FCEE65] text-[#3D3700] rounded-[8px] text-[18px] font-bold [transition:background-color_0.3s_ease,_box-shadow_0.3s_ease] hover:bg-[#FAE200] hover:[box-shadow:0px_4px_10px_2px_rgba(0,_0,_0,_0.25)]'>Get Started</button>
                    </div>
                </div>
                <div className=' col-span-1'></div>
                <div className='rightside col-span-5 
                xs:hidden
                sm:hidden
                md:block'></div>
            </div>
            <div className='down w-[-webkit-fill-available] flex flex-col gap-[25px]'>
                <h1 className='font-bold text-[24px] text-[#006073] text-left '>Trusted By</h1>
                <Swiper
                    className='flex flex-row'
                    // install Swiper modules
                    modules={[Autoplay, Pagination]}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                        easing: 'ease', // Easing function for the transition 
                        waitForTransition: true
                    }}
                    loop={true} // Enable loop
                    effect="coverflow"
                    speed={5000}
                    freeMode={true}
                    spaceBetween={50}
                    slidesPerView={5}
                    breakpoints={{
                        991: {
                            slidesPerView: 4,
                            spaceBetween: 40
                        },
                        1280: {
                            slidesPerView: 5,
                            spaceBetween: 50
                        }
                    }}
                >
                    <SwiperSlide className='flex justify-center items-center'><img src={img1} alt="" /></SwiperSlide>
                    <SwiperSlide className='flex justify-center items-center'><img src={img2} alt="" /></SwiperSlide>
                    <SwiperSlide className='flex justify-center items-center'><img src={img3} alt="" /></SwiperSlide>
                    <SwiperSlide className='flex justify-center items-center'><img src={img4} alt="" /></SwiperSlide>
                    <SwiperSlide className='flex justify-center items-center'><img src={img5} alt="" /></SwiperSlide>
                    <SwiperSlide className='flex justify-center items-center'><img src={img5} alt="" /></SwiperSlide>

                </Swiper>
            </div>
        </div >
    )
}