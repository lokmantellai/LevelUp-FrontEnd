import { useEffect, useState } from 'react';
import logo from '../assets/Logo.png';
import Btn from '../components/Btn';
import InputField from '../components/inputField';
import lottie from "lottie-web"
import animation from "../assets/animation.json"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../components/ErrorMessage';
import axios from 'axios';
import NotFound from './NotFound';


    export default function ResetPassword() {
        const navigate = useNavigate();
        const { register, handleSubmit, formState , watch } = useForm();
        const { errors } = formState;
        const [successfulReset, setSusuccessfulReset] = useState(false);
        const [otherError, setOtherError] = useState("");
        const [errorNotFound, setErrorNotFound] = useState(false)
        const [loading, setLoading] = useState(true); // Manage loading state
        const password = watch("password");
        const { uidb64, token } = useParams();
        //validation password
        const validationPassword = {
            required: "Please fill out all fields",
        };
        const validationConfirmPassword = {
            required: "Please fill out all fields",
            validate: value => value === password || "Passwords do not match"
        }
        useEffect(() => {
            const instance = lottie.loadAnimation({
                container: document.querySelector(".animation .cont-anim"),
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: animation
            })
            axios(`http://localhost:8000/users/password_reset_confirm/${uidb64}/${token}`)
            .then(response => {
                console.log('this response   ==>',response.data);
                setLoading(false); // Set loading to false when an error occurs
            })
                .catch((error) => {
                    console.log('this error    ==>',error , " error")
                    setLoading(false);
                    setErrorNotFound(true);
                });
            return () => instance.destroy();
        }, [uidb64, token, loading])

        if (loading) {
            // Render loading animation or message while fetching data
            return (
                <div>Loading...</div>
            );
        }
        if (errorNotFound) {
            // Render "not found" page if there is an error
            return (
                <NotFound />
            );
        }
    return (
        <div className="login-section grid lg:grid-cols-2 grid-cols-1 bg-[#0095B2] h-[100vh]">
            <div className=" bg-white animation lg:flex justify-center items-center hidden ">
                <div className=' border-black '>
                    <div className="cont-anim w-[32rem] h-[33rem]"></div>
                </div>
            </div>
            <div className="bg-[#0095B2] items-center flex flex-col align-top pt-[7rem]">
                <Link to="/">
                    <img src={logo} alt="Logo"
                        className='w-[14rem]'
                    />
                </Link>
                <h3 className='font-medium text-4xl text-white mt-24'>
                    Reset Password
                </h3>
                {
                    successfulReset ?
                        <p className='text-xl text-white w-[87%] text-center'>
                    Your password has been successfully reset
                        </p>
                        :
                        <form className='w-[89%] max-w-[25rem] mt-10 flex flex-col gap-1' onSubmit={handleSubmit((data) => {
                            data["uidb64"] = uidb64;
                            data["token"] = token;
                            axios.patch('http://localhost:8000/users/set_new_password', data)
                        .then(response => {
                          setSusuccessfulReset(true)  
                        })
                        .catch(error => {
                            // Handle error response
                            console.error(error);
                        });
                        })}>
                            <ErrorMessage errors={errors} others={otherError} />
                            <InputField setToForm={{ ...register("password", validationPassword) }} type="password" placeholder="New Password" />
                            <InputField setToForm={{ ...register("confirm_password", validationConfirmPassword) }} type="password" placeholder="Confirm New Password" />
                            <div className='flex justify-center text-white font-medium text-lg'>
                                <Btn text="Reset My Password" type="submit" style={" w-full"} />
                            </div>
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