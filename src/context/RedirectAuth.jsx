import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./hooks";
import { useState, useEffect } from "react";

function AuthRedirectHandler({ children }) {
    const auth = useAuth();
    const [block, setBlock] = useState(false);
    const location = useLocation();

    useEffect(        // Define an array of paths that require authentication
() => {
        const pathsAuth = ["/login", "/signup", "/emailverification", "/password_reset"];
        // Check if the current pathname starts with any of the paths in pathsAuth
        const isBlocked = pathsAuth.some((path) => location.pathname.toLowerCase().startsWith(path));
        
        // Set block state based on authentication status and path
      //  setBlock(auth.token && isBlocked);
    }, [auth.token, location.pathname]);

    // Redirect if the user is authenticated and the current path is in pathsAuth
    if (block) {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
}

export default AuthRedirectHandler;
