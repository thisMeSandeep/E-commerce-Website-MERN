import { Link, useNavigate } from "react-router-dom";
import useCheckoutStore from "../../store/checkoutStore";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const PlaceCartItemsOrderCard = ({ paymentType }) => {

    const cartorder = useCheckoutStore((state) => state.order);
    const navigate = useNavigate()

    // data  send to backend
    const orderDetails = cartorder.map((item) => {
        return {
            productId: item.product._id,
            quantity: item.quantity
        }
    });


    const subtotal = cartorder.reduce((acc, item) => acc + item.quantity * item.product.price, 0) //total price (quantity*product price)
    const discount = cartorder.reduce((acc, item) => acc + item.quantity * item.product.discountPercentage * item.product.price / 100, 0)  // toatl discount in amount of all products
    const amount = subtotal - discount; //amount to  pay 


    // Initialize Razorpay payment
    const initPay = async (razOrder) => {
        const options = {
            key: "rzp_test_DYjIofeJHP2lJU",
            amount: razOrder.amount,
            currency: razOrder.currency,
            name: "DropCart Payment",
            description: "Pay online",
            order_id: razOrder.id,
            handler: async (response) => {
                try {
                    const { data } = await axiosInstance.post("/api/order/verify-payment", {
                        razorpay_order_id: response.razorpay_order_id,
                        order: orderDetails,
                    });

                    if (data.success) {
                        toast.success(data.message);
                        navigate("/checkout-success")
                    } else {
                        toast.error("Payment verification failed");
                    }
                } catch (err) {
                    console.log(err);
                    toast.error(err?.response?.data?.message || "Payment verification failed");
                }
            },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };


    // place order
    const handlePlaceOrder = async () => {
        if (paymentType === "COD") {
            try {
                const { data } = await axiosInstance.post("/api/order/cod-order", { order: orderDetails });
                if (data.success) {
                    toast.success(data.message)
                    navigate("/checkout-success")
                }
            } catch (err) {
                toast.error(err?.response?.data?.message)
            }

        } else {
            try {
                const { data } = await axiosInstance.post("/api/order/create-order", { amount });

                if (data.success) {
                    console.log(data.order);
                    initPay(data.order);
                } else {
                    toast.error("Failed to create Razorpay order");
                }
            } catch (err) {
                console.log(err.message);
                toast.error("Failed to initialize payment");
            }
        }
    }

    return (
        <div className="w-full lg:max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            products review
            {
                cartorder.map((item) => (
                    <div key={item.product._id} className="flex items-center gap-5 my-5 text-gray-700 pb-2">
                        <Link to={`/product-details/${item.product._id}`} className="size-8 rounded-full border-2 "><img src={item.product.thumbnail} alt="" /> </Link>
                        <p>{item.product.title}</p>
                        <p>{item.quantity}X{item.product.price}= ${(item.quantity * item.product.price).toFixed(2)}</p>
                    </div>
                ))
            }

            <div className="space-y-2 text-gray-700  border-t border-orange-500 py-1">
                <div className="flex justify-between">
                    <span>Sub-total</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-500">Free</span>
                </div>
                <div className="flex justify-between">
                    <span>Discount</span>
                    <span className="text-green-500">-${discount.toFixed(2)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${amount.toFixed(2)} USD</span>
                </div>
            </div>

            {/* Proceed to Checkout Button */}
            <button
                onClick={handlePlaceOrder}
                className="inline-block text-center w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
            >
                Place Order →
            </button>

            {/* Coupon Code Section for design purpose only */}
            <div className="mt-4">
                <label className="block text-gray-600 mb-1">Coupon Code</label>
                <div className="flex">
                    <input
                        type="text"
                        placeholder="Enter coupon"
                        className="w-full px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg transition"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlaceCartItemsOrderCard;
