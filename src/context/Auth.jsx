import { createContext, useState } from "react"

export const AuthContext = createContext(null);
export const ContextProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('jwt-token'));
    const login = (access_token,refresh_token) => {
        localStorage.setItem('jwt-token-access', access_token);
        localStorage.setItem('jwt-token-refresh', refresh_token);
        setToken(access_token);
    }
    const logout = () => {
        setToken(null)
    }
    const showToken = () => {
        return(token);
    }
    return (
        <AuthContext.Provider value={{login,logout, showToken}}>
            {children}
        </AuthContext.Provider>
   )
}
