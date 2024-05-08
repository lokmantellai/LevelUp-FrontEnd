import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faXmark } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'


export default function Sort({ handleClose, onSort, sorted, ordred }) {


    const [sortBy, setSortBy] = useState(false)
    const [sortSel, setSortSel] = useState(_.capitalize(sorted))

    const [orderBy, setOrderBy] = useState(false)
    const [orderSel, setOrderSel] = useState(_.capitalize(ordred))


    const handleSort = (e) => {
        setSortSel(e)
        setSortBy(!sortBy)
    }

    const handleOrder = (e) => {
        setOrderSel(e)
        setOrderBy(!orderBy)
    }

    const sortOrder = (e) => {
        console.log(e)
        onSort(e)
    }


    return (
        <div style={{ boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.2)' }} className="absolute flex flex-col gap-[20px] w-[300px]  right-[63.5%] top-[0px] py-[20px] px-[20px] rounded-2xl rounded-t-none bg-[#FFFFFC] s ">
            <div className="flex justify-between items-center">
                <h1 className="text-[#3D3700] text-[18px] font-medium ">Sort</h1>
                <button className=" text-[#3D3700] " onClick={handleClose}>
                    <FontAwesomeIcon size="xl" icon={faXmark} />
                </button>
            </div>
            <div className="flex flex-col gap-[20px]">
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
            <button onClick={() => { sortOrder({ 'sort': sortSel, 'order': orderSel }) }} className="flex items-center justify-around px-[20px] py-[20px] w-full h-[40px] bg-[#FFF8B2] text-[#3D3700] text-[14px] font-medium rounded-[8px] hover:bg-[#FCE932] ">Sort</button>


        </div>

    )
}