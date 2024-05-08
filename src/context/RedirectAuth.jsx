import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./hooks"

function AuthRedirectHandler({ children }) {
    const auth = useAuth();
    // defin pathname
    const pathname  = useLocation().pathname.toLowerCase();
    // redirect depend on path & stat of user
    const pathesAuth = ["/login", "/signup", "/emailverification"]
    if (auth.token && pathesAuth.includes(pathname)) {
        return (<Navigate to={"/dashboard"} replace={true} />)
    }
    return (
        <>
            {children}
        </>
  )
}

export default AuthRedirectHandler;