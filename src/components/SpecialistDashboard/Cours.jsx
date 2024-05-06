




export default function Cours({ data, index }) {

    const bgcolor = index % 2 === 0 ? '#FFFDE8' : '#FFFFFC'
    const hvrcolor = index % 2 === 0 ? '#FCEE65' : '#FFF8B2'


    function handleClick() {
        console.log(bgcolor)
    }


    return (


        < button onClick={handleClick} style={{ backgroundColor: bgcolor, }} className={`w-[100%] grid grid-cols-9 gap-5   h-[90px] py-[5px] items-center text-start `} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = hvrcolor }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = bgcolor }}>
            <img src={data?.img_url} alt="" className="col-span-1" />
            <h1 className="text-[16px] col-span-2 ">{data?.title}</h1>
            <h1 className="text-[16px] col-span-2">{data?.id}</h1>
            <h1 className="text-[16px] col-span-2">{data?.degree}</h1>
            <h1 className="text-[16px] col-span-2">{data?.level}</h1>
        </button >

    )
}