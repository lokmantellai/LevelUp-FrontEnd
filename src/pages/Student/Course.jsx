import { Link, useParams } from "react-router-dom"
import DataBaseImg from "../../assets/Learn/databaseBackground.svg"

const databaseBeginnerLessons = [
  { title: "Introduction to Databases", xp: 100, order: 1 },
  { title: "Database Design", xp: 150, order: 2 },
  { title: "SQL Basics", xp: 200, order: 3 },
  { title: "Advanced SQL", xp: 250, order: 4 },
  { title: "Database Optimization", xp: 300, order: 5 },
];

function Course() {
  const { course_name } = useParams();
  return (
    <div className="mt-[50px] px-[100px] mb-[100px]">
      <div className="bg-[#00333D] h-[420px]  border-2 rounded-[10px] pt-[39px] pe-[58px] px-[85px] relative">
        <img className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src={ DataBaseImg } />
        <h2 className="text-[36px] font-medium text-[#E8FBFF] mb-[33px]">Database</h2>
        <h4 className="text-[26px] font-medium text-[#E8FBFF] mb-[22px]">Course Description</h4>
        <p className="text-[18px] font-medium text-[#E8FBFF] mb-[40px]">
          In this introduction to R course, you'll master the basics of this widely used open source language—including vectors, factors, lists, and data frames. With the coding skills you'll gain in this course, you'll be ready to undertake your own data analysis in R. There are millions of R users worldwide, cementing it as a leading programming language in statistics and data science. Begin your coding journey in one of DataCamp's most popular courses today!
        </p>
        <div className="flex gap-[80px]">
          <button>
            <Link to={"#"} className="text-[24px] font-medium text-[#00333D] bg-white px-[28px] py-[12px] rounded-[10px]">
              Start Course
            </Link>
            </button>
            <ul className="flex items-center gap-[110px] text-[20px] text-[#E8FBFF] font-[20px]">
              <li className="font-medium">Beginner</li>
              <li className="font-medium">Bachelor 1st</li>
              <li className="font-medium">36 Lesson</li>
              <li className="text-[#00333D] bg-[#FAE200] px-[9px] py-[3px] rounded-[4px] font-medium">3500XP</li>
            </ul>
        </div>
      
      </div>
      <h3 className="text-[30px] text-[#00333D] font-medium my-[65px]">
      Course Content
      </h3>
      <div className="bg-[#FFFBED] flex flex-col rounded-[10px] lessons">
        {databaseBeginnerLessons.map((el,ind) => (
            <Lesson key={ind} order={el.order} title={el.title} xp={el.xp} />
        ) )}
      
      </div>
    </div>
  )
}

function Lesson({ title, xp, order }) {
  
  const formatOrder = (order) => {
    return order < 10 ? `0${order}` : order.toString();
  };

  return (
    <div className="flex justify-between items-center py-[22px] px-[70px] border-b-[1px]">
          <div className="flex items-center gap-[70px]">
        <span className="w-[50px] h-[50px] bg-[#453507] text-[#FFFBED] text-[26px] font-medium py-[11px] px-[10px] rounded-[5px] flex justify-center items-center">{formatOrder(order)}</span>
        <span className="text-[22px] font-medium">{title}</span>
          </div>
          <span className="text-[22px] text-[#453507] font-medium">{xp} XP</span>
        </div>
  )
}




export default Course