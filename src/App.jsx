import { Route, Routes } from 'react-router-dom';
import './App.css'
import Login from './pages/Login'
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import { ContextProvider } from './context/Auth';
import { RegisterContextProvider } from './context/Register';
import SignUpStep from './pages/SignStep';
import SpecialistDashboard from './pages/Specialist/SpecialistDashboard';
import EmailVerification from './pages/EmailVerification';
import Profile from './pages/Profile';

import AuthRedirectHandler from './context/RedirectAuth';
import NotFound from './pages/NotFound';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';

import ManageCourses from './pages/Specialist/ManageCourses';


function App() {
  // Check if the browser is Firefox
  var isFirefox = typeof InstallTrigger !== 'undefined';
  if (isFirefox)
    document.documentElement.style.fontSize = "14px";
  return (
    <>
      <ContextProvider>

        <AuthRedirectHandler>

          <Routes>
            <Route path='/dashboard' element={<SpecialistDashboard />} />
            <Route path='/dashboard/courses' element={<ManageCourses />} />

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

      </ContextProvider>
    </>
  )
}

export default App;
