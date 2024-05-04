import xppic from '../../assets/Profile/xp.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function Cours({ title, img, score, xp }) {



    return (
        <div className="bg-[#E8FBFF] py-[20px] px-[20px] flex justify-around items-center h-[100px] rounded-[10px]  text-[20px] text-[#00333D] font-medium
        xs:flex-col xs:h-[100%] xs:gap-[10px] 
        sm:flex-col sm:h-[100%] sm:gap-[10px]
        md:flex-row">
            <div className='flex justify-around items-center 
            xs:w-[100%] xs:flex-col xs:gap-[20px]
            sm:w-[100%]
            md:w-[40%]'>
                <img src={img} className='h-[50px] ' alt="" />
                <h1 >
                    {title}
                </h1>
                <div className='flex gap-[5px] items-center'><h1>{xp}XP</h1><img src={xppic} alt="" className='h-[30px]' /></div>

            </div>
            <div className='flex justify-around items-center  
            xs:w-[100%] xs:gap-[20px] xs:flex-col
            sm:w-[100%] sm:gap-[50px]
            md:w-[60%]'>
                <div className="w-[40%] flex gap-[20px] items-center 
            xs:w-[100%]">
                    <h1>
                        {score}%
                    </h1>
                    <div className="w-[100%] h-[15px] rounded-[50px] bg-[#B2F2FF]">
                        <div className=" h-[15px] rounded-[50px] bg-[#FAE200] " style={{ width: `${score}%` }}></div>
                    </div>
                </div>
                <div>
                    <button className='flex items-center justify-center gap-[10px] w-[120px] h-[40px] bg-[#FCEE65] text-[#3D3700] text-[16px] font-medium rounded-[8px] [transition:background-color_0.3s_ease,_box-shadow_0.3s_ease] hover:bg-[#FAE200] hover:[box-shadow:0px_4px_10px_2px_rgba(0,_0,_0,_0.25)]'>Continue <FontAwesomeIcon icon={faChevronRight} /></button>
                </div>
            </div>
        </div>
    )
}