import { useState } from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'






export default function Accordion({ title, content }) {

    const [isOpen, setIsOpen] = useState(false);

    const onAccord = () => {
        setIsOpen(!isOpen);
        console.log(isOpen)

    };

    return (
        <div>

            <button className="flex flex-row w-[100%] justify-between  gap-[20px] items-center py-[30px]  transition-all ease-in" onClick={() => { onAccord() }}>
                <h1 className="text-[#E8FBFF] text-[36px] font-extrabold text-left">{title}</h1>
                {isOpen ? <FontAwesomeIcon style={{ width: '30px', height: '30px', color: '#E8FBFF' }} icon={faChevronUp} /> : <FontAwesomeIcon style={{ width: '30px', height: '30px', color: '#E8FBFF' }} icon={faChevronDown} />}
            </button>
            {isOpen && <div className="py-[20px] px-[10px]  transition-all duration-300 ease-in-out"><p className="text-[#E8FBFF] text-[24px] font-normal ">{content}</p></div>}
        </div>
    )
}