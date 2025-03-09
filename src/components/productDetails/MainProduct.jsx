import { useState } from "react";
import { assets } from "../../assets/assets";
import ProductDetails from "./ProductDetails";
import { useAppContext } from "../../contexts/AppContext";
import paymentMethodsImage from "../../assets/Payment_Method.png"
import ActionsButtons from "./ActionsButtons";
import useUserStore from "../../store/userStore";
import { useNavigate } from "react-router-dom";

const MainProduct = ({ product }) => {
    const [imageIndex, setImageIndex] = useState(0);
    const [zoom, setZoom] = useState(false);
    const [position, setPosition] = useState({ x: 50, y: 50 });
    const { addItemToWishlist } = useAppContext();
    const user = useUserStore((state) => state.user);
    const navigate = useNavigate();


    if (!product || !product.images) {
        return <p>Loading product details...</p>;
    }

    // handle image hover effect
    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setPosition({ x, y });
    };

    // Calculate discounted price
    const discountPercentage = product.discountPercentage || 0;
    const discountedPrice = product.price - (discountPercentage * product.price) / 100;

    // wishlist data
    const itemData = {
        productId: product._id,
        title: product.title,
        thumbnail: product.thumbnail,
        price: discountedPrice.toFixed(2),
        stockStatus: product.stock > 0 ? "In Stock" : "Out of Stock",
    };

    // Add item to wishlist
    const addItem = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        await addItemToWishlist(itemData);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 py-5">

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
                    <button onClick={addItem} className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:scale-105 ">
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
                <ProductDetails product={product} />

                {/* action buttons-add to cart and buy */}
                <ActionsButtons product={product} />
                <div className="mt-8 border px-2 py-4 rounded">
                    <p className="text-gray-800 ">100% Guarantee safe Checkout</p>
                    <img src={paymentMethodsImage} alt="payment methods" className="mt-2" />
                </div>

            </div>

        </div>
    );
}

export default MainProduct;
