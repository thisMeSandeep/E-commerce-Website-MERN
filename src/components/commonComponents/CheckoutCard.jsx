
const CheckoutCard = ({ totalPrice }) => {

    const discount = (5 * totalPrice) / 100;
    const tax = (12 * (totalPrice - discount)) / 100;
    const total = totalPrice - discount + tax;


    return (
        <div className="w-full  lg:max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Cart Totals</h2>
            <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                    <span>Sub-total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-500">Free</span>
                </div>
                <div className="flex justify-between">
                    <span>Discount</span>
                    <span className="text-red-500">-${discount.toFixed(2)}</span>
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

            <button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition">
                Proceed to Checkout →
            </button>

            {/* Coupon Code Section */}
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

export default CheckoutCard;
