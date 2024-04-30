import Cours from "./Cours";
import algopic from '../../assets/Profile/algo.jpg'


export default function Recent_Courses() {


    return (
        <div className="px-[50px]">
            <h1 className="text-[22px] text-[#00333D] font-medium my-[30px]">Recent Courses</h1>
            <div className="bg-[#B2F2FF] py-[20px] px-[20px] rounded-[10px]">
                <Cours title={"algorithm"} score={30} xp={235} img={algopic} />


            </div>
        </div>
    )
}