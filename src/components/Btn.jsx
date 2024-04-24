export default function Btn(props) {
    let className = 'bg-[#FCEE65] w-[130px] h-[45px] flex items-center justify-center text-[#3D3700] font-medium text-lg rounded-lg cursor-pointer hover:bg-[#FAE200] transition ease-in-out duration-[200ms] ' + props.style;
    console.log(className)
    if (props.type === "submit") {
        return (
            <input
            type="submit"
            value={props.text}
            className={className}
            onClick={props.handleSubmit}
          />
          
        );
    }
    return (
        <button className={className} onClick={props.handleSubmit}        >
            {props.text}
        </button>
    );
}

