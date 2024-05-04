import Cours from "./Cours";
import algopic from '../../assets/Profile/Algo.png'
import os from '../../assets/Profile/System.png'


export default function Recent_Courses() {


    return (
        <div className="
        xs:px-[25px]
        sm:px-[25px]
        md:px-[50px] ">
            <h1 className="text-[22px] text-[#00333D] font-medium my-[30px]">Recent Courses</h1>
            <div className="flex flex-col bg-[#B2F2FF] py-[20px] px-[20px] rounded-[10px] gap-[20px]">
                <Cours title={"Algorithms"} score={30} xp={235} img={algopic} />
                <Cours title={"Operating System"} score={13} xp={30} img={os} />


            </div>
        </div>
    )
}