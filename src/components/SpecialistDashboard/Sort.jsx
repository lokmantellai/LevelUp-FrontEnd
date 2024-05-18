import { useState, useEffect, useRef } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faXmark } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'


export default function Sort({ handleClose, onSort, sorted, ordred, leveled, degreed, onOutsideClick }) {

    const wrapperRef = useRef();

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                onOutsideClick();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onOutsideClick]);



    const [sortBy, setSortBy] = useState(false)
    const [sortSel, setSortSel] = useState(_.capitalize(sorted))

    const [orderBy, setOrderBy] = useState(false)
    const [orderSel, setOrderSel] = useState(_.capitalize(ordred))

    const [levelBy, setLevelBy] = useState(false)
    const [levelSel, setLevelSel] = useState(_.capitalize(leveled))

    const [degreeBy, setDegreeBy] = useState(false)
    const [degreeSel, setDegreeSel] = useState(_.capitalize(degreed))

    const handleSort = (e) => {
        setSortSel(e)
        setSortBy(!sortBy)
    }

    const handleOrder = (e) => {
        setOrderSel(e)
        setOrderBy(!orderBy)
    }

    const handleLevel = (e) => {
        setLevelSel(e)
        setLevelBy(!levelBy)
    }

    const handleDegree = (e) => {

        setDegreeSel(e)
        setDegreeBy(!degreeBy)
    }

    const sortOrder = (e) => {
        console.log(e)
        onSort(e)
    }


    return (
        <div ref={wrapperRef} style={{ boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.2)' }} className="absolute flex flex-col gap-[20px] w-[500px]  right-[26%] top-[0px] py-[20px] px-[20px] rounded-2xl rounded-t-none bg-[#FFFFFC] z-10 ">
            <div className="flex justify-between items-center">
                <h1 className="text-[#3D3700] text-[18px] font-medium ">Sort & Filter</h1>
                <button className=" text-[#3D3700] " onClick={handleClose}>
                    <FontAwesomeIcon size="xl" icon={faXmark} />
                </button>
            </div>
            <div className="flex w-full gap-[30px]">
                <div className="flex w-[250px] flex-col gap-[20px]">
                    <div className="flex flex-col gap-[10px] ">
                        <h1>Degree</h1>
                        <div className="flex flex-col gap-[10px]">
                            <button className={`bg-[#FFFDE8] flex justify-between items-center w-full py-[10px] px-[10px] border-[] rounded-[10px] ${degreeBy ? 'border-[2px] border-[solid] border-[#FFD24C]' : ''}`} onClick={() => { setDegreeBy(!degreeBy) }}>{degreeSel ? _.capitalize(degreeSel) : 'Select ...'} <FontAwesomeIcon className={`transform transition-transform duration-300 ${degreeBy ? 'rotate-180' : ''}`} icon={faChevronDown} /></button>
                            {degreeBy &&
                                <div className=" flex flex-col gap-[10px]">
                                    <button onClick={() => { handleDegree('Bachelor 1st') }} className="bg-[#FFFDE8] flex justify-center items-center w-full py-[10px]  px-[10px]">{_.capitalize('Bachelor 1st')}</button>
                                    <button onClick={() => { handleDegree('Bachelor 2nd') }} className="bg-[#FFFDE8]  flex justify-center items-center w-full py-[10px]  px-[10px]">{_.capitalize('Bachelor 2nd')}</button>
                                    <button onClick={() => { handleDegree('Bachelor 3rd') }} className="bg-[#FFFDE8]  flex justify-center items-center w-full  py-[10px] px-[10px]">{_.capitalize('Bachelor 3rd')}</button>
                                    <button onClick={() => { handleDegree('Master 1st') }} className="bg-[#FFFDE8]  flex justify-center items-center w-full  py-[10px] px-[10px]">{_.capitalize('Master 1st')}</button>
                                    <button onClick={() => { handleDegree('Master 2nd') }} className="bg-[#FFFDE8]  flex justify-center items-center w-full  py-[10px] px-[10px]">{_.capitalize('Master 2nd')}</button>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-[10px] ">
                        <h1>Level</h1>
                        <div className="flex flex-col gap-[10px]">
                            <button className={`bg-[#FFFDE8] flex justify-between items-center w-full py-[10px] px-[10px] border-[] rounded-[10px] ${levelBy ? 'border-[2px] border-[solid] border-[#FFD24C]' : ''}`} onClick={() => { setLevelBy(!levelBy) }}>{levelSel ? _.capitalize(levelSel) : 'Select ...'} <FontAwesomeIcon className={`transform transition-transform duration-300 ${levelBy ? 'rotate-180' : ''}`} icon={faChevronDown} /></button>
                            {levelBy &&
                                <div className=" flex flex-col gap-[10px]">
                                    <button onClick={() => { handleLevel('Beginner') }} className="bg-[#FFFDE8] flex justify-center items-center w-full py-[10px]  px-[10px]">{_.capitalize('Beginner')}</button>
                                    <button onClick={() => { handleLevel('Intermediate') }} className="bg-[#FFFDE8]  flex justify-center items-center w-full py-[10px]  px-[10px]">{_.capitalize('Intermediate')}</button>
                                    <button onClick={() => { handleLevel('Advanced') }} className="bg-[#FFFDE8]  flex justify-center items-center w-full  py-[10px] px-[10px]">{_.capitalize('Advanced')}</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="h-[150px] w-[2px] border-[1px] border-[solid] border-[#FCE932]">
                </div>
                <div className="flex w-[200px]  flex-col gap-[20px]">
                    <div className="flex flex-col gap-[10px] ">
                        <h1>Sort by</h1>
                        <div className="flex flex-col gap-[10px]">
                            <button className={`bg-[#FFFDE8] flex justify-between items-center w-full py-[10px] px-[10px] border-[] rounded-[10px] ${sortBy ? 'border-[2px] border-[solid] border-[#FFD24C]' : ''}`} onClick={() => { setSortBy(!sortBy) }}>{sortSel ? _.capitalize(sortSel) : 'Select ...'} <FontAwesomeIcon className={`transform transition-transform duration-300 ${sortBy ? 'rotate-180' : ''}`} icon={faChevronDown} /></button>
                            {sortBy &&
                                <div className=" flex flex-col gap-[10px]">
                                    <button onClick={() => { handleSort('title') }} className="bg-[#FFFDE8] flex justify-center items-center w-full py-[10px]  px-[10px]">{_.capitalize('title')}</button>
                                    <button onClick={() => { handleSort('id') }} className="bg-[#FFFDE8]  flex justify-center items-center w-full py-[10px]  px-[10px]">{_.capitalize('id')}</button>
                                    <button onClick={() => { handleSort('degree') }} className="bg-[#FFFDE8]  flex justify-center items-center w-full  py-[10px] px-[10px]">{_.capitalize('degree')}</button>
                                    <button onClick={() => { handleSort('level') }} className="bg-[#FFFDE8]  flex justify-center items-center w-full  py-[10px] px-[10px]">{_.capitalize('level')}</button>
                                </div>
                            }
                        </div>
                    </div>

                    <div className="flex flex-col gap-[10px] ">
                        <h1>Order</h1>
                        <div className="flex flex-col gap-[10px]">
                            <button className={`bg-[#FFFDE8] flex justify-between items-center w-full py-[10px] px-[10px] border-[] rounded-[10px] ${orderBy ? 'border-[2px] border-[solid] border-[#FFD24C]' : ''}`} onClick={() => { setOrderBy(!orderBy) }}>{orderSel ? _.capitalize(orderSel) : 'Order ...'} <FontAwesomeIcon className={`transform transition-transform duration-300 ${orderBy ? 'rotate-180' : ''}`} icon={faChevronDown} /></button>
                            {orderBy &&
                                <div className=" flex flex-col gap-[10px]">
                                    <button onClick={() => { handleOrder('asc') }} className="bg-[#FFFDE8] flex justify-center items-center w-full py-[10px]  px-[10px]">Ascending</button>
                                    <button onClick={() => { handleOrder('desc') }} className="bg-[#FFFDE8]  flex justify-center items-center w-full py-[10px]  px-[10px]">Descending</button>
                                </div>
                            }
                        </div>
                    </div>

                </div>
            </div>
            <button onClick={() => { sortOrder({ 'sort': 'id', 'order': 'asc', 'degree': '' }) }} className="flex items-center justify-around px-[20px] py-[20px] w-full h-[40px] border-[2px] border-[solid] border-[#FCE932] text-[#3D3700] text-[14px] font-medium rounded-[8px] hover:bg-[#FFFDE8] hover:border-[#FFFDE8] ">Clear</button>
            <button onClick={() => { sortOrder({ 'sort': sortSel, 'order': orderSel, 'degree': degreeSel, 'level': levelSel }) }} className="flex items-center justify-around px-[20px] py-[20px] w-full h-[40px] bg-[#FFF8B2] text-[#3D3700] text-[14px] font-medium rounded-[8px] hover:bg-[#FCE932] ">Sort</button>
        </div>

    )
}