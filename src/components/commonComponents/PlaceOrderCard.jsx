import useCheckoutStore from "../../store/checkoutStore";
import { Link } from "react-router-dom";

const PlaceOrderCard = ({ paymentType }) => {

    const productDetails = useCheckoutStore((state) => state.productDetails);

    const checkoutType = useCheckoutStore((state) => state.checkoutType);

    console.log(productDetails);

    // total price
    const totalPrice = productDetails?.itemCount * productDetails?.product.price
    // calculate discount 
    const discount = (productDetails?.product.discountPercentage * productDetails?.itemCount * productDetails?.product.price) / 100;
    // tax
    const tax = (12 * (totalPrice - discount)) / 100;
    // total price to pay
    const total = totalPrice - discount + tax;



    return (
        <div className="w-full  lg:max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Order Summary</h2>

            {/* product preview */}
            {checkoutType === "single" &&
                <div className="flex items-center gap-5 my-5 text-gray-700 border-b border-orange-500 pb-2">
                    <Link to={`/product-details/${productDetails?.product._id}`} className="size-8 rounded-full border-2 "><img src={productDetails?.product?.thumbnail} alt="" /> </Link>
                    <p>{productDetails?.product.title}</p>
                    <p>{productDetails?.itemCount}X{productDetails.product.price}= ${totalPrice.toFixed(2)}</p>
                </div>
            }

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
                Place Order →
            </button>
        </div>
    );
};

export default PlaceOrderCard;
