import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import ProductCard from "../commonComponents/ProductCard";
import { useCategoryContext } from "../../contexts/CategoryContext";

const ElectronicsProducts = () => {
  const [electronics, setElectronics] = useState([]);
  const { setCurrentCategory } = useCategoryContext();

  // Fetch electronics products
  const fetchElectronicsProducts = async () => {
    try {
      const { data } = await axiosInstance.get("/api/products/get-products?category=smartphones");
      setElectronics(data.data);
    } catch (err) {
      console.error("Error fetching products:", err.message);
    }
  };

  useEffect(() => {
    fetchElectronicsProducts();
  }, []);

  return (
    <div className="my-10 bg-wh">
      <h1 className="text-2xl font-medium text-gray-700">Smart Phones</h1>

      {/* Product Grid */}
      <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center">
        {electronics?.slice(0, 10).map((product) => (
          <ProductCard key={product._id || product.id} product={product} />
        ))}
      </div>

      {/* Explore More Button */}
      <Link to='/products'
        className="block w-fit mx-auto mt-10 border px-10 py-2 rounded-md text-gray-600 transition hover:bg-gray-100"
        onClick={() => setCurrentCategory('smartphones')}
      >
        Explore more
      </Link>
    </div>
  );
};

export default ElectronicsProducts;
