import Logo from '../../assets/Landing/LogoFooter.svg'
import ig from '../../assets/Landing/instagram.svg'
import tw from '../../assets/Landing/twitter.svg'
import fb from '../../assets/Landing/facebook.svg'
import li from '../../assets/Landing/linkedin.svg'
import { Link } from 'react-router-dom';

export default function Footer() {

    return (
        <div className="flex flex-col py-[100px] px-[100px] bg-[#00333D] gap-[100px]">
            <div className="Upper flex flex-row  
            sm:flex-col sm:items-center sm:gap-[100px]
            md:flex-row md:justify-between md:items-start 
            ">
                <Link to="#home">
                    <button><img src={Logo} alt="" /></button>
                </Link>
                <div className='flex flex-row items-stretch
                sm:gap-[200px]
                md:gap-[300px]'>
                    <div className='flex flex-col gap-[30px]
                    sm:items-center
                    md:items-starts'>
                        <button><h1 className='text-[26px] text-[#E8FBFF] font-extrabold'>Company</h1></button>
                        <button><h2 className='text-[18px] text-[#E8FBFF] font-bold'>Carrers</h2></button>
                        <button><h2 className='text-[18px] text-[#E8FBFF] font-bold'>Educators</h2></button>
                        <button><h2 className='text-[18px] text-[#E8FBFF] font-bold'>Press</h2></button>
                        <button><h2 className='text-[18px] text-[#E8FBFF] font-bold'>Help</h2></button>
                    </div>
                    <div className='flex flex-col gap-[30px]
                    sm:items-center
                    md:items-start'>
                        <button><h1 className='text-[26px] text-[#E8FBFF] font-extrabold'>Product</h1></button>
                        <button> <h2 className='text-[18px] text-[#E8FBFF] font-bold'>Courses</h2></button>
                        <button> <h2 className='text-[18px] text-[#E8FBFF] font-bold'>Games</h2></button>
                        <button> <h2 className='text-[18px] text-[#E8FBFF] font-bold'>Testimonials</h2></button>
                    </div>
                </div>
            </div>
            <div className='Center flex  
            sm:flex-col-reverse sm:items-center sm:gap-[50px]
            md:flex-row md:justify-between '>
                <div className='flex flex-row gap-[100px]'>
                    <h5 className='text-[16px] text-[#E8FBFF] font-normal'>Help</h5>
                    <h5 className='text-[16px] text-[#E8FBFF] font-normal'>Terms & Services</h5>
                    <h5 className='text-[16px] text-[#E8FBFF] font-normal'>Privacy policy</h5>
                </div>
                <div className='flex flex-row gap-[50px]'>
                    <img src={fb} alt="" />
                    <img src={ig} alt="" />
                    <img src={tw} alt="" />
                    <img src={li} alt="" />
                </div>
            </div>
            <div className=' flex justify-center items-center'>
                <h1 className='text-[18px] text-[#E8FBFF] font-normal'>© 2024 LevelUp, Inc. All Rights Reserved.</h1>
            </div>
        </div>
    )
}