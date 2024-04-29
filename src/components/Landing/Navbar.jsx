import logo from '../../assets/Landing/LogoBlack.svg';
import search from '../../assets/Landing/Search.svg'

export default function Navbar() {



    return (
        <div className='flex flex-row items-center justify-between mx-[100px] py-[50px] 
        xs:mx-[50px]
        sm:mx-[50px]
        md:mx-[100px] '>
            <img src={logo} alt="" />
            <div className='flex flex-row items-center justify-between gap-[50px]'>
                <button className=' 
                xs:hidden
                sm:block'><img src={search} alt="" /></button>
                <button className='w-[100px] h-[40px] bg-[#FCEE65] text-[#3D3700] rounded-[5px] text-[18px] font-bold [transition:background-color_0.3s_ease,_box-shadow_0.3s_ease] hover:bg-[#FAE200] hover:[box-shadow:0px_4px_10px_2px_rgba(0,_0,_0,_0.25)]
                '>Login</button>

            </div>
        </div>
    )
}
