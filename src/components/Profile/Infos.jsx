import Student from "../../assets/Profile/Student.json"
import xp from "../../assets/Profile/XP.svg"
export default function Infos() {

    return (
        <div className="flex justify-around items-center bg-[#FFFBED] h-[150px] rounded-[10px] py-[25px] px-[25px]
        
        xs:mx-[25px] xs:my-[25px]
        sm:mx-[25px] sm:my-[25px]
        md:mx-[50px] md:my-[50px]
        ">
            <img src={Student.img} alt="" className="w-[100px] rounded-full" />
            <div className="flex flex-col justify-start h-[100%] items-start">
                <h1 className="text-[22px] text-[#453507] font-medium">{Student.first_name} {Student.last_name}</h1>
                <h1 className="text-[18px] text-[#453507] font-regular">University : {Student.university}</h1>
                <h1 className="text-[18px] text-[#453507] font-regular">Study Year : {Student.level}</h1>
            </div>
            <div className="flex h-[100%] items-start">
                <div className="flex items-center gap-[10px]">
                    <h1 className="text-[22px] text-[#453507] font-medium">525 XP</h1><img src={xp} className="w-[15px]" />
                </div>
            </div>
        </div>
    )
}