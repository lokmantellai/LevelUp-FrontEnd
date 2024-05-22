import React, { useEffect, useRef, useState } from "react";
import { useAuth, useRegister } from "../context/hooks";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import useAxios from "../api/useAxios";

function useOtpInput() {
  const { publicAxios } = useAxios();
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const { user } = useAuth();
  const registerForm = useRegister();
  console.log(registerForm);
  const email = registerForm?.data?.user?.email


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
  const handlePaste = (event) => {
    event.preventDefault();
    const paste = event.clipboardData.getData('text');
    const pasteData = paste.split('').filter(char => !isNaN(char) && char !== ' ');
  
    // Ensure exactly 6 digits are pasted
    if (pasteData.length !== 6) {
      toast.error("Please paste exactly 6 numeric digits for OTP.");
      return;
    }
  
    pasteData.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].current.value = char;
      }
    });
  
    // Manually trigger change event for each input after paste
    inputRefs.current.forEach((ref, index) => {
      if (ref.current) {
        const event = new Event('input', { bubbles: true });
        ref.current.dispatchEvent(event);
      }
    });
  
    const isAllFilled = inputRefs.current.every(
      (ref) => ref.current && ref.current.value
    );
  
    if (isAllFilled) {
      handleSubmit();
    }
  };
  const handleSubmit = async () => {
    // Gather OTP from all input fields
    const otp = inputRefs.current
        .map((ref) => ref.current.value)
        .join("");
    // Submit OTP to server
    console.log(email);
    await toast.promise(
      publicAxios.post("users/verify/otp/", { otp, email })
      .then((response) => {
        // Handle response from server
        navigate("/");
      }),
      {
        success: "Email Verified!",
        error: (error) => {
          if(error.response.data.message === "Invalid OTP code")
            return "Invalid OTP code";
          else 
          toast.error("An error occurred. Please try again later.");
         
            
        },
        loading: "... loading"
      }
    )
};
  return { inputRefs, handleChange, handleKeyDown, handlePaste };
}

function EmailVerification() {
  const { publicAxios } = useAxios();
  const { inputRefs, handleChange, handleKeyDown, handlePaste } = useOtpInput();
  const [seconds, setSeconds] = useState(600); // 10 minutes in seconds
  const { user } = useAuth();
  const registerForm = useRegister();
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
        <p className="font-medium text-lg text-center mt-4 text-[#00333D]">
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
              onPaste={handlePaste}
            />
          ))}
        </form>
        <p className="text-lg font-medium mt-4">
        Code Expires in : {minutes}:{remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}
        </p>
        <div className="w-full mt-4 h-[2px] bg-[#00333D]"></div>
        <p className="text-lg font-medium mt-4 mb-7 text-[#00333D]">
          If you haven't received the OTP,
          <button onClick={() => {
            publicAxios.post("users/resend/otp/", {
              "email": registerForm?.data?.user?.email
            })
          }} className="text-[#0095B2] underline font-semibold">Resend OTP .
          </button> 
        </p>
      </div>
    </div>
  );
}

export default EmailVerification;
