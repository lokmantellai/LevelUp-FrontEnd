import lottie from "lottie-web"
import { useEffect } from "react";
import joinanim from '../../assets/Landing/join.json'

export default function JoinUs() {

    useEffect(() => {
        const instance = lottie.loadAnimation({
            container: document.querySelector(" .animm"),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: joinanim
        })
        return () => instance.destroy();
    }, [])


    return (
        <div className="bg-[] py-[100px] px-[100px] flex justify-center">
            <div className="w-[500px] flex flex-col gap-[50px]">
                <div className="animm"></div>
                <div className="flex flex-col gap-[20px]">
                    <h1 className="text-[36px] text-[#3D3700] text-center font-extrabold">Join over 10 million people learning on LevelUp</h1>
                    <p className="text-[18px] text-[#3D3700] text-center font-medium">If you've made it this far, you must be at least a little curious. Sign up and take the first step toward your goals.</p>
                </div>
                <button className='w-[100%] h-[60px] bg-[#FCEE65] text-[#3D3700] rounded-[8px] text-[18px] font-bold [transition:background-color_0.3s_ease,_box-shadow_0.3s_ease] hover:bg-[#FAE200] hover:[box-shadow:0px_4px_10px_2px_rgba(0,_0,_0,_0.25)]'>Get Started</button>

            </div>

        </div>
    )
}