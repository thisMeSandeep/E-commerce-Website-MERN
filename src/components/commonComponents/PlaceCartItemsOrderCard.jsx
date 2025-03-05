import { Link } from "react-router-dom";
import useCheckoutStore from "../../store/checkoutStore";

const PlaceCartItemsOrderCard = () => {

    const cartItems = useCheckoutStore((state) => state.cartItems);

    console.log(cartItems)

    // totalprice
    const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity*item.price, 0)
    // tax
    const tax = 12 * (totalPrice / 100);
    // total
    const total = totalPrice + tax;


    return (
        <div className="w-full lg:max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            {/* products review */}
            {
                cartItems.map((item) => (
                    <div key={item._id} className="flex items-center gap-5 my-5 text-gray-700 pb-2">
                        <Link to={`/product-details/${item.productId}`} className="size-8 rounded-full border-2 "><img src={item.thumbnail} alt="" /> </Link>
                        <p>{item.title}</p>
                        <p>{item.quantity}X{item.price}= ${(item.quantity*item.price).toFixed(2)}</p>
                    </div>
                ))
            }

            <div className="space-y-2 text-gray-700  border-t border-orange-500 py-1">
                <div className="flex justify-between">
                    <span>Sub-total</span>
                    <span>${totalPrice?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-500">Free</span>
                </div>
                <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)} USD</span>
                </div>
            </div>

            {/* Proceed to Checkout Button */}
            <button
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
