import Student from "../../assets/Profile/Student.json"
import xp from "../../assets/Profile/XP.svg"
import bdg1 from "../../assets/Profile/bdg1.svg"
import bdg2 from "../../assets/Profile/bdg2.svg"
import bdg3 from "../../assets/Profile/bdg3.svg"



export default function Infos() {

    return (
        <div className="flex justify-around items-center bg-[#FFFBED] h-[100%] rounded-[10px] py-[25px] px-[25px] gap-[20px]
        xs:mx-[25px] xs:my-[25px] xs:flex-col 
        sm:mx-[25px] sm:my-[25px] sm:flex-col  
        md:mx-[50px] md:my-[50px] md:flex-row
        ">
            <img src={Student.img} alt="" className="w-[150px] rounded-full 
            xs:w-[100px]" />
            <div className="flex flex-col justify-between h-[150px] 
           xs:items-center xs:text-center
           sm:items-center
            md:items-start">
                <h1 className="text-[22px] text-[#453507] font-medium">{Student.first_name} {Student.last_name}</h1>
                <h1 className="text-[18px] text-[#453507] font-regular">University : {Student.university}</h1>
                <h1 className="text-[18px] text-[#453507] font-regular">Study Year : {Student.level}</h1>
            </div>
            <div className="flex flex-col items-center justify-between h-[150px] ">
                <div className="flex items-center gap-[10px]">
                    <h1 className="text-[22px] text-[#3D3700] font-medium">525 XP</h1><img src={xp} className="w-[15px]" />
                </div>
                <div className="badges flex justify-center items-center gap-[10px]">
                    <img src={bdg1} alt="" className=" w-[30px]" />
                    <img src={bdg2} alt="" className=" w-[30px]" />
                    <img src={bdg3} alt="" className=" w-[30px]" />
                </div>
                <div className="buttons flex gap-[30px]">
                    <button className="w-[100px] h-[40px] bg-[#FCEE65] text-[#3D3700] font-medium rounded-[8px]">Edit Profile</button>
                    <button className="w-[100px] h-[40px] bg-[#FCEE65] text-[#3D3700] font-medium rounded-[8px]">View Badges</button>
                </div>
            </div>
        </div>
    )
}