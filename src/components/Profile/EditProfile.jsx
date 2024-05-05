import Student from "../../assets/Profile/Student.json"
import { Dropdown } from 'primereact/dropdown';
import { useState } from "react"


export default function EditProfile({ data }) {


    const [selectedSpicality, setselectedSpicality] = useState(Student.speciality);

    const handleSelectionChange = (event) => {
        setSelectedOption(event.target.value);
    };

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
                        <button className="w-[170px] h-[50px] bg-[#FCEE65] text-[#3D3700] text-[16px] font-medium rounded-[8px] [transition:background-color_0.3s_ease,_box-shadow_0.3s_ease] hover:bg-[#FAE200] hover:[box-shadow:0px_4px_10px_2px_rgba(0,_0,_0,_0.25)]">Change Avatar</button>
                    </div>
                    <div className="flex flex-col gap-[30px] ">
                        <div className="flex gap-[20px]">
                            <div className="flex flex-col justify-start items-start gap-[10px]">
                                <h1 className="text-[#3D3700] text-[16px] font-medium ">Firstname</h1>
                                <input className="w-[290px]  bg-[#FCFFFF] text-[#00333D] text-[16px] font-medium px-[20px] py-[20px] rounded-[10px]" type="text" value={Student.first_name} />
                            </div>
                            <div className="flex flex-col justify-start items-start gap-[10px]">
                                <h1 className="text-[#3D3700] text-[16px] font-medium ">Lastname</h1>
                                <input className="w-[290px] bg-[#FCFFFF] text-[#00333D] text-[16px] font-medium px-[20px] py-[20px] rounded-[10px]" type="text" value={Student.last_name} />
                            </div>
                        </div>
                        <div className="flex gap-[20px]">
                            <div className="flex flex-col justify-start items-start gap-[10px]">
                                <h1 className="text-[#3D3700] text-[16px] font-medium ">Study year</h1>
                                <input className=" w-[290px] bg-[#FCFFFF] text-[#00333D] text-[16px] font-medium px-[20px] py-[20px] rounded-[10px]" type="text" value={Student.level} />
                            </div>
                            <div className="flex flex-col justify-start items-start gap-[10px]">
                                <h1 className="text-[#3D3700] text-[16px] font-medium ">Lastname</h1>
                                <Dropdown onChange={(e) => setselectedSpicality(e.value)} value={selectedSpicality} options={specialities} optionLabel="name"
                                    placeholder="Select a Specilaity" className="profile w-[290px]  bg-[#FCFFFF]  font-medium text-center   " style={{ fontSize: '16px' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}