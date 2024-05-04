import icn from '../../assets/Landing/correct.svg'

const beni = ['Develop creative skills to excel in your academic pursuits.'
    , 'Connect and progress at your own pace.'
    , 'Transition from novice to expert in just a few hours.'
    , 'Join a global community of curious learners.'
    , 'Unlock your potential through limitless learning opportunities.'
]

export default function Benifeits() {



    return (


        <div className="benifeits bg-[#FFFBED]  flex flex-row  justify-between gap-[50px] items-center 
        sm:py-[50px] sm:px-[50px] sm:flex-col sm:gap-[100px]
        md:py-[100px] md:px-[100px]
        xl:flex-row"
        >
            <div className='title '>
                <h1 className="text-[36px] font-bold text-[#A88622] text-center">
                    Elevate your
                    study game with
                    LevelUp
                </h1>
            </div>
            <div className='points flex flex-col gap-[20px]'>
                {beni.map(ben =>
                    < div key={beni.indexOf(ben)} className='flex flex-row gap-[20px]' >
                        <img src={icn}></img>
                        <h1 className="text-[24px] font-[600] text-[#00333D]">
                            {ben}
                        </h1>
                    </div>
                )}
            </div>
        </div >
    )
}