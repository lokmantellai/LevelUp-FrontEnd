import TimeCounter from "./TimeCounter";

export default function TimeSpent({ data }) {


    return (
        <div className="
        xs:px-[25px]
        sm:px-[25px]
        md:px-[50px]
        ">
            <h1 className="text-[22px] text-[#00333D] font-medium my-[30px]">Time Spent</h1>
            <div className="flex gap-[150px] justify-center items-center">
                <div className="flex flex-col  items-center gap-[30px]" >
                    <TimeCounter spent={data?.DailyTimeSpent} type={'daily'} />
                    <div className="flex flex-col  items-center ">
                        <h1 className="text-[22px] text-[#00333D] font-medium">Daily</h1>
                        <h1 className="text-[22px] text-[#00333D] font-medium">(Goal : 2h)</h1>
                    </div>
                </div>
                <div className="flex flex-col  items-center gap-[30px]">
                    <TimeCounter spent={600} type={'weekly'} />
                    <div className="flex flex-col  items-center ">
                        <h1 className="text-[22px] text-[#00333D] font-medium">Weekly</h1>
                        <h1 className="text-[22px] text-[#00333D] font-medium">(Goal : 14h)</h1>
                    </div>

                </div>
                <div className="flex flex-col  items-center gap-[30px]">
                    <TimeCounter spent={2500} type={'monthly'} />
                    <div className="flex flex-col  items-center ">
                        <h1 className="text-[22px] text-[#00333D] font-medium">Monthly</h1>
                        <h1 className="text-[22px] text-[#00333D] font-medium">(Goal : 56h)</h1>
                    </div>


                </div>



            </div>

        </div>
    )
}