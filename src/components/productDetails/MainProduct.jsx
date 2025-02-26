import { useState } from "react";
import { assets } from "../../assets/assets";

const MainProduct = ({ product }) => {

    const [addToCart, setAddToCart] = useState({
        productId: "",
        quantity: null,
    });
    const [imageIndex, setImageIndex] = useState(0);
    const [zoom, setZoom] = useState(false);
    const [position, setPosition] = useState({ x: 50, y: 50 });


    if (!product || !product.images) {
        return <p>Loading product details...</p>;
    }

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setPosition({ x, y });
    };

    return (
        <div className="grid grid-cols-1">

            {/* Image section */}
            <div className="flex flex-col items-center gap-5">
                <div
                    className="border w-full h-[500px] md:w-[500px] md:h-[500px] rounded-md shadow relative overflow-hidden cursor-grab"
                    onMouseEnter={() => setZoom(true)}
                    onMouseLeave={() => setZoom(false)}
                    onMouseMove={handleMouseMove}
                >
                    <img
                        src={product.images[imageIndex]}
                        alt={product.title}
                        className="size-full object-contain "
                        style={{
                            transform: zoom ? `scale(2) translate(${50 - position.x}%, ${50 - position.y}%)` : "scale(1)",
                            objectPosition: "50% 50%",
                        }}
                    />
                    {/* wishlist button */}
                    <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:scale-105 ">
                        <img
                            className="h-3 w-3"
                            src={assets.heart_icon}
                            alt="heart_icon"
                        />
                    </button>
                </div>

                {/* Image group */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                    {
                        product.images.map((image, index) => (
                            <img key={index} src={image} className={`w-[80px] aspect-square object-contain border p-1 rounded-sm cursor-pointer ${imageIndex === index ? "border-orange-500" : "border-black/20"}`} onClick={() => setImageIndex(index)} />
                        ))
                    }
                </div>
            </div>


            {/* Details section */}
            <div>

            </div>

        </div>
    );
}

export default MainProduct;
