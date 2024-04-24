import Arrow from "../assets/Arrow.svg"
import ChoiceBtn from '../components/ChoiceBtn';
import Btn from '../components/Btn';
import { useState } from 'react';
function SignStep1({setStep}) {
    const [selected, setSelected] = useState();
  const handlerNextBtn = () => {
    setStep(2);
    }
    return (
        <div className="container mx-auto py-12 px-5 relative">
        <header className="flex justify-center">
            <button>
              <img src={Arrow} className="w-2 h-4" />                  
            </button>
            <div className="relative ms-5 max-w-[50rem] w-[80%] h-4 bg-[#FFF8B2] rounded-full before:w-1/2 before:h-full before:absolute before:left-0 before:bg-[#FAE200] before:rounded-full"></div>
        </header>  
        <main className='flex items-center flex-col mt-32 mb-10'>
          <h2 className='lg:text-4xl text-3xl max-[568px]:text-2xl font-medium max-[568px]:max-w-[360px] text-center'>Let us know a bit about you! Are you ?</h2>
          <div className='lg:w-[30rem] w-[25rem] max-[568px]:w-72 mt-28 flex flex-col gap-7'>
        <ChoiceBtn num="1" text="Teacher" setSelected={setSelected} selected={selected} /> 
            <ChoiceBtn num="2" text="Student" setSelected={setSelected} selected={selected}/>  
          </div>
    </main>
        <Btn text="Next" style={"w-44 h-16 text-xl absolute -bottom-24 right-10 max-[568px]:w-36 "} handleSubmit={handlerNextBtn} />
  </div>
  )
}

export default SignStep1