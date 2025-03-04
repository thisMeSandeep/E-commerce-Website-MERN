import { Minus, Plus, ShoppingCartIcon } from "lucide-react";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import useCheckoutStore from "../../store/checkoutStore";
import { useNavigate } from "react-router-dom";


const ActionsButtons = ({ product }) => {
    const [itemCount, setItemCount] = useState(product?.minimumOrderQuantity || 1);
    const setSingleProduct = useCheckoutStore((state) => state.setSingleProduct);
    const navigate = useNavigate();

    useEffect(() => {
        if (product) {
            setItemCount(product.minimumOrderQuantity);
        }
    }, [product]);

    // caluclate discounted price
    const discountedPrice = product.price - (product.price * product.discountPercentage) / 100;

    // add item to cart
    const addItemToCart = async () => {
        const cartData = {
            quantity: itemCount,
            title: product.title,
            price: discountedPrice.toFixed(2),
            thumbnail: product.thumbnail,
            productId: product._id
        };

        try {
            const { data } = await axiosInstance.post("/api/cart/addItemToCart", cartData);
            if (data.success) {
                toast.success(data.message);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong!");
        }
    };

    //handle buy now
    const handleBuyNow = () => {
        const productDetails = {
            product,
            itemCount
        }
        setSingleProduct(productDetails);
        navigate("/checkout")
    }

    return (
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mt-10">
            {/* Item Count Controls */}
            <div className="flex items-center gap-2 w-full">
                <div className="flex items-center text-gray-700 gap-5 border-2 px-2 py-2 rounded">
                    <Minus
                        className="size-4 cursor-pointer"
                        onClick={() => setItemCount(prev => Math.max(product.minimumOrderQuantity, prev - 1))}
                    />
                    <p>{itemCount}</p>
                    <Plus
                        className="size-4 cursor-pointer"
                        onClick={() => setItemCount(prev => prev + 1)}
                    />
                </div>

                {/* Add to Cart Button */}
                <button
                    className="flex items-center justify-center gap-2 bg-orange-500 rounded px-10 py-2 text-white tracking-tighter flex-1 text-nowrap"
                    onClick={addItemToCart}
                >
                    <span>ADD TO CART</span>
                    <ShoppingCartIcon className="size-5" />
                </button>
            </div>

            {/* Buy Now Button */}
            <button onClick={handleBuyNow} className="w-full lg:w-auto text-nowrap rounded px-10 py-2 text-orange-500 border-2 border-orange-500 font-medium tracking-tighter">
                BUY NOW
            </button>
        </div>
    );
};

export default ActionsButtons;
