import { useState, useEffect } from "react";
import Infos from "../components/Profile/Infos";
import Navbar from "../components/Profile/Navbar";
import Recent_Courses from "../components/Profile/Recent_Courses";
import TimeSpent from "../components/Profile/TimeSpent";
import EditProfile from "../components/Profile/EditProfile";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import { useAuth } from "../context/hooks";
import axios from 'axios'; // Import Axios


export default function Profile() {
    const auth = useAuth()


    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    const [userData, setUserData] = useState(null);
    const [originalUserData, setOriginalUserData] = useState(null)
    const [refresh, setRefresh] = useState(localStorage.getItem("jwt-token-refresh"))


    const { id } = useParams()




    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('jwt-token-access');
                if (!token) {
                    // Handle case when token is missing
                    return;
                }
                const axiosInstance = axios.create({
                    baseURL: 'http://192.168.205.126:8000',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const response = await axiosInstance.get(`/users/profile/${id}`);
                if (response.status === 200) {
                    setUserData(response.data);
                    setOriginalUserData(response.data);
                } else {
                    console.error('Error fetching user data:', response.statusText);
                }
            } catch (error) {
                if (error.message == "Request failed with status code 401") {
                    axios.post('http://192.168.205.126:8000/users/api/token/refresh/', {
                        refresh: localStorage.getItem("jwt-token-refresh")
                    })
                        .then(res => {
                            localStorage.setItem('jwt-token-access', res.data.access);
                            setRefresh(res.data.access)
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
            } finally {
                // Set loading state to false regardless of success or failure
                setIsLoading(false);
            }
        };
        fetchUserData();
    }, [id, refresh]); // Include id as a dependency

    if (isLoading) {
        return <div>Loading ..</div>;
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
        console.log("from the update methode : ", updatedData)
        const token = localStorage.getItem('jwt-token-access');

        // Send updated profile data to Django backend
        axios.put('http://192.168.205.126:8000/users/api/profile/update/', updatedData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }

            }
        )
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