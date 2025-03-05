import useCheckoutStore from "../../store/checkoutStore";
import { Link } from "react-router-dom";
// import axiosInstance from "../../utils/axiosInstance";
// import toast from "react-hot-toast";

const PlaceSingleOrderCard = ({ paymentType }) => {

    const singleProduct = useCheckoutStore((state) => state.singleProduct);
    console.log("single Product", singleProduct)

    console.log(singleProduct.quantity)
    console.log(singleProduct.discountPercentage)
    console.log(singleProduct.price)

    const discount = singleProduct.quantity * (singleProduct.discountPercentage * singleProduct.originalPrice / 100);
    const tax = 12 * (singleProduct.quantity * singleProduct.originalPrice - discount) / 100;

    const totalPrice = singleProduct.quantity * singleProduct?.originalPrice;
    // final price to pay
    const finalPrice = totalPrice + tax - discount;


    return (
        <div className="w-full  lg:max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Order Summary</h2>

            {/* product preview */}
            <div className="flex items-center gap-5 my-5 text-gray-700 border-b border-orange-500 pb-2">
                <Link to={`/product-details/${singleProduct.productId}`} className="size-8 rounded-full border-2 "><img src={singleProduct.thumbnail} alt="" /> </Link>
                <p>{singleProduct.title}</p>
                <p>{singleProduct.quantity}X{singleProduct.originalPrice}= ${totalPrice.toFixed(2)}</p>
            </div>

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
                    <span>${finalPrice.toFixed(2)} USD</span>
                </div>
            </div>

            <button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition">
                Place Order →
            </button>
        </div>
    );
};

export default PlaceSingleOrderCard;
