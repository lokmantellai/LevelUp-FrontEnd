import { useLocation, useNavigate, useParams } from "react-router-dom"
import ProgressBar from "../components/EnrollCourse/ProgressBar";
import closeIcon from "../assets/close.svg"
import Bars from "../assets/3Bars.svg"
import Arrow from "../assets/Arrow.svg"
import Light from "../assets/lightning-bolt.svg"
import personne from "../assets/pers.svg"
import useAxios from "../api/useAxios";
import { useEffect, useState } from "react";
import { useEnroll } from "../context/hooks";


function EnrollCourse() {
    const { course_name, lessonId, num } = useParams();
    const { pathname } = useLocation()
    console.log(pathname);
    let numInt = Number(num);
    const { privateAxios } = useAxios();
    const { all, allContent } = useEnroll();
    if(allContent)
        console.log("Content ", allContent[num], "this is content");
    const nav = useNavigate(); 
    let content =allContent ? allContent[num] : ""
  return (
    <div className="container h-screen mx-auto pe-10 px-0">
          <nav className="nav-enroll flex items-center justify-start px-[50px] py-[18px] ">
              <div>
                <button>
                    <img src={closeIcon} className="w-[16px] h-[16px]" />     
                </button>
                <button className="ml-[100px]">
                    <img src={Bars} className="w-[20px] h-[20px] " />     
                </button>
            </div>
              <div className="flex items-center justify-center flex-1">
                  <button onClick={() => {
                    if(numInt > 0 )
                        nav(`/course/${course_name}/enroll/${lessonId}/step/${(numInt) - 1}`)
                  }} className={"mr-[37px]"}>
                    <img src={Arrow} />
                </button>
                <div className="w-[40vw] h-[10px] bg-[#FFF8B2] rounded-full">
                    <div style={{width: `${(numInt * 100) / all}%`}} className="h-full bg-[#FAE200] rounded-full"></div>      
                </div>
                  <button onClick={() => {
                    if(numInt < all )
                        nav(`/course/${course_name}/enroll/${lessonId}/step/${numInt + 1}`)
            }} className={"ml-[37px] rotate-180"}>
                <img src={Arrow} />
            </button>
                </div>
                <div className="flex items-center w-[136px]">
                    <span className="font-medium text-[20px] mr-1">0 XP</span>
                    <img src={Light} className="w-[24px]" />
                    <img src={personne} className="w-[27px] ml-[24px]" />
                </div>
            </nav>
          <div className="enroll-course flex items-start flex-col">
              <div>
              </div>
              <button onClick={() => {
                    nav(`/course/${course_name}/enroll/${lessonId}/step/${(numInt) + 1}`)
              }}>
                    {numInt == 0 ? "Start" : "Next"}
                </button>
            </div>
    </div>
  )
}

export default EnrollCourse


