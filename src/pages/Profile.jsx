import { useState, useEffect } from "react";
import Infos from "../components/Profile/Infos";
import Navbar from "../components/Profile/Navbar";
import Recent_Courses from "../components/Profile/Recent_Courses";
import TimeSpent from "../components/Profile/TimeSpent";
import EditProfile from "../components/Profile/EditProfile";
import { useParams } from "react-router-dom";
import useAxios from "../api/useAxios";
import Loading from "../components/Loading";


export default function Profile() {
    const { privateAxios } = useAxios();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const [userData, setUserData] = useState(null);
    const [originalUserData, setOriginalUserData] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        console.log("Hello From Pofile!");
        const fetchUserData = async () => {
            try {
                const response = await privateAxios.get(`/users/profile/${id}`);
                if (response.status === 200) {
                    setUserData(response.data);
                    setOriginalUserData(response.data);
                } else {
                    console.error('Error fetching user data:', response.statusText);
                }
            } finally {
                // Set loading state to false regardless of success or failure
                setIsLoading(false);
            }
        };
        fetchUserData();
    }, [id]); // Include id as a dependency

    if (isLoading) {
        return <Loading />;
    }


    const handleEditButtonClick = () => {
        setIsEditing(true);
    };


    const handleSave = (updatedInfo) => {


        const updatedData = {
            first_name: updatedInfo.FirstName,
            last_name: updatedInfo.LastName,
            speciality: updatedInfo.Speciality,
            degree: updatedInfo.Degree
        };
        // Send updated profile data to Django backend
        privateAxios.put('/users/api/profile/update/', updatedData)
        setUserData(updatedInfo);
        setOriginalUserData(updatedInfo);
        // Exit edit mode
        setIsEditing(false);
    };


    const handleDiscardChanges = () => {
        // Reset profileInfo back to its original state
        setUserData(originalUserData);
        setIsEditing(false);
    };



    return (
        <div id="Profile" className="Profile ">
            <Navbar />
            {isEditing ? (<EditProfile data={userData} onSave={handleSave} onDiscard={handleDiscardChanges} />) : (<Infos data={userData} onEditClick={handleEditButtonClick} />)}

            <TimeSpent data={userData} />
            <Recent_Courses />
        </div>
    )
}