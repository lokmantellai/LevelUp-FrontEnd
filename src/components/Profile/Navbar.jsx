import logo from '../../assets/Profile/Logo.svg'
import search from '../../assets/Profile/Search.svg'
import not from '../../assets/Profile/Not.svg'
import per from '../../assets/Profile/Person.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/hooks';


export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { logout }= useAuth();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="prfNav h-[50px] w-[100%] bg-[#0095B2] flex items-center justify-between  
        xs:px-[50px] 
        sm:px-[50px] 
        md:px-[100px]
          ">
            <Link to="/">
                <img src={logo} alt="" className='h-[30px]' />
            </Link>


            <div className='flex 
            xs:gap-[25px]
            sm:gap-[25px]
            md:gap-[50px] '>
                <Link to="/" className=' text-[#fffffc] text-[14px] font-bold
                xs:hidden
                sm:block'>Dashboard</Link>
                <Link to="/Learn" className=' text-[#fffffc] text-[14px] font-bold
                xs:hidden
                sm:block'>Learn</Link>
            </div>
            <div className=' gap-[30%] items-center bg-[#00B7DB] w-[30%] h-[30px] rounded-[50px] px-[10px]
            xs:hidden
            sm:flex '>
                <img src={search} className='h-[15px]' alt="" />
                <h1 className='text-[#fffffc]'>Search for ...</h1>
            </div>
            <div className='flex justify-between items-center 
            xs:gap-[15px]
            sm:gap-[15px]
            md:gap-[25px]
            '>
                <img src={search} className='h-[20px]  
                xs:block
                sm:hidden
                md:hidden' />
                <img src={not} alt="" className='h-[25px] 
                xs:hidden
                sm:hidden
                md:block' />
                <div className='bg-[#FAE200] w-[30px] h-[25px] rounded-[100px]  justify-center items-center
                xs:hidden
                sm:hidden
                md:flex'>
                    <img src={per} alt="" className='w-[15px]' />
                </div>
                <div className='py-[10px] px-[10px]  flex justify-center items-center hover:cursor-pointer' onClick={toggleMenu}><FontAwesomeIcon className={`${isMenuOpen ? 'rotate-180 transition-transform duration-300 ease-out' : 'transition-transform duration-300 ease-out'}`} style={{ color: '#E8FBFF', height: '20px' }} icon={isMenuOpen ? faChevronDown : faBars} /></div>

            </div>
            {isMenuOpen && (
                <div className="menu-list flex justify-center items-center absolute min-w-[100px] bg-[#FFFFFC] p-[10px] top-[50px] rounded-tl-none rounded-br-[10px] rounded-tr-none rounded-bl-[10px]
                xs:right-[50px] 
                sm:right-[50px]
                md:right-[100px]  ">
                    <ul className='w-[100%] text-center'>
                        {window.innerWidth < 640 && <Link to="/"> <li className='p-[10px] hover:bg-[#00B7DB] hover:text-[#E8FBFF] rounded-[8px]'> Dashboard </li></Link >}
                        {window.innerWidth < 640 && <Link to="/Learn"><li className='p-[10px] hover:bg-[#00B7DB] hover:text-[#E8FBFF] rounded-[8px]'> Learn </li></Link >}
                        {window.innerWidth < 991 && <Link to="/Notification"><li className='p-[10px] hover:bg-[#00B7DB] hover:text-[#E8FBFF] rounded-[8px]'>Notifications </li></Link >}

                        <li className='p-[10px] hover:bg-[#00B7DB] hover:text-[#E8FBFF] rounded-[8px]'> <Link to="/">Setting</Link > </li>
                        <li className='p-[10px] hover:bg-[#00B7DB] hover:text-[#E8FBFF] rounded-[8px]'> <button onClick={logout}>Logout</button> </li>
                    </ul>
                </div>
            )}
        </div >

    )
}