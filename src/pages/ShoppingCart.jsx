import toast from "react-hot-toast";
import emptyCartImage from "../assets/emptyCart.png"
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useEffect, useState } from "react";
import BreadCrumbs from "../components/commonComponents/BreadCrumbs";
import useCheckoutStore from "../store/checkoutStore";
import { Trash2 } from "lucide-react";


const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const setOrder = useCheckoutStore((state) => state.setOrder);
  const setCheckoutType = useCheckoutStore((state) => state.setCheckoutType)

  console.log(cartItems)

  const fetchCartData = async () => {
    try {
      const { data } = await axiosInstance.get("/api/cart/get-Cart-Items");
      if (data.success) {
        setCartItems(data.cart);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  useEffect(() => {
    fetchCartData();
  }, []);


  // Remove item from cart
  const removeCartItem = async (id) => {
    try {
      const { data } = await axiosInstance.delete(`/api/cart/remove-Item/${id}`);
      if (data.success) {
        toast.success(data.message);
        setCartItems((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error("Remove Cart Item Error:", err);
      toast.error(err.response?.data?.message || "Failed to remove item");
    }
  };

  // handle checkout now
  const handleCheckout = () => {
    const orderData = cartItems.map((item) => {
      return {
        product: item.productDetails,
        quantity: item.quantity
      }
    })
    setOrder(orderData);
    setCheckoutType("cartItems")
    navigate("/checkout")
  }



  return (
    <div className="mt-24  md:mt-[120px]">
      {/* Breadcrumbs */}
      <BreadCrumbs />

      {/* Cart Details */}
      <div className="container my-10 flex flex-col  gap-10">
        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500 text-lg  flex flex-col items-center ">
            {/* empty cart message */}
            <img src={emptyCartImage} alt="empty cart" className="max-w-[500px] object-cover " />
            <h1 className="text-orange-500 text-xl">Empty cart!</h1>
            <Link to="/products" className="mt-2 border border-orange-500 px-14 py-2 rounded-sm text-orange-500 font-semibold shadow-sm">Visit store</Link>
          </div>
        ) : (
          <div className="py-4 flex-1">
            <h1 className="text-xl md:text-2xl text-gray-700 font-medium">Shopping Cart</h1>
            {/* table */}
            <div className="overflow-x-auto mt-5">
              <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-orange-500 text-white text-left text-nowrap">
                    <th className="p-3">Product</th>
                    <th className="p-3">Title</th>
                    <th className="p-3">Original Price</th>
                    <th className="p-3">Offer Price</th>
                    <th className="p-3">Quantity</th>
                    <th className="p-3">Sub-Total</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id} className="border-t border-gray-200 hover:bg-gray-100">
                      <td className="p-3">
                        <Link to={`/product-details/${item.productId}`} className="block w-16 h-16">
                          <img
                            src={item.productDetails.thumbnail}
                            alt={item.productDetails.title}
                            className="w-full h-full object-cover rounded"
                          />
                        </Link>
                      </td>
                      <td className="p-3">{item.productDetails.title}</td>
                      <td className="p-3">₹{item.productDetails.price.toFixed(2)}</td>
                      <td className="p-3">₹{(
                        item.productDetails.price -
                        (item.productDetails.discountPercentage * item.productDetails.price) / 100
                      ).toFixed(2)}</td>
                      <td className="p-3 text-center">{item.quantity}</td>
                      <td className="p-3">₹{(
                        item.quantity * (item.productDetails.price - (item.productDetails.discountPercentage * item.productDetails.price) / 100)
                      ).toFixed(2)}</td>
                      <td className="p-3 text-center">
                        <button onClick={() => removeCartItem(item._id)} className="text-red-500 hover:text-red-700">
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* Checkout Section */}
        {cartItems.length > 0 && <button onClick={handleCheckout} className="bg-orange-500 text-white font-medium px-10 py-2 rounded-sm  w-fit self-end">Checkout Now</button>}


      </div>
    </div>
  );
};

export default ShoppingCart;
