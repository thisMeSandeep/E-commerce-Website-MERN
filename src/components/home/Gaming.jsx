import { assets } from "../../assets/assets"

const Gaming = () => {
    return (
        <div className="my-10 w-full  flex flex-col lg:flex-row items-center justify-center gap-10 p-2  bg-blue-100 rounded-2xl">
            <img src={assets.playstation_image} alt="image1" className="lg:w-3/12 " />
            <div className="flex flex-col items-center gap-4 text-center">
                <h1 className="capitalize text-gray-700 text-2xl font-semibold min-w-[200px] ">level up your gaming experience</h1>
                <p className="w-[300px]">From immersive sound to precise controls everything you need to win</p>
                <button className="bg-orange-500 flex items-center gap-2 px-8 py-2 rounded-md text-white font-medium group">Buy now
                    <span className="group-hover:translate-x-[3px] transition">
                        <img src={assets.arrow_icon_white} alt="right arrow" className="object-contain" />
                    </span>
                </button>
            </div>
            <img src={assets.sm_controller_image} alt="image2" className="lg:w-3/12 md:hidden"/>
            <img src={assets.md_controller_image} alt="image2" className="lg:w-3/12 hidden md:block"/>
        </div>
    )
}

export default Gaming