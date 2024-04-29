import ProgressBar from "../components/ProgressBar";
import RoleSelection from "./RoleSelection";
import { useRegister } from "../context/hooks";
import { useParams } from "react-router-dom";
import SelectTeachingYear from "./SelectTeachingYear";
import SpecialitySelection from "./SpecialitySelection";
import ModuleSelection from "./ModuleSelection ";

export default function SignUpStep() {
    
    const registerForm = useRegister();
    const { num } = useParams(); 

    return (
        <div className="container h-screen mx-auto py-12 px-5 relative">
            <ProgressBar />
            {num == 1 &&  <RoleSelection /> }
            {(num == 2 && registerForm.data.role == "Student") && <SelectTeachingYear />}
            {(num == 3 && registerForm.data.role == "Student") && <SpecialitySelection />}
            {(num == 4 && registerForm.data.role == "Student") && <ModuleSelection />}
        </div>
     )
}


