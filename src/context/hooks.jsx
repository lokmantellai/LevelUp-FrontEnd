import { AuthContext } from "./Auth";
import { EnrollCourseContext } from "./CourseStep";
import { RegisterContext } from "./Register";
import { useContext } from "react";
export const useRegister = () => {
    return useContext(RegisterContext);
}
export const useAuth = () => {
    return useContext(AuthContext);
}
export const useEnroll = () => {
    return useContext(EnrollCourseContext);
}