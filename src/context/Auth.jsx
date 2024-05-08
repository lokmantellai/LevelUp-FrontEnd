import { jwtDecode } from "jwt-decode";
import { createContext, useState } from 'react';
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export const ContextProvider = ({ children }) => {
    const initialToken = localStorage.getItem('jwt-token-access');
    const initialUser = initialToken ? jwtDecode(initialToken) : null;

    const [token, setToken] = useState(initialToken);
    const [user, setUser] = useState(initialUser);
    const navigate = useNavigate();

    const login = (data) => {
        const { access_token, refresh_token } = data;
        localStorage.setItem('jwt-token-access', access_token);
        localStorage.setItem('jwt-token-refresh', refresh_token);
        setToken(access_token);
        setUser(jwtDecode(access_token)); // Decode token and set user
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('jwt-token-access');
        localStorage.removeItem('jwt-token-refresh');
    };
    const redirectToLogin = () => {
        console.log("HEy Go To Login")
        navigate("/login");
    }

    return (
        <AuthContext.Provider value={{ login, logout, token, user ,setToken ,setUser, redirectToLogin}}>
            {children}
        </AuthContext.Provider>
    );
};
