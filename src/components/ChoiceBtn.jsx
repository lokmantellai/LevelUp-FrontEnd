import personne from "../assets/personne.png"
function ChoiceBtn({ text, setToForm, styleImg ,style, grade}) {
  let className = "ChoiceBtn relative rounded-sm w-full bg-[#E8FBFF] text-black text-3xl max-[568px]:text-2xl lg:h-28 h-24 max-[568px]:h-20 flex justify-center items-center hover:scale-105  transition-all duration-75 outline-[#00333D]  "
  if (style != undefined)
    className += style
  return (
    <label
    className={className}
    onClick={(ev) => {
      const label = ev.currentTarget.classList;
      if (!label.contains("outline")) {
        const previousOutline = document.querySelector("label.outline");
        if (previousOutline) 
          previousOutline.classList.remove("outline");
      }
      label.add("outline");
    }}
    >  
      <input {...setToForm} className="appearance-none" type="radio" data-grade={grade} value={text}  />
      <img className={"absolute lg:left-11 left-9 lg:w-20 w-20 lg:h-20 h-20 top-1/2 -translate-y-1/2 max-[568px]:h-14 max-[568px]:w-14 " + styleImg} src={personne} alt="personne" />
      {text.includes("Bachelor") ? text.split("Bachelor ")[1] : text.includes("Master") ? text.split("Master ")[1] : text}
    </label>
  
  )
}

export default ChoiceBtn;