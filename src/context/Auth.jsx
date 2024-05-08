import { createContext, useState } from "react"

export const AuthContext = createContext(null);
export const ContextProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('jwt-token-access'));
    const login = (data) => {
        localStorage.setItem('jwt-token-access', data.access_token);
        localStorage.setItem('jwt-token-refresh', data.refresh_token);
        console.log(data.access_token)
        setToken(data.access_token);
    }
    const logout = () => {
        setToken(null);
        localStorage.removeItem('jwt-token-access');
        localStorage.removeItem('jwt-token-refresh');
    }
    return (
        <AuthContext.Provider value={{ login, logout, token}}>
            {children}
        </AuthContext.Provider>
    )
}
