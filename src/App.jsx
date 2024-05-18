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
import { useState } from 'react';
import ManageUsers from './pages/Admin/ManageUsers';




function App() {
  const { role } = useAuth(); 
  // Check if the browser is Firefox
  var isFirefox = typeof InstallTrigger !== 'undefined';
  if (isFirefox)
    document.documentElement.style.fontSize = "14px";
  return (
    <>
        <AuthRedirectHandler>
          <Routes>
            { 
            <Route path='/dashboard' element={<DashboardLayout />}>
                {role == "admin" && <Route path='users' element={<ManageUsers />}/>}
                {role == "specialist" && <Route path='courses' element={<ManageCourses />}/>}
                <Route path='notifactions' element={<>Notification</>} />
                <Route path='setting' element={<>Setting</>} />
              </Route>
            }
            <Route path='/test' element={<Test />} />
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/login/forget-password' element={<ForgetPassword />} />
            <Route path="/password_reset/:uidb64/:token" element={<ResetPassword />} />
            <Route path='/signup' element={<RegisterContextProvider><SignUp /></RegisterContextProvider>} />
            <Route path='/signup/step/:num' element={<RegisterContextProvider><SignUpStep /></RegisterContextProvider>} />
            <Route path='/emailverification' element={<RegisterContextProvider><EmailVerification /></RegisterContextProvider>} />
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