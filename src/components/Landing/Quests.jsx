import Accordion from "./Accordion";
import { quests } from "../../assets/Landing/Data";


export default function Quests() {







    return (
        <div className="bg-[#006073] py-[100px] px-[100px] flex flex-col gap-[50px] 
        md:py-[100px] md:px-[100px]
        sm:py-[50px] sm:px-[50px]">
            <h1 className="text-[#E8FBFF] text-[36px] font-extrabold text-center">Frequently Asked Questions</h1>

            <div className="grid grid-cols-12 gap-5 justify-center">
                <div className="col-span-2 
                sm:col-span-1"> </div>
                <div className=" col-span-8 
                sm:col-span-10" >
                    {quests.map((ele) =>
                        <>
                            <Accordion key={quests.indexOf(ele)} title={ele.quest} content={ele.answer} />
                            {/* <div className="w-[100%] border-b-[3px] border-[#E8FBFF]"></div> */}
                        </>
                    )}
                </div>
            </div>

        </div>
    )
}