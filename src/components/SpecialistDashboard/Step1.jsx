
import add from '../../assets/SpecialistDashboard/addimage.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faXmark } from '@fortawesome/free-solid-svg-icons'

export default function Step1({ formData, setFormData, errors }) {
    const handleChange = (e) => {
        setFormData({ ...formData, title: e.target.value });
    };

    return (
        <div className="flex flex-col w-[100%] gap-[20px]">
            <div className="flex justify-between items-center gap-[30px]">
                <input type="text" className="w-[91.6%] h-[100px] bg-[#FFFFFC] rounded-[10px] px-[50px] py-[20px] text-[28px] text-[#453507]" placeholder="Course Title ..." value={formData.title} onChange={handleChange} />
                <button className="flex justify-center items-center h-[100px] w-[100px] bg-[#FFFFFC] rounded-[10px] ">
                    <img src={add} alt="" />
                </button>
            </div>
            <div>
                <label >
                    <h1 className='text-[22px] text-[#3D3700]'>* Description</h1>
                    <textarea className='w-[100%] h-[150px] resize-none rounded-[10px] bg-[#FFFFFC]' value={formData.description} onChange={handleChange}></textarea>
                </label>
            </div>
            <div className='flex justify-between items-center w-[100%] '>
                <label className='w-[31.5%]'>
                    <h1 className='text-[22px] text-[#3D3700]'>* Degree</h1>
                    <button className={`bg-[#FFFFFC] flex justify-between items-center h-[70px] w-[100%] py-[10px] px-[10px] border-[] rounded-[10px] `} > <FontAwesomeIcon icon={faChevronDown} /></button>
                </label>
                <label className='w-[31.5%]'>
                    <h1 className='text-[22px] text-[#3D3700]'>* Level</h1>
                    <button className={`bg-[#FFFFFC] flex justify-between items-center h-[70px] w-[100%] py-[10px] px-[10px] border-[] rounded-[10px] `} > <FontAwesomeIcon icon={faChevronDown} /></button>
                </label>
                <label className='w-[31.5%]' >
                    <h1 className='text-[22px] text-[#3D3700]'>* Category</h1>
                    <button className={`bg-[#FFFFFC] flex justify-between items-center h-[70px] w-[100%] py-[10px] px-[10px] border-[] rounded-[10px] `}> <FontAwesomeIcon icon={faChevronDown} /></button>
                </label>
            </div>
            {errors.title && <span style={{ color: 'red' }}>{errors.title}</span>}
        </div>
    );
};