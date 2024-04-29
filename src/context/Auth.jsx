import { createContext, useState } from "react"

export const AuthContext = createContext(null);
export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const login = (user) => {
        setUser(user);
        console.log(user)
    }
    const logout = () => {
        setUser(null)
    }
    return (
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
   )
}
