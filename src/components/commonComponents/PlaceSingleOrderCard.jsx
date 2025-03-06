import useCheckoutStore from "../../store/checkoutStore";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PlaceSingleOrderCard = ({ paymentType }) => {
    const order = useCheckoutStore((state) => state.order);
    const navigate = useNavigate();

    // Get order details of single product
    const details = order[0];
    // data being send to backend
    const orderDetails = [
        {
            productId: details.product._id,
            quantity: details.quantity,
        },
    ];

    const subtotal = details.quantity * details.product.price; // Subtotal
    const discount =
        details.quantity * ((details.product.discountPercentage * details.product.price) / 100); // Discount amount
    const amount = subtotal - discount; // Final amount to pay

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

    // Handle order placement
    const handlePlaceOrder = async () => {
        if (paymentType === "COD") {
            try {
                const { data } = await axiosInstance.post("/api/order/cod-order", { order: orderDetails });

                if (data.success) {
                    toast.success(data.message);
                    navigate("/checkout-success")
                }
            } catch (err) {
                toast.error(err?.response?.data?.message || "Order placement failed");
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
    };

    return (
        <div className="w-full lg:max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Order Summary</h2>

            {/* Product Preview */}
            <div className="flex items-center gap-5 my-5 text-gray-700 border-b border-orange-500 pb-2">
                <Link to={`/product-details/${details.product._id}`} className="size-8 rounded-full border-2">
                    <img src={details.product.thumbnail} alt={details.product.title} />
                </Link>
                <p>{details.product.title}</p>
                <p>
                    {details.quantity} × ${details.product.price} = ${subtotal.toFixed(2)}
                </p>
            </div>

            <div className="space-y-2 text-gray-700">
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
                    <span>-${discount.toFixed(2)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${amount.toFixed(2)} USD</span>
                </div>
            </div>

            <button
                onClick={handlePlaceOrder}
                className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
            >
                Place Order →
            </button>
        </div>
    );
};

export default PlaceSingleOrderCard;
