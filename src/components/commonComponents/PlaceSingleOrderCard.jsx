import useCheckoutStore from "../../store/checkoutStore";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const PlaceSingleOrderCard = ({ paymentType }) => {

    const order = useCheckoutStore((state) => state.order);

    // details containing an object of order details
    const details = order[0];
    console.log(details)

    const subtotal = details.quantity * details.product.price  //subtotal
    const discount = details.quantity * (details.product.discountPercentage * details.product.price / 100);  //discount % to amount
    const amount = subtotal - discount; //amount to pay


    // place order
    const handlePlaceOrder = async () => {
        // data being send to backend
        const order = [{
            productId: details.product._id,
            quantity: details.quantity
        }];
        if (paymentType === "COD") {
            try {
                const { data } = await axiosInstance.post("/api/order/cod-order", {order});
                if (data.success) {
                    toast.success(data.message)
                }
            } catch (err) {
                toast.error(err?.response?.data?.message)
            }

        } else {
            console.log("online payment")
        }
    }


    return (
        <div className="w-full  lg:max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Order Summary</h2>

            {/* product preview */}
            <div className="flex items-center gap-5 my-5 text-gray-700 border-b border-orange-500 pb-2">
                <Link to={`/product-details/${details.product._id}`} className="size-8 rounded-full border-2 "><img src={details.product.thumbnail} alt="details.product.thumbnail" /> </Link>
                <p>{details.product.title}</p>
                <p>{details.quantity}X{details.product.price}= ${subtotal.toFixed(2)}</p>
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
                    <span>${discount.toFixed(2)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${amount.toFixed(2)} USD</span>
                </div>
            </div>

            <button onClick={handlePlaceOrder} className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition">
                Place Order →
            </button>
        </div>
    );
};

export default PlaceSingleOrderCard;
