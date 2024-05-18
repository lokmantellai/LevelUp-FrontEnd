import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth, useRegister } from '../context/hooks';
import logo from '../assets/Logo.png';
import google from '../assets/google.png';
import Btn from '../components/Btn';
import InputField from '../components/inputField';
import lottie from "lottie-web"
import animation from "../assets/animation.json"
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import ErrorMessage from '../components/ErrorMessage';
import useAxios from '../api/useAxios';

export default function SignUp() {
    const navigate = useNavigate();
    const registerForm = useRegister();
    const { publicAxios } = useAxios();
    const { register, handleSubmit, formState, watch } = useForm({
        defaultValues: {
            first_name: registerForm.data?.user?.first_name || "",
            last_name: registerForm.data?.user?.last_name || "",
            email: registerForm.data?.user?.email || "",
            password: registerForm.data?.user?.password || "",
            confirmPassword: registerForm.data?.user?.confirmPassword || "",
        }
    });

    const { errors } = formState;
    const [otherError, setOtherError] = useState("");
    const password = watch("password");
    // Set Up Animation 
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
    //validation first_name & last_name
    const validationName = {
        required: "Please fill out all fields",
        maxLength: 30,
        pattern: /^[A-Za-z\- ']+(?: [A-Za-z\- ']+)*$/
    };
    //validation email
    const validationEmail = {
        required: "Please fill out all fields",
        maxLength: 60,
        pattern: {
            value: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
            message: "Please enter a valid email address"
        }
    };
    //validation password
    const validationPassword = {
        required: "Please fill out all fields",
        minLength: {
            value: 8,
            message: "Password must contain at least 8 characters"
        },
    };
    //check match password 
    const validationConfirmPassword = {
        required: "Please fill out all fields",
        validate: value => value === password || "Passwords do not match"
    }
    //Check If Email Already Used 
    const emailIsUsed = async (email) => {
        await publicAxios.post(
            'http://localhost:8000/users/validate/email/',
            { email },
            { headers: { 'Content-Type': 'application/json' } }
        );
    };
    return (
        <div className="sign-section grid lg:grid-cols-2 grid-cols-1 bg-[#0095B2] h-[100vh]">
            <div className=" bg-white animation lg:flex justify-center items-center hidden ">
                <div className=' border-black '>
                    <div className="cont-anim w-[32rem] h-[33rem]"></div>
                </div>
            </div>
            <div className="bg-[#0095B2] items-center flex flex-col align-top pt-[6rem]">
                <Link to="/">
                    <img src={logo} alt="Logo"
                        className='w-[15rem]'
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
                <div className='flex items-center mt-5'>
                    <div className='max-w-[11rem] w-[39vw] h-1 bg-white'></div>
                    <span className='px-3 font-bold text-xl text-white'>Or</span>
                    <div className='max-w-[11rem] w-[39vw] h-1 bg-white'></div>
                </div>
                <form className='w-[89%] max-w-[25rem] mt-4 flex flex-col' onSubmit={handleSubmit((data) => {
                    if (data["confirmPassword"] === data.password) {
                        emailIsUsed(data.email)
                            .then(() => {
                                registerForm.save("user", data);
                                setOtherError("");
                                console.log(data)
                                navigate("/signup/step/1")
                            })
                            .catch(() => setOtherError("Email is already used"));
                    }
                })}>
                    <ErrorMessage errors={errors} others={otherError} />
                    <div className='grid grid-cols-2 gap-4'>
                        <InputField setToForm={{ ...register("first_name", validationName) }} type="text" placeholder="First Name" />
                        <InputField setToForm={{ ...register("last_name", validationName) }} type="text" placeholder="Last Name" />
                    </div>
                    <InputField setToForm={{ ...register("email", validationEmail) }} type="text" placeholder="Email" />
                    <InputField setToForm={{ ...register("password", validationPassword) }} type="password" placeholder="Password" />
                    <InputField setToForm={{ ...register("confirmPassword", validationConfirmPassword) }} type="password" placeholder="Confirm Password" />
                    <div className='flex justify-end text-white font-medium text-lg'>
                        <Btn text="Sign Up" type="submit" style={"mb-4 px-7 py-[0.7rem]"} />
                    </div>
                    <div className='w-[100%] h-1 bg-white ml-auto mr-auto mt-'></div>
                    <div className='text-white font-medium text-lg ml-auto mr-auto mt-5 mb-10'>
                        Already have an account ? <Link className='font-bold text-[#FCEE65] relative' to='/Login'> Login .
                            <span className='absolute left-0 bottom-[-3px] w-full h-[2px] bg-[#FCEE65]'></span>
                        </Link>
                    </div>
                </form>
                <small className='px-3 mb-4 text-white'>By signing up you agree with our <u>Terms of service</u> and our privacy policy .</small>
            </div>
        </div>
    )
}