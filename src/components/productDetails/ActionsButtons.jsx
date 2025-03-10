import { Loader, Minus, Plus, ShoppingCartIcon } from "lucide-react";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useCheckoutStore from "../../store/checkoutStore";
import useUserStore from "../../store/userStore";


const ActionsButtons = ({ product }) => {
    const [itemQuantity, setItemQuantity] = useState(product?.minimumOrderQuantity || 1);
    const setOrder = useCheckoutStore((state) => state.setOrder);
    const setCheckoutType = useCheckoutStore((state) => state.setCheckoutType)
    const [loading, setLoading] = useState(false);
    const user = useUserStore((state) => state.user)

    const navigate = useNavigate();

    useEffect(() => {
        if (product) {
            setItemQuantity(product.minimumOrderQuantity);
        }
    }, [product]);

    // add item to cart
    const addItemToCart = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        setLoading(true)
        const cartData = {
            quantity: itemQuantity,
            productId: product._id
        };

        try {
            const { data } = await axiosInstance.post("/api/cart/add-Item-ToCart", cartData);
            if (data.success) {
                toast.success(data.message);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false)
        }
    };

    //handle buy now
    const handleBuyNow = () => {
        if (!user) {
            navigate('/login');
            return;
        }

        if (product.stock === 0) {
            toast.error('Item out of stock');
            return
        }

        const orderData = [{
            product,
            quantity: itemQuantity
        }];
        setOrder(orderData);
        setCheckoutType("single")
        navigate("/checkout")
    }

    return (
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mt-10">
            {/* Item Count Controls */}
            <div className="flex items-center gap-2 w-full">
                <div className="flex items-center text-gray-700 gap-5 border-2 px-2 py-2 rounded">
                    <Minus
                        className="size-4 cursor-pointer"
                        onClick={() => setItemQuantity(prev => Math.max(product.minimumOrderQuantity, prev - 1))}
                    />
                    <p>{itemQuantity}</p>
                    <Plus
                        className="size-4 cursor-pointer"
                        onClick={() => setItemQuantity(prev => prev + 1)}
                    />
                </div>

                {/* Add to Cart Button */}
                <button
                    className="flex items-center justify-center bg-orange-500 rounded px-10 py-2 text-white tracking-tighter flex-1 text-nowrap"
                    onClick={addItemToCart}
                >
                    {loading ? <Loader className="size-5 text-white animate-spin" /> : (<div className="flex items-center justify-center gap-2"><span>ADD TO CART</span>
                        <ShoppingCartIcon className="size-5" /></div>)}
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
