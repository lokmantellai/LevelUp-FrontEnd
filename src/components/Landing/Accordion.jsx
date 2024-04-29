import { useState } from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'






export default function Accordion({ title, content }) {

    const [isOpen, setIsOpen] = useState(false);

    const onAccord = () => {
        setIsOpen(!isOpen);
    };

    const iconClass = `fas fa-chevron-down ${isOpen ? 'fa-rotate-180' : ''}`; // Dynamic class for rotation


    return (
        <div>

            <button className="accordion flex flex-row w-[100%] justify-between  gap-[20px] items-center py-[30px]  transition-all ease-in" onClick={() => { onAccord() }}>
                <h1 className="text-[#E8FBFF] font-extrabold text-left
                xs:text-[22px]
                sm:text-[28px]
                md:text-[36px]">{title}</h1>
                <FontAwesomeIcon className={iconClass} style={{ width: '30px', height: '30px', color: '#E8FBFF' }} icon={faChevronDown} />
            </button>
            {isOpen && <div className="answer py-[20px] px-[10px]  transition-all duration-300 ease-in-out"><p className="text-[#E8FBFF] text-[24px] font-normal ">{content}</p></div>}
        </div>
    )
}