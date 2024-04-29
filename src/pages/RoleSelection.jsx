import ChoiceBtn from '../components/ChoiceBtn';
import Btn from '../components/Btn';
import { useForm } from 'react-hook-form';
import { useRegister } from '../context/hooks';
import { useNavigate } from 'react-router-dom';
function RoleSelection() {
  const { register, handleSubmit } = useForm();
  const registerForm = useRegister();
  const navigate = useNavigate();
  return (
      <>
        <main className='flex items-center flex-col mt-20 mb-10'>
          <h2 className='lg:text-4xl text-3xl max-[568px]:text-2xl font-medium max-[568px]:max-w-[360px] text-center'>Let us know a bit about you! Are you ?</h2>
        <form onSubmit={handleSubmit((data) => {
          if (data.role) {
            registerForm.save("role",data.role)
            navigate("/signup/step/2")
          }
          }) } className='lg:w-[30rem] w-[25rem] max-[568px]:w-72 mt-28 flex flex-col gap-7 '>
            <ChoiceBtn setToForm={{...register("role")}} text="Teacher" name="role"/> 
            <ChoiceBtn setToForm={{...register("role")}} text="Student" name="role" />  
            <Btn text="Next" type="submit" style={"w-44 h-16 text-xl bottom-10 right-24 max-[568px]:w-36 "}  />
          </form>
    </main>
      </>
  )
}

export default RoleSelection;