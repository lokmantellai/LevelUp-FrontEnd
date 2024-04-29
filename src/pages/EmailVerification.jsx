import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRegister } from "../context/hooks";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

function useOtpInput() {
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const registerForm = useRegister();

  // Listen for the browser's history change event
  if (inputRefs.current.length === 0) {
    inputRefs.current = Array.from({ length: 6 }, () => React.createRef());
  }

  const handleChange = (index, event) => {
    let target = event.target;
    target.value = target.value.replace(/\D/g, '');
    if (target.value != ''&& index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].current.focus();
    }

    // Check if all input fields are filled
    const isAllFilled = inputRefs.current.every(
      (ref) => ref.current && ref.current.value
    );

    if (isAllFilled) {
      handleSubmit();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && event.target.value === "" && index > 0) {
      inputRefs.current[index - 1].current.focus();
    }
  };

  const handleSubmit = () => {
    // Gather OTP from all input fields
    const otp = inputRefs.current
        .map((ref) => ref.current.value)
        .join("");

    // Submit OTP to server
    const email = registerForm.data.user.email;
    axios.post("http://127.0.0.1:8000/users/verify/otp/", { otp, email })
        .then((response) => {
          // Handle response from server
          console.log(response)
          navigate("/");
        })
      .catch((error) => {
        // Handle error response from server
        if (error.response.data.message === "Invalid OTP code")
          toast.error("Invalid OTP code");
        else 
          toast.error("An error occurred. Please try again later.");

      });
    
};
  return { inputRefs, handleChange, handleKeyDown };
}

function EmailVerification() {
  const { inputRefs, handleChange, handleKeyDown } = useOtpInput();
  const [seconds, setSeconds] = useState(600); // 10 minutes in seconds

  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          clearInterval(interval);
          // Handle timer expiration here
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  
   // Convert remaining seconds to minutes and seconds
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return (
    <div className="h-screen flex justify-center items-center bg-[#FFFFFC]">
            <Toaster />
      <div className="shadow-lg w-[60rem] h-[35rem] px-10 rounded-3xl flex flex-col items-center bg-[#E8FBFF]">
        <div className="w-64 h-60 mt-4"></div>
        <h2 className="font-bold text-3xl text-[#0095B2] ">
          Confirm Email Address
        </h2>
        <p className="font-medium text-lg text-center mt-4">
          Please verify your account by entering the one-time password (OTP)
          sent to your email address. If you haven't received it, click "Resend
          OTP." Enter the OTP within 10 minutes to confirm your account and
          access our services. Welcome aboard!
        </p>
        <form className="mt-4 flex flex-row gap-3 text-4xl font-bold">
          {inputRefs.current.map((ref, index) => (
            <input
              key={index}
              minLength="1"
              maxLength="1"
              className="focus-within:outline-[3px] focus-within:outline-[#00333D] focus-within:outline text-center w-[4rem] h-[4rem] bg-[#FFFFFC] rounded-2xl"
              type="text"
              ref={ref}
              onChange={(event) => handleChange(index, event)}
              onKeyDown={(event) => handleKeyDown(index, event)}
            />
          ))}
        </form>
        <p className="text-lg font-medium mt-4">
        Code Expires in : {minutes}:{remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}
        </p>
        <div className="w-full mt-4 h-[2px] bg-[#00333D]"></div>
        <p className="text-lg font-medium mt-4 mb-7">
          If you haven't received the OTP, <button className="text-[#0095B2] underline font-semibold">Resend OTP .</button> 
        </p>
      </div>
    </div>
  );
}

export default EmailVerification;
