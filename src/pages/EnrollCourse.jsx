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
import Quiz from "../components/Quiz";


function EnrollCourse() {
    const data = [
        {
          question: "Which of the following are advantages of storing data in a database," +
              " rather than using traditional formats like spreadsheets?",
          option1: "More storage",
          option2: "Many people can use at once",
          option3: "Can be secured with encryption",
          option4: "All of the above",
          ans: 4,
        },
        {
          question: "Understanding the organization of a database is an important first step when using SQL.\n" +
              "Take a look at the database below. Which of the following statements correctly describes its organization?\n",
          option1: "This is a table containing three relational databases: employees, job_levels, and departments",
          option2: "This is a relational database containing three tables: employees, job_levels, and departments",
          option3: "This is a database, but it is not relational, because no relationship exists between job levels and departments",
          option4: "This is not a database because there is no SQL code shown",
          ans: 2,
        },
        {
          question: "According to tables naming rules in SQL , which table name is correct ?",
          option1: "table 1",
          option2: "table 2",
          option3: "both",
          option4: "no one ",
          ans: 1,
        },
        {
          question: "A unique identifier is a value that distinguishes a record from others in the same table." +
              "In the employees table, which fields do you believe is the most suitable choice for a unique identifier?",
          option1: "name",
          option2: "dept_id",
          option3: "year_hired",
          option4: "id",
          ans: 4,
        },
        {
          question: "Which SQL query to display results from a table?",
          option1: "INSERT",
          option2: "ALTER",
          option3: "SELECT",
          option4: "UPDATE",
          ans: 3,
        },
      ]
    const { course_name, lessonId, num } = useParams();
    const { pathname } = useLocation()
    console.log(pathname);
    let numInt = Number(num);
    const { privateAxios } = useAxios();
    const { all, allContent } = useEnroll();
    let content;
    if(allContent)
        content = allContent[num].content;

    const nav = useNavigate(); 
    
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
                  {content == "game" ? <Quiz data={data} />
                :  <div dangerouslySetInnerHTML={{ __html: content }} />
                }
                
              </div>
              <button onClick={() => {
                  if(all < numInt )
                    nav(`/course/${course_name}/enroll/${lessonId}/step/${(numInt) + 1}`)
                  
              }}>
                  {numInt == 0 ? "Start" : "Next"}
                </button>
            </div>
    </div>
  )
}

export default EnrollCourse


