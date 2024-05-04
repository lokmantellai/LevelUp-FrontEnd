import { useState, useEffect } from "react";
import Infos from "../components/Profile/Infos";
import Navbar from "../components/Profile/Navbar";
import Recent_Courses from "../components/Profile/Recent_Courses";
import TimeSpent from "../components/Profile/TimeSpent";
import EditProfile from "../components/Profile/EditProfile";
import { useParams } from "react-router-dom";

export default function Profile() {


    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState(null);

    const { id } = useParams()


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`htt://192.168.205.126:8000/users/profile/${id}`); // Replace '/api/user' with your actual API endpoint
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    const handleEditButtonClick = () => {
        setIsEditing(true);
    };

    return (
        <div id="Profile" className="Profile ">
            <Navbar />
            {isEditing ? (<EditProfile data={userData} />) : (<Infos data={userData} onEditClick={handleEditButtonClick} />)}

            <TimeSpent />
            <Recent_Courses />
        </div>
    )
}