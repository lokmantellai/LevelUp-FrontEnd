import { createContext, useState } from "react"
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);
export const ContextProvider = ({ children }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem('jwt-token'));
    const [user, setUser] = useState(null);
    const login = (data) => {
        localStorage.setItem('jwt-token-access', data.access_token);
        localStorage.setItem('jwt-token-refresh', data.refresh_token);
        setUser({ fullname: data.full_name, email: data.username });
        setToken(data.access_token);
    }
    const logout = () => {
        setToken(null)
        setUser(null)
    }
    const showToken = () => {
        return(token);
    }
    if (user && (pathname.toLowerCase().startsWith("/login") || pathname.toLowerCase().startsWith("/signup"))) {
        return <Navigate to={"/"} />;
    }
    return (
        <AuthContext.Provider value={{login,logout, showToken , user}}>
            {children}
        </AuthContext.Provider>
   )%
}