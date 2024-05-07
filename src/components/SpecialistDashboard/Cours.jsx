




export default function Cours({ data, index, handleClick }) {

    const bgcolor = index % 2 === 0 ? '#FFFDE8' : '#FFFFFC'
    const hvrcolor = index % 2 === 0 ? '#FCEE65' : '#FFF8B2'

    const click = () => {
        handleClick(data); // Call the onClick function passed from CourseList with the course data
    };



    return (


        < button onClick={click} style={{ backgroundColor: bgcolor, }} className={`w-[100%] grid grid-cols-9 gap-5   h-[70px] py-[5px] items-center text-start `} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = hvrcolor }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = bgcolor }}>
            <img src={data?.img_url} alt="" className="col-span-1" />
            <h1 className="text-[16px] col-span-2 ">{data?.title}</h1>
            <h1 className="text-[16px] col-span-2">{data?.id}</h1>
            <h1 className="text-[16px] col-span-2">{data?.degree}</h1>
            <h1 className="text-[16px] col-span-2">{data?.level}</h1>
        </button >

    )
}