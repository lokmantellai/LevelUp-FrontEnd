import ChoiceBtn from '../components/ChoiceBtn';
import Btn from '../components/Btn';
import { useNavigate } from "react-router-dom";
import { useRegister } from '../context/hooks';
import { useForm } from 'react-hook-form';
export default function SelectTeachingYear() {
  const navigate = useNavigate();
  const registerForm = useRegister();
  console.log(registerForm.data.degree)
  registerForm.setProgress(4, "/signup/step/1", 2);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      degree: registerForm.data?.degree
    }
  });
    return (
      <form onSubmit={handleSubmit((data) => {
        if (data.degree) {
          registerForm.save("degree", data.degree)
          navigate("/signup/step/3");
        }
        })} className='w-full relative flex items-center flex-col mt-20 mb-10'>
          <h2 className='lg:text-4xl text-3xl max-[568px]:text-2xl font-medium max-[568px]:max-w-[360px] text-center'>
          Which undergraduate year are you teaching?</h2>
        <div className='w-[90%] flex items-start flex-col gap-10'>
        <div className='w-full'>
            <h4 className="text-3xl mt-8 w-[90%]">Bachelor</h4>
            <div className='lg:w-[90%] w-[25rem] max-[568px]:w-72 mt-3 grid lg:grid-cols-[repeat(3,22rem)]  grid-cols-1 gap-6'>
              <ChoiceBtn setToForm={{...register("degree")}} text="Bachelor 1st Year" style={"max-[1120px]:text-2xl"}styleImg={"max-[1120px]:!w-[4.5rem] max-[1120px]:!h-[4.5rem]"} defaultValue={registerForm.data?.degree} /> 
              <ChoiceBtn setToForm={{...register("degree")}} text="Bachelor 2st Year" style={"max-[1120px]:text-2xl"}styleImg={"max-[1120px]:!w-[4.5rem] max-[1120px]:!h-[4.5rem]"} defaultValue={registerForm.data?.degree} />  
              <ChoiceBtn setToForm={{...register("degree")}} text="Bachelor 3st Year" style={"max-[1120px]:text-2xl"}styleImg={"max-[1120px]:!w-[4.5rem] max-[1120px]:!h-[4.5rem]"} defaultValue={registerForm.data?.degree} />  
          </div>
         </div> 
          <div className='w-full'>
            <h4 className="text-3xl mt-8 w-[90%]">Master</h4>
            <div className='w-[50%] grid grid-cols-2  gap-6 '>
            <ChoiceBtn setToForm={{...register("degree")}} text="Master 1st Year" style={"lg:h-20 lg:text-3xl"}styleImg={"lg:w-16 lg:h-16"} defaultValue={registerForm.data?.degree} /> 
            <ChoiceBtn setToForm={{...register("degree")}} text="Master 2st Year" style={"lg:h-20 lg:text-3xl"}styleImg={"lg:w-16 lg:h-16"} defaultValue={registerForm.data?.degree}/> 
          </div>
        </div>
        </div> 
        <Btn text="Next" style={"w-44 h-16 text-xl absolute -bottom-10 right-10 max-[568px]:w-36 "}  />
    </form>
  )
}

