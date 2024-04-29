import Eye from "../assets/Vector.png"
function test() {
    return "test";
}
export default function InputField({ type, placeholder, setToForm }) {
    function changeVisibiltyPassword(ev) {
        const input = ev.target.nextElementSibling;
        if (input.type == "text")
            input.type = "password"
        else 
        input.type = "text"
    }
    return (
        <div className="relative mb-4">
            {
            (type == "password") &&
            <img onClick={changeVisibiltyPassword} src={Eye} className="absolute w-6 top-6 right-4 translate-y-[-50%] cursor-pointer" />
            }
            <input {...setToForm} type={type} placeholder={placeholder} className={"border-1 focus-visible:outline-none h-12 flex items-center ps-4 w-full bg-[#B2F2FF] rounded-xl text-[#006073] placeholder:text-[#0095B2] text-xl "}/>
        </div>
    )
}