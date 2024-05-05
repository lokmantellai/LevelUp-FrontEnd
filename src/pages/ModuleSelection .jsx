import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import ModulesBox from "../components/ModulesBox";
import { useState } from "react";
import Btn from '../components/Btn';
import { useRegister } from '../context/hooks';
import axios from 'axios';
function ModuleSelection() {
  console.log(useRegister().ModulesSelected)
  function splitArrayToChunks(arr, size1, size2) {
    console.log(size1, size2)
    const result = [];
    let start = 0;

    while (start < arr.length) {
      let chunkSize = (result.length % 2 === 0) ? size1 : size2;
      result.push(arr.slice(start, start + chunkSize));
      start += chunkSize;
    }

    return result;
  }
  let [size, setSize] = useState({
    size1: 4,
    size2: 3
  })
  function setSizeScreen() {
    if (window.innerWidth < 495)
      setSize({
        size1: 1,
        size2: 1
      })
    else if (window.innerWidth < 1024)
      setSize({
        size1: 2,
        size2: 1
      })
    else if (window.innerWidth < 1286)
      setSize({
        size1: 3,
        size2: 2,
      })
    else
      setSize({
        size1: 4,
        size2: 3,
      })
  }
  window.onload = setSizeScreen;
  window.onresize = setSizeScreen;

  useEffect(() => {
    const fetchData = async () => {
      let res = await fetch('http://192.168.205.126:8000/users/courses/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return res.json();
    };
    // Update result whenever size changes
    fetchData().then(res => {
      let cours = [];
      res.forEach((el) => {
        cours.push(el.title);
      })
      setResult(splitArrayToChunks(cours, size.size1, size.size2));
    })
  }, [size]);

  let [result, setResult] = useState(splitArrayToChunks([], size.size1, size.size2));
  const navigate = useNavigate();
  const registerForm = useRegister();
  registerForm.setProgress(4, "/signup/step/3", 4);
  const handlerNextBtn = async () => {
    let result = [];
    document.querySelectorAll(".checkedChoice").forEach((el) => {
      result.push(el.textContent);
    });

    if (result.length === 0)
      registerForm.save("courses_of_interest", null);
    else
      registerForm.save("courses_of_interest", result);
    registerForm.save("university", "University Abdel El Hamid Mehri");
    console.log(registerForm.data.role.toLowerCase() + " Heyyy")
    try {
      const response = await axios.post(`http://192.168.205.126:8000/users/register/${registerForm.data.role.toLowerCase()}/`,
        registerForm.extract(), {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then((res) => {
        console.log(res.data.teacher_id + "Teacher id")
        if (registerForm.data.role == "Teacher") {
          axios.post(`http://192.168.205.126:8000/users/register/${registerForm.data.role.toLowerCase()}/`,
            {
              "course_names": registerForm.data.courses_of_interest,
              "teacher_id": res.data.teacher_id 
      
            }, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
        }
            
      })
        
      console.log(response);
      //navigate("/emailverification");
      return response;
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="container mx-auto py-12 px-5 relative bg-[#FFFFFC]">
      <main className='flex items-start flex-col mt-20 mb-10'>
        <h2 className='lg:text-4xl text-3xl  max-[440px]:max-w-[300px] font-medium text-center w-full mx-auto'>
          {registerForm.data.role == "Teacher" && "Which modules are you teaching ?"}
          {registerForm.data.role == "Student" && "Which modules  are you interested in learning ?"}
        </h2>
        <div className="w-full mt-10">
          <div className="searchBar focus-within:border-gray-300 transition-all duration-150 ease-in-out flex px-5 py-4 overflow-hidden max-w-md mx-auto border-b-2 border-gray-200 text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="18px"
              className="fill-gray-400 mr-3 rotate-90">
              <path
                d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
              </path>
            </svg>
            <input onChange={() => {
              let str = document.querySelector("#searchBar").value.toLowerCase();
              let filteredData = str.filter((el) => el.toLowerCase().includes(str));
              let chunks = splitArrayToChunks(filteredData, size.size1, size.size2);
              setResult(chunks);
            }} id="searchBar" type="text" placeholder="Search Something..." className="w-full outline-none bg-transparent placeholder:text-gray-200" />
          </div>
          <div className="flex items-center justify-center mt-10">
            <div className="Modules flex items-center flex-col h-[25rem] overflow-y-auto pe-24 overflow-x-hidden">
              {
                result.map((el, ind) => {
                  return <ModulesBox key={ind} data={el} />
                })
              }
            </div>
            <Btn text="Next" style={"w-44 h-16 text-xl max-[568px]:w-36 mt-6 absolute bottom-10 right-10"} handleSubmit={handlerNextBtn} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default ModuleSelection;
