import { Header, SideBar } from "../../components/SpecialistDashboard/Components";


function SpecialistDashboard() {
    return (
        <div className="flex  bg-[#FFFFFC]">
            <SideBar />
            <div className=" flex flex-col flex-1 pb-[20] ">
                <Header />
            </div>

        </div>

    )
}
export default SpecialistDashboard
