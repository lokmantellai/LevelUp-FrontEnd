import Infos from "../components/Profile/Infos";
import Navbar from "../components/Profile/Navbar";
import Recent_Courses from "../components/Profile/Recent_Courses";

export default function Profile() {


    return (
        <div id="Profile" className="Profile ">
            <Navbar />
            <Infos />
            <Recent_Courses />
        </div>
    )
}