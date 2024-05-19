import { Route, Routes } from 'react-router-dom';
import { Header, SideBar } from "./components/SpecialistDashboard/Components";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import './App.css'
import Login from './pages/Login'
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import { RegisterContextProvider } from './context/Register';
import SignUpStep from './pages/SignStep';
import EmailVerification from './pages/EmailVerification';
import Profile from './pages/Profile';

import AuthRedirectHandler from './context/RedirectAuth';
import NotFound from './pages/NotFound';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';

import ManageCourses from './pages/Specialist/ManageCourses';
import { Outlet } from 'react-router-dom/dist';
import { useAuth } from './context/hooks';
import { useEffect, useState } from 'react';
import ManageUsers from './pages/Admin/ManageUsers';
import useAxios from './api/useAxios';
import Loading from './components/Loading';
import Navbar from './components/Profile/Navbar';



function App() {
  const { token, setUserInfo, user } = useAuth(); 
  const { privateAxios } = useAxios();
  const [isLoading , setIsLoading] = useState(true)
  useEffect(() => {
    console.log(user?.role)
    if (!user?.role) {
      setIsLoading(true);
      console.log("fffff")
      privateAxios.post("users/userByToken/", { access_token: token })
      .then((res) => {
        console.log("this is res ",res.data);
        setUserInfo(res.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      })
    } else 
      setIsLoading(false)
  }, [user]);

  // Check if the browser is Firefox
  var isFirefox = typeof InstallTrigger !== 'undefined';
  if (isFirefox)
    document.documentElement.style.fontSize = "14px";
  if (isLoading)
    return (
     <Loading />
    )
  return (
    <>
        <AuthRedirectHandler>
          <Routes>
          {!user?.role && <Route path='/' element={<Home />} />}
          {(user && user?.role != "student")  &&
            <Route path='/' element={<DashboardLayout />}>
                {user?.role == "admin" && <Route path='users' element={<ManageUsers />}/>}
                {user?.role == "specialist" && <Route path='courses' element={<ManageCourses />}/>}
                
                <Route path='notifactions' element={<>Notification</>} />
                <Route path='setting' element={<>Setting</>} />
            </Route>
          }
          {(user && user?.role == "student") && 
            <Route path='/' element={<DashboardStudentLayout />}>
              <Route path='' element={<>Dashboard</>} />
              <Route path='learn' element={<>Learn</>} />
            </Route>
          }

            <Route path='/test' element={<Test />} />
            <Route path='/login' element={<Login />} />
            <Route path='/login/forget-password' element={<ForgetPassword />} />
            <Route path="/password_reset/:uidb64/:token" element={<ResetPassword />} />
            <Route path='/signup' element={<RegisterContextProvider><SignUp /></RegisterContextProvider>} />
            <Route path='/signup/step/:num' element={<RegisterContextProvider><SignUpStep /></RegisterContextProvider>} />
            <Route path='/emailverification' element={<EmailVerification />} />
            <Route path='/profile/:id' element={<Profile />} />
            <Route path='*' element={<NotFound />} /> {/* Catch all other routes */}
          </Routes>
        </AuthRedirectHandler>
    </>
  )
}

export default App;


function DashboardLayout() {
  return (
  <div className="flex  bg-[#FFFFFC]" >
      <SideBar />
      <div className=" flex flex-col flex-1 pb-[20] ">
        <Header />
        <Outlet />
      </div>
  </div>
  )
}
function DashboardStudentLayout() {
  return (
    <div className="flex  bg-[#FFFFFC]" >
      <Navbar />
      <Outlet />
  </div>
  )
}

function Test() {
  const [isOpen, setIsOpen] = useState(false);
  const [choosed, setChoosed] = useState("None")
  function click() {
    console.log("Hey dddccq");
    console.log("Hey dddccq");
    console.log("Hey dddccq");
    console.log("Hey dddccq");
  }
  return (
    <div>
      <label>Test</label>
      <br/>
      <button onClick={click()} >Click </button>
    </div>
  )
}