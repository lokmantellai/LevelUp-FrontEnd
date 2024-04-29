import Check from "../assets/check.svg"

export default function ModulesBox({ data }) {
    return (
        <div className="flex justify-center gap-4 mt-5">
            {
                data.map((el,ind) => {
                    return (
                        <Box text={el} key={ind} ind={ind} />
                    )
                })
            }
        </div>
  )
}
function Box({text,ind}) {
    return (
        <button data-id={ind} onClick={(ev) => {
            ev.target.classList.toggle("checkedChoice");
        }}  className="relative lg:px-16 px-10 h-20  bg-[#E8FBFF] rounded-lg flex items-center justify-center lg:text-3xl text-2xl w-max">
        <img onClick={(ev) => {
            ev.target.parentElement.classList.toggle("checkedChoice");
        }} src={Check} className="absolute left-6 hidden"/>
        {text}
      </button>
    )
}
