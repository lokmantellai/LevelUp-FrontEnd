import logo from '../../assets/Profile/Logo.svg'
import search from '../../assets/Profile/Search.svg'
import learn from '../../assets/StudentDashboard/Learn.png'
import database from '../../assets/StudentDashboard/database.svg'
import not from '../../assets/Profile/Not.svg'
import per from '../../assets/Profile/Person.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/hooks';


export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const { logout } = useAuth();
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const linkStyle = 'text-[#fffffc] text-[17px] font-medium relative xs:hidden sm:block';
    const activeLinkStyle = 'text-[#FAE200] text-[17px] font-medium relative xs:hidden sm:block'; // example active style
    
    return (
        <div className="relative z-50 prfNav h-[80px] w-[100%] bg-[#0095B2] flex items-center justify-between  
        xs:px-[50px] 
        sm:px-[50px] 
        md:px-[100px]
        ">
            <Link to="/">
                <img src={logo} alt="" className='h-[40px]' />
            </Link>
            <div className='flex 
            xs:gap-[25px]
            sm:gap-[25px]
            md:gap-[50px] '>
                <Link to="/" className={location.pathname.toLowerCase() === '/' ? activeLinkStyle : linkStyle} >
                    Dashboard
                    {location.pathname.toLowerCase() === '/' &&
                        <div className='h-[4px] w-full bg-[#FAE200] absolute -bottom-[29px]'></div>
                    }
                </Link>
                <Link to="/Learn" className={location.pathname.toLowerCase() === '/learn' ? activeLinkStyle : linkStyle} >Learn
                    {location.pathname.toLowerCase() === '/learn' &&
                        <div className='h-[4px] w-full bg-[#FAE200] absolute -bottom-[29px]'></div>
                    }
                </Link>
            </div>
            <div className='w-[28%] h-[40px] relative'>
                <input onBlur={() => {
                    setIsSearchOpen(false);
                }} onFocus={() => {
                    setIsSearchOpen(true);
            }} type='search' className='gap-[30%] items-center bg-[#00B7DB]  w-full h-full rounded-[6px] pl-[42px] pr-[15px] focus-within:outline-none text-[#fffffc] placeholder:text-[#fffffc] placeholder:font-[Ubuntu]
            xs:hidden
            sm:flex ' />
                <img src={search} className='w-[18px] h-[18px] absolute top-1/2 -translate-y-1/2 left-[10px]' />
                { isSearchOpen &&
                <ul className='absolute w-full  bg-[#00B7DB] top-[115%] rounded-[5px] text-[17px]'>
                <li className='h-[50px] flex items-center font-medium text-[#00333D] py-[2px] px-[10px] gap-3 hover:bg-[#00aacb]'> 
                    <img className='w-[33px] h-[33px]' src={learn} />
                    <span>DataBase</span>
                </li>
                <li className='h-[50px] flex items-center font-medium text-[#00333D] py-[2px] px-[10px] gap-3 hover:bg-[#00aacb] pr-[15px]'> 
                    <img className='w-[36px] h-[36px]' src={learn} />
                    <div className='flex flex-1 justify-between'>
                        <div>DataBase</div>
                        <div className='text-[16px]'>Beginner</div>
                    </div>

                </li>
                <li className='h-[50px] flex items-center font-medium text-[#00333D] py-[2px] px-[10px] gap-3 hover:bg-[#00aacb]'> 
                    <img className='w-[36px] h-[36px]' src={learn} />
                    <span>DataBase</span>
                </li>
            </ul>
                }
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