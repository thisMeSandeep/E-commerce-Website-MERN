import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ChevronRight, Home, Plus, X } from "lucide-react";

const WishListPage = () => {
  const [wishlist, setWishlist] = useState([]);

  // Fetch wishlist items
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const { data } = await axiosInstance.get("/api/wishlist/get-items");
        if (data.success) {
          setWishlist(data.items);
        }
      } catch (err) {
        console.log(err.message);
        toast.error("Failed to load wishlist");
      }
    };
    fetchWishlist();
  }, []);

  // Remove item from wishlist
  const removeFromWishlist = async (id) => {
    try {
      const { data } = await axiosInstance.delete(`/api/wishlist/remove-items/${id}`);
      if (data.success) {
        setWishlist((prev) => prev.filter((item) => item._id !== id));
        toast.success(data.message);
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Failed to remove item");
    }
  };

  // Add item to cart
  const addItemToCart = async (id) => {
    try {
      const { data } = await axiosInstance.get(`/api/products/get-products/${id}`);
      if (!data.success) {
        toast.error("Failed to fetch product details");
        return;
      }

      const product = data.product;

      // Calculate discounted price
      const discountPercentage = product.discountPercentage || 0;
      const discountedPrice = product.price - (discountPercentage * product.price) / 100;

      const cartData = {
        quantity: product.minimumOrderQuantity,
        title: product.title,
        price: discountedPrice.toFixed(2),
        thumbnail: product.thumbnail,
        productId: product._id,
      };

      const response = await axiosInstance.post("/api/cart/addItemToCart", cartData);
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="mt-[120px]">
      {/* Breadcrumbs */}
      <div className="flex text-gray-500 text-sm items-center gap-2 py-4 bg-blue-100/50 px-5 overflow-x-auto no-scrollbar text-nowrap">
        <Link to="/" className="flex items-center gap-2">
          <Home className="size-5 text-orange-500" /> Home
        </Link>
        <ChevronRight className="size-5" />
        <Link to="/wishlist">Wishlist</Link>
      </div>

      <div className="container mt-10 ">
        {/* Wishlist Section */}
        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-gray-500">No items in Wishlist</p>
            <Link
              to="/products"
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="border py-4 rounded-md shadow">
            <h1 className="text-2xl font-semibold mb-4 px-5">Wishlist</h1>

            {/* Table Header */}
            <div className="grid grid-cols-4 place-items-center border-b pb-2 text-gray-600 font-semibold mt-5 text-[12px] md:text-sm">
              <p>PRODUCT</p>
              <p>PRICE</p>
              <p>STOCK STATUS</p>
              <p>ACTIONS</p>
            </div>

            {/* Wishlist Items */}
            {wishlist.map((item) => (
              <div key={item._id} className="grid grid-cols-4 place-items-center border-b py-3 ">
                <div className="flex items-center gap-3">
                  <Link to={`/product-details/${item.productId}`}>
                    <img src={item.thumbnail} alt={item.title} className="h-16 w-16 object-cover rounded-md" />
                  </Link>
                  <p className="truncate max-w-[150px] hidden md:block">{item.title}</p>
                </div>
                <p>${item.price ? item.price.toFixed(2) : "N/A"}</p>
                <p className={`text-sm ${item.stockStatus === "In Stock" ? "text-green-600" : "text-red-600"}`}>
                  {item.stockStatus}
                </p>
                <div className="flex gap-5">
                  <button onClick={() => addItemToCart(item.productId)} className="bg-orange-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition hidden md:block">
                    Add to Cart
                  </button>
                  <button onClick={() => addItemToCart(item.productId)} className="bg-orange-500 rounded-full p-1 md:hidden">
                    <Plus className="text-white " />
                  </button>
                  <X
                    onClick={() => removeFromWishlist(item._id)}
                    className="text-red-500 cursor-pointer hover:text-red-700 transition"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishListPage;
