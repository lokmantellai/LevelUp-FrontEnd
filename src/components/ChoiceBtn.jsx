import personne from "../assets/personne.png"
function ChoiceBtn({ text, setSelected, selected , num}) {
  let className = "ChoiceBtn relative rounded-sm w-full bg-[#E8FBFF] text-black text-4xl max-[568px]:text-2xl lg:h-28 h-24 max-[568px]:h-20 flex justify-center items-center hover:scale-105  transition-all duration-75 outline-[#00333D] ";
  if (selected == num)
    className += "outline "
  function handler() {
    setSelected(num)
  }
  return (
    <button onClick={handler} className={className}>
        <img className="absolute lg:left-11 left-9 lg:w-24 w-20 lg:h-24 h-20 top-1/2 -translate-y-1/2 max-[568px]:h-14 max-[568px]:w-14" src={personne} alt="personne" />
        {text}
    </button>
  )
}

export default ChoiceBtn