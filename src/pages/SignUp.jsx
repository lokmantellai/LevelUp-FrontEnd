import { useEffect } from 'react';
import logo from '../assets/Logo.png';
import google from '../assets/google.png';
import Btn from '../components/Btn';
import InputField from '../components/inputField';
import lottie from "lottie-web"
import animation from "../assets/animation.json"
import { Link, Route, Routes } from 'react-router-dom';


export default function SignUp() {
    useEffect(() => {
        const instance = lottie.loadAnimation({
            container: document.querySelector(".animation .cont-anim"),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animation
        })
        return () => instance.destroy();
    }, [])

    return (
        <div className="sign-section grid lg:grid-cols-2 grid-cols-1 bg-[#0095B2] h-[100vh] ">

            <div className=" bg-white animation lg:flex justify-center items-center hidden ">
                <div className=' border-black '>
                    <div className="cont-anim w-[32rem] h-[33rem]"></div>
                </div>
            </div>
            <div className="bg-[#0095B2] items-center flex flex-col align-top pt-[6rem]">
                <Link to="/">
                    <img src={logo} alt="Logo"
                        className='w-[18rem]'
                    />
                </Link>
                <h3 className='font-medium text-4xl text-white mt-16'>
                    Sign up to Levelup
                </h3>
                <button className='mt-7 max-w-[25rem] w-[90%]  py-3 bg-[#B2F2FF] rounded-xl text-[#006073] flex justify-center items-center hover:bg-[#65E3FC] transition-all ease-in-out duration-200'>
                    <div className='flex items-center lg:gap-10 gap-5 '>
                        <img className='w-7 h-7' src={google} alt="Logo" />
                        <span className='font-medium lg:text-xl text-lg'>
                            Sign up With Google
                        </span>
                    </div>
                </button>
                <div className='flex items-center mt-7'>
                    <div className='max-w-[11rem] w-[39vw] h-1 bg-white'></div>
                    <span className='px-3 font-bold text-xl text-white'>Or</span>
                    <div className='max-w-[11rem] w-[39vw] h-1 bg-white'></div>
                </div>
                <form className='w-[89%] max-w-[25rem] mt-7 flex flex-col'>
                    <div className='grid grid-cols-2 gap-4'>
                        <InputField name="FirstName" type="text" />
                        <InputField name="LastName" type="text" />
                    </div>
                    <InputField name="Email" type="email" />
                    <InputField name="Password" type="password" />
                    <div className='flex justify-end text-white font-medium text-lg'>
                        <Btn text="Sign" type="submit" />
                    </div>
                    <div className='w-[100%] h-1 bg-white ml-auto mr-auto mt-5'></div>
                    <div className='text-white font-medium text-lg ml-auto mr-auto mt-5 mb-10'>
                        Already have an account ? <Link className='font-bold text-[#FCEE65] relative' to='/Login'> Login .
                            <span className='absolute left-0 bottom-[-3px] w-full h-[2px] bg-[#FCEE65]'></span>
                        </Link>
                    </div>
                </form>
                <small className='px-3 mb-8 text-white'>By signing up you agree with our <u>Terms of service</u> and our privacy policy .</small>
            </div>
        </div>
    )
}