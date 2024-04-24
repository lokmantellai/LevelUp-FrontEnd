import { Route, Routes } from 'react-router-dom';
import './App.css'
import Login from'./pages/Login'
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import SignUpStep from './pages/SignUpStep';

function App() {
  // Check if the browser is Firefox
  var isFirefox = typeof InstallTrigger !== 'undefined';
  if (isFirefox) 
    document.documentElement.style.fontSize = "16px";
    return (
      <>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/SingUp' element={<SignUp />} />
          <Route path='/SingUp/step' element={<SignUpStep />} />
       </Routes>
      </>
    )
  }

export default App
