import useAxios from "../../api/useAxios"






export default function Cours({ data, index, onClick }) {


    const { baseURL } = useAxios();


    let bgcolor = index % 2 === 0 ? '#FFFDE8' : '#FFFFFC'
    let hvrcolor = index % 2 === 0 ? '#FCEE65' : '#FFF8B2'



    const click = () => {
        onClick(data);
    }



    return (
        < button onClick={click} style={{ backgroundColor: bgcolor, }} className={`courseRow' w-[100%] grid grid-cols-9 gap-5    h-[70px] py-[5px] items-center text-start `} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = hvrcolor }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = bgcolor }}>
            <div className="px-[30px] flex  items-center">
                <img src={baseURL + '/' + data?.img_url} alt="" className="col-span-1 w-[40px] " />
            </div>
            <h1 className="text-[16px] col-span-2 ">{data?.title}</h1>
            <h1 className="text-[16px] col-span-2">{data?.id}</h1>
            <h1 className="text-[16px] col-span-2">{data?.degree}</h1>
            <h1 className="text-[16px] col-span-2">{data?.level}</h1>
        </button >



    )
}