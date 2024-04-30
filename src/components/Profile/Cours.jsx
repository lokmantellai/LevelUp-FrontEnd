import xppic from '../../assets/Profile/xp.svg'

export default function Cours({ title, img, score, xp }) {



    return (
        <div className="bg-[#E8FBFF] py-[10px] px-[10px] flex justify-between items-center h-[100px] rounded-[10px]  text-[20px] text-[#00333D] font-medium">
            <img src={img} className='h-[80px] rounded-[10px]' alt="" />
            <h1 >
                {title}
            </h1>
            <div className="w-[100%] flex gap-[20px] items-center">
                <h1>
                    {score}%
                </h1>
                <div className="w-[30%] h-[15px] rounded-[50px] bg-[#B2F2FF]">
                    <div className=" h-[15px] rounded-[50px] bg-[#FAE200] " style={{ width: `${score}%` }}></div>
                </div>
            </div>
            <div className='flex gap-[5px] items-center'><h1>{xp}XP</h1><img src={xppic} alt="" className='h-[30px]' /></div>

        </div>
    )
}