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
import ManageCourses from './pages/Specialist/ManageCourses';

function App() {
  // Check if the browser is Firefox
  var isFirefox = typeof InstallTrigger !== 'undefined';
  if (isFirefox)
    document.documentElement.style.fontSize = "14px";
  return (
    <>
      <ContextProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<RegisterContextProvider><SignUp /></RegisterContextProvider>} />
          <Route path='/signup/step/:num' element={<RegisterContextProvider><SignUpStep /></RegisterContextProvider>} />
          <Route path='/emailverification' element={<RegisterContextProvider><EmailVerification /></RegisterContextProvider>} />
          <Route path='/dashboard' element={<SpecialistDashboard />} />
          <Route path='/dashboard/courses' element={<ManageCourses />} />
          <Route path='/profile/:id' element={<Profile />} />
        </Routes>
      </ContextProvider>
    </>
  )
}

export default App;
