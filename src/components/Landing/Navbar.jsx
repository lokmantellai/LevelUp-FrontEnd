import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/Landing/LogoBlack.svg';
import search from '../../assets/Landing/Search.svg'
import { useAuth } from '../../context/hooks';

export default function Navbar() {
    const auth = useAuth();
    const navigate = useNavigate();
    const logout = () => {
        console.log("logout");
        auth.logout();
        navigate("/login")
    }
    return (
        <div className='flex flex-row items-center justify-between py-[25px] 
        xs:mx-[50px]
        sm:mx-[50px]
        md:mx-[100px] '>
            <img src={logo} className='h-[30px]' alt="" />
            <div className='flex flex-row items-center justify-between gap-[50px]'>
                <button className=' h-[30px]
                xs:hidden
                sm:block'><img src={search} alt="" /></button>
                {
                   auth.token ?  
                        <button onClick={logout}
                            className='w-[80px] h-[30px] flex justify-center items-center  bg-[#FCEE65] text-[#3D3700] rounded-[5px] text-[14px] font-bold [transition:background-color_0.3s_ease,_box-shadow_0.3s_ease] hover:bg-[#FAE200] hover:[box-shadow:0px_4px_10px_2px_rgba(0,_0,_0,_0.25)]
                '>Logout
                    </button>
                    : <Link to="/login">
                    <button className='w-[80px] h-[30px] flex justify-center items-center  bg-[#FCEE65] text-[#3D3700] rounded-[5px] text-[14px] font-bold [transition:background-color_0.3s_ease,_box-shadow_0.3s_ease] hover:bg-[#FAE200] hover:[box-shadow:0px_4px_10px_2px_rgba(0,_0,_0,_0.25)]
                '>Login</button>
                </Link>
                }
                

            </div>
        </div>
    )
}
