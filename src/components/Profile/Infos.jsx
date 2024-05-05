import Student from "../../assets/Profile/Student.json"
import xp from "../../assets/Profile/XP.svg"
import bdg1 from "../../assets/Profile/bdg1.svg"
import bdg2 from "../../assets/Profile/bdg2.svg"
import bdg3 from "../../assets/Profile/bdg3.svg"
import _ from 'lodash'



export default function Infos({ data, onEditClick }) {

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
                <h1 className="text-[22px] text-[#453507] font-medium">{_.capitalize(data?.FirstName)} {_.capitalize(data?.LastName)}</h1>
                <h1 className="text-[18px] text-[#453507] font-regular">University : {_.capitalize(data?.University)}</h1>
                <h1 className="text-[18px] text-[#453507] font-regular">Degree : {_.capitalize(data?.Degree)}</h1>
                <h1 className="text-[18px] text-[#453507] font-regular">Speciality : {_.capitalize(data?.Speciality)}</h1>
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
                    {data?.CanEdit && <button onClick={onEditClick} className="w-[120px] h-[40px] bg-[#FCEE65] text-[#3D3700] text-[16px] font-medium rounded-[8px] [transition:background-color_0.3s_ease,_box-shadow_0.3s_ease] hover:bg-[#FAE200] hover:[box-shadow:0px_4px_10px_2px_rgba(0,_0,_0,_0.25)]">Edit Profile</button>}
                    <button className="w-[120px] h-[40px] bg-[#FCEE65] text-[#3D3700] text-[16px] font-medium rounded-[8px] [transition:background-color_0.3s_ease,_box-shadow_0.3s_ease] hover:bg-[#FAE200] hover:[box-shadow:0px_4px_10px_2px_rgba(0,_0,_0,_0.25)]">View Badges</button>
                </div>
            </div>
        </div>
    )
}