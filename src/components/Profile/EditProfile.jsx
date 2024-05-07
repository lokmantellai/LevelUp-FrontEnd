import Student from "../../assets/Profile/Student.json"
import { Dropdown } from 'primereact/dropdown';
import { useState } from "react"

import bdg1 from '../../assets/Profile/bdg1.svg'
import bdg2 from '../../assets/Profile/bdg2.svg'
import bdg3 from '../../assets/Profile/bdg3.svg'
import _ from 'lodash';



export default function EditProfile({ data, onSave, onDiscard }) {


    const [editedInfo, setEditedInfo] = useState(data);

    const [selectedSpicality, setSelectedSpicality] = useState({ name: _.capitalize(editedInfo.Speciality) })
    const [selectedDegree, setSelectedDegree] = useState({ name: _.capitalize(editedInfo.Degree) })







    const handleChange = (e) => {

        let { name, value } = e.target



        console.log('selectedDegree.name', selectedDegree.name)
        setEditedInfo(prevInfo => ({
            ...prevInfo,
            [name]: (name === 'Degree' || name === 'Speciality') ? value.name : value,
            speciality: selectedSpicality.name,
            degree: selectedDegree.name,
        })
        );

        console.log(e.target)

    };

    const handleSaveClick = () => {

        onSave(editedInfo);
    };
    const handleDiscardClick = () => {
        // Call the onDiscard function passed from the parent component
        onDiscard();
    };


    const degrees = [
        { name: 'Bachelor 1st year' },
        { name: 'Bachelor 2nd year' },
        { name: 'Bachelor 3rd year' },
        { name: 'Master 1st year' },
        { name: 'Master 2nd year' }

    ];



    const specialities = [
        { name: 'Information Technology' },
        { name: 'Software Engineer' },
        { name: 'Pre-Computer Science' },
        { name: 'Cybersecurity' },
        { name: 'Big Data & AI' }
    ];


    return (

        <div className="flex flex-col bg-[#E8FBFF] rounded-[10px] 
        sm:mx-[25px] sm:my-[25px]   
        md:mx-[50px] md:my-[50px] ">
            <div className="flex flex-col mx-[100px] my-[50px] gap-[50px]">
                <h1 className=" text-[22px] text-[#453507] font-medium  ">
                    Edit Profile
                </h1>
                <div className="flex flex-row items-start justify-center gap-[200px]">
                    <div className="flex flex-col justify-between items-center gap-[30px]">
                        <img src={Student.img} alt="" className="rounded-full col-span-2 w-[190px] " />
                        <button className="w-[170px] h-[50px] bg-[#FCEE65] text-[#3D3700] text-[16px] font-medium rounded-[8px] [transition:background-color_0.3s_ease] hover:bg-[#FAE200] ">Change Avatar</button>
                    </div>
                    <div className="flex flex-col gap-[30px] ">
                        <div className="flex gap-[20px]">
                            <div className="flex flex-col justify-start items-start gap-[10px]">
                                <h1 className="text-[#3D3700] text-[16px] font-medium ">Firstname</h1>
                                <input name="FirstName" className="w-[290px]  bg-[#FCFFFF] text-[#00333D] text-[16px] font-medium px-[20px] py-[20px] rounded-[10px]" type="text" defaultValue={_.capitalize(editedInfo.FirstName)} onChange={handleChange} />
                            </div>
                            <div className="flex flex-col justify-start items-start gap-[10px]">
                                <h1 className="text-[#3D3700] text-[16px] font-medium ">Lastname</h1>
                                <input name="LastName" className="w-[290px] bg-[#FCFFFF] text-[#00333D] text-[16px] font-medium px-[20px] py-[20px] rounded-[10px]" type="text" defaultValue={_.capitalize(editedInfo.LastName)} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="flex gap-[20px]">
                            <div className="flex flex-col justify-start items-start gap-[10px]">
                                <h1 className="text-[#3D3700] text-[16px] font-medium ">Degree</h1>
                                <Dropdown name="Degree" onChange={(e) => { setSelectedDegree(e.value), handleChange(e) }} value={selectedDegree} options={degrees} optionLabel="name"
                                    placeholder="Select a Degree" className="profile w-[290px]  bg-[#FCFFFF]  font-medium text-center   " style={{ fontSize: '16px' }} />                            </div>
                            <div className="flex flex-col justify-start items-start gap-[10px]">
                                <h1 className="text-[#3D3700] text-[16px] font-medium ">Speciality</h1>
                                <Dropdown name="Speciality" onChange={(e) => { setSelectedSpicality(e.value), handleChange(e) }} value={selectedSpicality} options={specialities} optionLabel="name"
                                    placeholder={selectedSpicality.name} className="profile w-[290px]  bg-[#FCFFFF]  font-medium text-center   " style={{ fontSize: '16px' }} />
                            </div>
                        </div>
                        <div className="flex items-end">
                            <div className="flex flex-col justify-start items-start gap-[10px]">
                                <h1 className="text-[#3D3700] text-[16px] font-medium ">Badges</h1>
                                <div className=" flex bg-[#FCFFFF] w-[290px] h-[24] px-[15px] py-[15px] justify-around items-center  rounded-bl-[10px] rounded-tl-[10px]">
                                    <img className="w-[30px]" src={bdg1} alt="" />
                                    <img className="w-[30px]" src={bdg2} alt="" />
                                    <img className="w-[30px]" src={bdg3} alt="" />
                                </div>
                            </div>
                            <button className="w-[170px] h-[60px] bg-[#FCEE65] text-[#3D3700] text-[16px] font-medium rounded-tr-[8px] rounded-br-[8px] [transition:background-color_0.3s_ease] hover:bg-[#FAE200]">Change Badges</button>
                        </div>
                        <div className="flex justify-end items-center gap-[20px] my-[25px]">
                            <button onClick={handleDiscardClick} className="w-[170px] h-[50px] bg-[#FCFFFF] text-[#00333D] text-[16px] font-medium rounded-[8px] ">Discard</button>
                            <button onClick={handleSaveClick} className="w-[170px] h-[50px] bg-[#FCEE65] text-[#3D3700] text-[16px] font-medium rounded-[8px] [transition:background-color_0.3s_ease] hover:bg-[#FAE200] ">Save</button>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}