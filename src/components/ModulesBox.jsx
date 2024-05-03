import Check from "../assets/check.svg"
import { useRegister } from "../context/hooks"


export default function ModulesBox({ data }) {
    const registerForm = useRegister();
    return (
        <div className="flex justify-center gap-4 mt-5">
            {
                data.map((el,ind) => {
                    return (
                        <Box text={el} key={ind} ind={ind} registerForm={registerForm} />
                    )
                })
            }
        </div>
  )
}
function Box({ text, ind, registerForm }) {
    let className = "relative lg:px-16 px-10 h-20  bg-[#E8FBFF] rounded-lg flex items-center justify-center lg:text-3xl text-2xl w-max";
    if (registerForm.ModulesSelected.includes(text))
        className += " checkedChoice";
    return (
        <button data-id={ind} onClick={(ev) => {
            ev.target.classList.toggle("checkedChoice");
            let temp = [];
            document.querySelectorAll(".checkedChoice").forEach((el) => {
                temp.push(el.textContent);
            })
            registerForm.saveTemp(temp);
        }}  className={className}>
        <img onClick={(ev) => {
            ev.target.parentElement.classList.toggle("checkedChoice");
        }} src={Check} className="absolute left-6 hidden"/>
        {text}
      </button>
    )
}
