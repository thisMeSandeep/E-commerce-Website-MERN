import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import BreadCrumbs from "../components/commonComponents/BreadCrumbs";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch all orders
  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/api/order/get-orders");
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.log(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // cancel order
  const cancelOrder = async (id) => {
    try {
      const { data } = await axiosInstance.patch(`api/order/cancel-order/${id}`);
      if (data.success) {
        toast.success(data.message);
        fetchAllOrders()
      }
    } catch (err) {
      console.log(err.response?.data?.message);
      toast.error(err.response?.data?.message)
    }
  };


  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="mt-[120px]">
      <BreadCrumbs />
      <div className="container my-10">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="w-12 h-12 text-orange-500 animate-spin" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-10">
            <h2 className="text-2xl font-semibold text-gray-700">No orders found</h2>
            <p className="text-gray-500">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-semibold mb-6 text-gray-600">My Orders</h1>

            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full border border-gray-300 rounded-lg overflow-hidden text-center">
                <thead>
                  <tr className="bg-orange-500 text-white text-sm uppercase text-nowrap">
                    <th className="px-4 py-2">Product</th>
                    <th className="px-4 py-2">Title</th>
                    <th className="px-4 py-2">Quantity</th>
                    <th className="px-4 py-2">Amount</th>
                    <th className="px-4 py-2">Order Date</th>
                    <th className="px-4 py-2">Payment Method</th>
                    <th className="px-4 py-2">Payment Status</th>
                    <th className="px-4 py-2">Order Status</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-t text-gray-700 text-sm">
                      <td className="px-4 py-2">
                        <Link to={`/product-details/${order.productId}`}>
                          <img src={order.productDetails.thumbnail} alt="" className="w-12 h-12 rounded-md object-cover" />
                        </Link>
                      </td>
                      <td className="px-4 py-2">{order.productDetails.title}</td>
                      <td className="px-4 py-2">{order.quantity}</td>
                      <td className="px-4 py-2">${order.amount.toFixed(2)}</td>
                      <td className="px-4 py-2">{new Date(order.orderDate).toLocaleDateString()}</td>
                      <td className="px-4 py-2">{order.paymentMethod}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 w-[100px] text-center block rounded text-white ${order.paymentStatus === "paid" ? "bg-green-500" : "bg-red-500"
                            }`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="px-4 py-2">{order.orderStatus.toUpperCase()}</td>
                      <td className="px-4 py-2">
                        <button onClick={() => cancelOrder(order._id)} className="bg-orange-500 text-white px-3 py-1 rounded-md hover:bg-orange-600 transition">
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;
