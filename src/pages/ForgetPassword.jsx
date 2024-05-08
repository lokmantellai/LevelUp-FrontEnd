import { useEffect, useState } from 'react';
import logo from '../assets/Logo.png';
import google from '../assets/google.png';
import Btn from '../components/Btn';
import InputField from '../components/inputField';
import lottie from "lottie-web"
import animation from "../assets/AnimationForgetPassword.json"
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../components/ErrorMessage';
import axios from 'axios';
import { useAuth } from '../context/hooks';


export default function ForgetPassword() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState(false);
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;
    const [otherError, setOtherError] = useState("");
    const validationEmail = {
        required: "Please fill out all fields",
        maxLength: 60,
        pattern: {
            value: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
            message: "Please enter a valid email address"
        }
    };
    const fetchToAuth = (data) => {
        axios.post("http://localhost:8000/users/password_reset", data)
            .then((res) => {
                setSuccessMessage(true);
            })

    }
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
        <div className="login-section grid lg:grid-cols-2 grid-cols-1 bg-[#0095B2] h-[100vh]">
            <div className=" bg-white animation lg:flex justify-center items-center hidden ">
                <div className=' border-black '>
                    <div className="cont-anim w-[32rem] h-[33rem]"></div>
                </div>
            </div>
            <div className="bg-[#0095B2] items-center flex flex-col align-top pt-[9rem]">
                <Link to="/">
                    <img src={logo} alt="Logo"
                        className='w-[14rem]'
                    />
                </Link>
                <h3 className='font-medium text-4xl text-white mt-24'>
                    {
                        successMessage ? "Email Sent !" :   "Forget Password"
                    }
                </h3>
                {
                    successMessage &&
                    <p className='w-[70%] text-center  text-white text-xl mt-14 heig'>
                            We've sent you an email with instructions on how to reset your password. Please check your inbox and follow the link provided to complete the process.
                    </p>
                }
                {
                    !successMessage && 
                    <form className='w-[90%] max-w-[25rem] mt-7 flex flex-col' onSubmit={handleSubmit((data) => {
                        fetchToAuth(data);
                    })}>
                          <p className='text-white py-4 px-2 font-medium text-[16px] text-center'>
                    Enter the email address associated with your account and we'll send you a link to reset your password
                    </p>
                        <ErrorMessage errors={errors} others={otherError} />
                        <InputField setToForm={{ ...register("email", validationEmail) }} type="email" placeholder="Email" />
                        <Btn text="Reqeust Reset Link" type="submit" style=" w-full mt-1" />
                        <div className='w-[100%] h-1 bg-white ml-auto mr-auto mt-5'></div>
                        <div className='text-white font-medium text-lg ml-auto mr-auto mt-5 mb-20'>
                            Don’t have an account ? <Link className='font-bold text-[#FCEE65] relative' to='/signup'>Sign-Up .
                                <span className='absolute left-0 bottom-[-3px] w-full h-[2px] bg-[#FCEE65]'></span>
                            </Link>
                        </div>
                    </form>
                }
               
            </div>
        </div>
    )
}