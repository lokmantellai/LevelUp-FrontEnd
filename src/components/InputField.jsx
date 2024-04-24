import Eye from "../assets/Vector.png"

export default function InputField(props) {
    function changeVisibiltyPassword() {
        let input = document.querySelector("input[name='Password']");
        if (input.type == "text")
            input.type = "password"
        else 
        input.type = "text"
    }
    return (
        <div className="relative">
            {
            props.type == "password" &&
            <img onClick={changeVisibiltyPassword} src={Eye} className="absolute w-6 top-6 right-4 translate-y-[-50%] cursor-pointer" />
            }
            <input type={props.type} placeholder={props.name} name={props.name}
            className='focus-visible:outline-none h-12 mb-5 flex items-center ps-4 w-full bg-[#B2F2FF] rounded-xl text-[#006073] placeholder:text-[#0095B2] text-xl '/>
        </div>
    )
}