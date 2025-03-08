import bike1 from "../../assets/bike1.png"
import bike2 from "../../assets/bike2.png"
import { assets } from "../../assets/assets"
import { useCategoryContext } from "../../contexts/CategoryContext"
import { useNavigate } from "react-router-dom"

const Bikes = () => {

    const { setCurrentCategory } = useCategoryContext();
    const navigate = useNavigate();

    function handleClick() {
        setCurrentCategory('motorcycle');
        navigate('/products')
    }

    return (
        <div className="my-10 w-full  flex flex-col lg:flex-row items-center justify-center gap-10 p-2  bg-orange-100 rounded-2xl">
            <img src={bike1} alt="bike" className="lg:w-3/12 " />
            <div className="flex flex-col items-center gap-4 text-center">
                <h1 className="capitalize text-gray-700 text-2xl font-semibold min-w-[200px] ">go on adventure now</h1>
                <p className="w-[350px]">From powerful engines to precision handling, everything you need for the ultimate ride.</p>
                <button onClick={handleClick} className="bg-orange-500 flex items-center gap-2 px-8 py-2 rounded-md text-white font-medium group">Buy now
                    <span className="group-hover:translate-x-[3px] transition">
                        <img src={assets.arrow_icon_white} alt="right arrow" className="object-contain" />
                    </span>
                </button>
            </div>
            <img src={bike2} alt="bikee2" className="lg:w-3/12" />
        </div>
    )
}

export default Bikes