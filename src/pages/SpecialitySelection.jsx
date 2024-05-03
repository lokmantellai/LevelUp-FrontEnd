import { Dropdown } from 'primereact/dropdown';
import Btn from '../components/Btn';
import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { useRegister } from '../context/hooks';
export default function SpecialitySelection() {
  const navigate = useNavigate();
  const registerForm = useRegister();
  registerForm.setProgress(4, "/signup/step/2", 3);
  const [selectedSpicality, setselectedSpicality] = useState(null);
  //specialities
  const specialities = [
      { name: 'Information Technology' },
      { name: 'Software Engineer' },
      { name: 'Pre-Computer Science' },
      { name: 'Cybersecurity'},
      { name: 'Big Data & AI'}
  ];
    return (
        <main className='specialitySelection w-[24rem] mx-auto flex-col mt-28 mb-10'>
          <h2 className='lg:text-3xl text-2xl max-[568px]:text-2xl font-medium max-[568px]:max-w-[360px] text-center w-full'>
          What’s your speciality ?
            </h2>
          <div className="options w-full flex items-start mt-8 flex-col">
                    <h4 className="text-2xl mt-24 mb-1">Speciality</h4> 
          <form className="w-full mx-auto" onSubmit={(ev) => {
            ev.preventDefault();
            if (selectedSpicality) {
              registerForm.save("speciality", selectedSpicality.name);
              navigate("/signup/step/4")
            }
          }}>
            <Dropdown onChange={(e) => setselectedSpicality(e.value)} value={selectedSpicality} options={specialities} optionLabel="name" 
                placeholder="Select a Specilaity" className="w-full md:w-14rem  bg-[#E8FBFF] text-xl text-center py-5 px-4  " />
                <Btn text="Next" type="submit" style={"w-44 h-16 text-xl max-[568px]:w-36 mt-6 absolute bottom-10 right-10"}  />
          </form>
        </div>
      </main>
  )
}

