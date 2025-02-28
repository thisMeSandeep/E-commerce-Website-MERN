import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";

const products = [
    {
        id: "67c04d6454b6ce837a9b5616",
        image: assets.girl_with_headphone_image,
        title: "Unparalleled Sound",
        description: "Experience crystal-clear audio with premium headphones.",
    },
    {
        id: "67c04d6454b6ce837a9b5612",
        image: assets.girl_with_earphone_image,
        title: "Stay Connected",
        description: "Compact and stylish earphones for every occasion.",
    },
    {
        id: "67c04d6454b6ce837a9b55ba",
        category: "laptop",
        image: assets.boy_with_laptop_image,
        title: "Power in Every Pixel",
        description: "Shop the latest laptops for work, gaming, and more.",
    },
];

const FeaturedProducts = () => {
    return (
        <div className="my-16">
            <h1 className="flex flex-col items-center gap-3">
                <span className="text-2xl text-gray-800 font-medium">Featured Products</span>
                <span className="w-[100px] h-[4px] bg-orange-500"></span>
            </h1>

            {/* products */}
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-5 px-10">
                {
                    products.map((item, index) => (
                        <div key={item.id} className="w-full relative group">
                            <img src={item.image} alt="" className="w-full object-cover" />
                            <div className="absolute inset-0 group-hover:bg-gradient-to-t from-black/50 to-transparent transition-all duration-500" />
                            <div className="absolute z-10 bottom-10 left-10 group-hover:-translate-y-5 transition-all duration-500">
                                <h1 className="text-2xl text-white font-medium">{item.title}</h1>
                                <p className="text-sm text-white mt-3 w-[250px]">{item.description}</p>
                                <Link to={`/product-details/${item.id}`} className="mt-3 flex items-center gap-2 px-4 py-2 rounded-md bg-orange-500 text-white">Buy now
                                    <img src={assets.redirect_icon} alt="" />
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default FeaturedProducts