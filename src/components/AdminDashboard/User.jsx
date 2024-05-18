import useAxios from "../../api/useAxios"




export default function User({ data, index, onClick }) {

    const { baseURL } = useAxios();

    let bgcolor = index % 2 === 0 ? '#FFFDE8' : '#FFFFFC'
    let hvrcolor = index % 2 === 0 ? '#FCEE65' : '#FFF8B2'

    const click = () => {
        onClick(data); // Call the onClick function passed from CourseList with the course data
    }


    return (
        <button onClick={click} style={{ backgroundColor: bgcolor, }} className={`courseRow' w-[100%] grid grid-cols-9 gap-5    h-[70px] py-[5px] items-center text-start `} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = hvrcolor }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = bgcolor }}>
            <div className="px-[15px] flex  items-center">
                <img src={baseURL + data?.img} alt="" className="col-span-1 w-[40px] min-w-10: rounded-full" />
            </div>
            <h1 className="text-[16px] col-span-2 capitalize">{data?.first_name + " " + data?.last_name }</h1>
            <h1 className="text-[16px] col-span-1">{data?.id}</h1>
            <h1 className="text-[16px] col-span-3">{data?.email}</h1>
            <h1 className="text-[16px] col-span-2 capitalize">{data?.role || 'None'}</h1>
        </button >



    )
}