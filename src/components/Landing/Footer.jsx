import Logo from '../../assets/Landing/LogoFooter.svg'
import ig from '../../assets/Landing/instagram.svg'
import ighover from '../../assets/Landing/ighover.png'
import tw from '../../assets/Landing/twitter.svg'
import twhover from '../../assets/Landing/twhover.png'
import fb from '../../assets/Landing/facebook.svg'
import fbhover from '../../assets/Landing/fbhover.png'
import li from '../../assets/Landing/linkedin.svg'
import lihover from '../../assets/Landing/lihover.png'

import Logohover from '../../assets/Landing/LogoHover.svg'
import { Link } from 'react-router-dom';

export default function Footer() {

    return (
        <div className="flex flex-col py-[100px] px-[100px] bg-[#00333D] gap-[100px]">
            <div className="Upper flex flex-row  
            sm:flex-col sm:items-center sm:gap-[100px]
            md:flex-row md:justify-between md:items-start 
            ">
                <Link to="#home">
                    <button><img src={Logo} alt="" onMouseEnter={(e) => (e.currentTarget.src = Logohover)} onMouseLeave={(e) => (e.currentTarget.src = Logo)} /></button>
                </Link>
                <div className='flex flex-row items-stretch
                sm:gap-[200px]
                md:gap-[300px]'>
                    <div className='flex flex-col gap-[30px]
                    xs:items-center
                    sm:items-center
                    md:items-start 
                '>
                        <button><h1 className='text-[26px] text-[#E8FBFF] font-extrabold'>Company</h1></button>
                        <button><h2 className='text-[18px] text-[#E8FBFF] font-bold hover:text-[#32DBFC]'>Carrers</h2></button>
                        <button><h2 className='text-[18px] text-[#E8FBFF] font-bold hover:text-[#32DBFC]'>Educators</h2></button>
                        <button><h2 className='text-[18px] text-[#E8FBFF] font-bold hover:text-[#32DBFC]'>Press</h2></button>
                        <button><h2 className='text-[18px] text-[#E8FBFF] font-bold hover:text-[#32DBFC]'>Help</h2></button>
                    </div>
                    <div className='flex flex-col gap-[30px]
                    sm:items-center
                    md:items-start'>
                        <button><h1 className='text-[26px] text-[#E8FBFF] font-extrabold'>Product</h1></button>
                        <button> <h2 className='text-[18px] text-[#E8FBFF] font-bold hover:text-[#32DBFC]'>Courses</h2></button>
                        <button> <h2 className='text-[18px] text-[#E8FBFF] font-bold hover:text-[#32DBFC]'>Games</h2></button>
                        <button> <h2 className='text-[18px] text-[#E8FBFF] font-bold hover:text-[#32DBFC]'>Testimonials</h2></button>
                    </div>
                </div>
            </div>
            <div className='Center flex  
            sm:flex-col-reverse sm:items-center sm:gap-[100px]
            md:flex-row md:justify-between md:gap-[50px] '>
                <div className='flex flex-row gap-[100px]'>
                    <h5 className='text-[16px] text-[#E8FBFF] font-normal hover:text-[#32DBFC]'>Help</h5>
                    <h5 className='text-[16px] text-[#E8FBFF] font-normal hover:text-[#32DBFC]'>Terms & Services</h5>
                    <h5 className='text-[16px] text-[#E8FBFF] font-normal hover:text-[#32DBFC]'>Privacy policy</h5>
                </div>
                <div className='flex flex-row gap-[50px]'>
                    <img src={fb} className='w-[30px] h-[30px]' alt="" onMouseEnter={(e) => (e.currentTarget.src = fbhover)} onMouseLeave={(e) => (e.currentTarget.src = fb)} />
                    <img src={ig} className='w-[30px] h-[30px]' alt="" onMouseEnter={(e) => (e.currentTarget.src = ighover)} onMouseLeave={(e) => (e.currentTarget.src = ig)} />
                    <img src={tw} className='w-[30px] h-[30px]' alt="" onMouseEnter={(e) => (e.currentTarget.src = twhover)} onMouseLeave={(e) => (e.currentTarget.src = tw)} />
                    <img src={li} className='w-[30px] h-[30px]' alt="" onMouseEnter={(e) => (e.currentTarget.src = lihover)} onMouseLeave={(e) => (e.currentTarget.src = li)} />
                </div>
            </div>
            <div className=' flex justify-center items-center'>
                <h1 className='text-[18px] text-[#E8FBFF] font-normal'>© 2024 LevelUp, Inc. All Rights Reserved.</h1>
            </div>
        </div>
    )
}