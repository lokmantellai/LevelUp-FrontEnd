import axios from "axios";
import Benifeits from "../components/Landing/Benifiets";
import Courses from "../components/Landing/Courses";
import Footer from "../components/Landing/Footer";
import Hero from "../components/Landing/Herosection";
import JoinUs from "../components/Landing/JoinUs";
import Navbar from "../components/Landing/Navbar";
import Quests from "../components/Landing/Quests";
import Stories from "../components/Landing/Stories";
import { useAuth } from "../context/hooks";

export default function Home() {
    console.log(useAuth().token )
    return (
        <div id="home" className='home bg-[#FFFFFC] overflow-hidden' >
            <div className="container1  mx-[auto] my-[0] xl:w-[100%]">
                <Navbar />
                <Hero />
                <Benifeits />
                <Courses />
                <Stories />
                <Quests />
                <JoinUs />
                <Footer />
            </div>
        </div>
    )
}