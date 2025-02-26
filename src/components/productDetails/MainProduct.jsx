import { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import ProductDetails from "./ProductDetails";
import { Minus, Plus, ShoppingCartIcon } from "lucide-react";
import paymentMethodsImage from "../../assets/Payment_Method.png"

const MainProduct = ({ product }) => {

    const [itemCount, setItemCount] = useState(product?.minimumOrderQuantity || 0);

    const [addToCart, setAddToCart] = useState({
        productId: product?.id || null,
        quantity: product?.minimumOrderQuantity || 0,
    });

    const [imageIndex, setImageIndex] = useState(0);
    const [zoom, setZoom] = useState(false);
    const [position, setPosition] = useState({ x: 50, y: 50 });


    useEffect(() => {
        if (product) {
            setItemCount(product.minimumOrderQuantity);
            setAddToCart({
                productId: product.id,
                quantity: product.minimumOrderQuantity,
            });
        }
    }, [product]);

    useEffect(() => {
        setAddToCart(prev => ({
            ...prev,
            quantity: itemCount,
        }));
    }, [itemCount]);


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
                <ProductDetails product={product} />

                {/* action buttons-add to cart and buy */}
                <div className="flex flex-col lg:flex-row  items-center justify-between gap-4 mt-10">

                    <div className="flex items-center gap-2 w-full">
                        {/* set item count */}
                        <div className="flex items-center text-gray-700 gap-5 border-2 px-2 py-2 rounded">
                            <Minus className="size-4 cursor-pointer" onClick={() => setItemCount(prev => Math.max(product.minimumOrderQuantity, prev - 1))} />
                            <p>{itemCount}</p>
                            <Plus className="size-4 cursor-pointer" onClick={() => setItemCount(prev => prev + 1)} />
                        </div>
                        {/* add to cart */}
                        <button className="flex items-center justify-center gap-2 bg-orange-500 rounded px-10 py-2 text-white tracking-tighter flex-1 text-nowrap "><span >ADD TO CART</span><ShoppingCartIcon className="size-5" /></button>
                    </div>
                    {/*  Buy now*/}
                    <button className="w-full lg:w-auto text-nowrap rounded px-10 py-2 text-orange-500 border-2 border-orange-500 font-medium tracking-tighter">BUY NOW</button>
                </div>

                <div className="mt-8 border px-2 py-4 rounded">
                    <p className="text-gray-800 ">100% Guarantee safe Checkout</p>
                    <img src={paymentMethodsImage} alt="payment methods" className="mt-2" />
                </div>

            </div>

        </div>
    );
}

export default MainProduct;
