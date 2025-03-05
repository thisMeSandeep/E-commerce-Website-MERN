import { X } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useEffect, useState } from "react";
import BreadCrumbs from "../components/commonComponents/BreadCrumbs";
import useCheckoutStore from "../store/checkoutStore";


const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const setCartCheckout = useCheckoutStore((state) => state.setCartCheckout);
  const navigate = useNavigate();

  console.log(cartItems)

  const fetchCartData = async () => {
    try {
      const { data } = await axiosInstance.get("/api/cart/getCartItems");
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
      const { data } = await axiosInstance.delete(`/api/cart/removeItem/${id}`);
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
    setCartCheckout(cartItems);
    navigate("/checkout")
  }



  return (
    <div className="mt-24  md:mt-[120px]">
      {/* Breadcrumbs */}
      <BreadCrumbs />

      {/* Cart Details */}
      <div className="container my-10 flex flex-col  gap-10">
        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500 text-lg py-10">Your cart is empty.</div>
        ) : (
          <div className="border shadow rounded-md py-4 flex-1">
            <h1 className="text-gray-600 text-xl font-medium px-4">Shopping Cart</h1>

            {/* Cart Table Heading */}
            <div className="mt-5 grid grid-cols-5 gap-2 md:gap-5 bg-blue-100/50 py-2 sm:py-3 place-items-center text-center text-[12px] sm:text-sm font-medium text-gray-500 text-nowrap px-1 ">
              <p>PRODUCTS</p>
              <p>PRICE</p>
              <p>QUANTITY</p>
              <p>SUB-TOTAL</p>
              <X />
            </div>

            {/* Cart Items */}
            {cartItems.map((item) => (
              <div key={item._id} className=" grid grid-cols-5 gap-5 place-items-center border-b py-1">
                {/* Image and Name */}
                <div className="flex  items-center gap-4">
                  <Link to={`/product-details/${item.productId}`}>
                    <img src={item.thumbnail} alt={item.title} className="size-12 md:size-16 rounded-full  object-cover" />
                  </Link>
                  <p className="text-gray-700 hidden md:block ">{item.title}</p>
                </div>

                {/* Price */}
                <p className="text-gray-700">${item.price.toFixed(2)}</p>

                {/* Quantity */}
                <span className="text-gray-700">{item.quantity}</span>

                {/* Subtotal */}
                <p className="text-gray-700">${(item.price * item.quantity).toFixed(2)}</p>
                {/* remove icon */}
                <X className="text-red-500 cursor-pointer" onClick={() => removeCartItem(item._id)} />
              </div>
            ))}
          </div>
        )}

        {/* Checkout Section */}
        {cartItems.length > 0 && <button onClick={handleCheckout} className="bg-orange-500 text-white font-medium px-10 py-2 rounded-sm  w-fit self-end">Checkout Now</button>}


      </div>
    </div>
  );
};

export default ShoppingCart;
