import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import ProductCard from "../commonComponents/ProductCard";
import { useCategoryContext } from "../../contexts/CategoryContext";
import ProductSkeleton from "../commonComponents/ProductSkeleton";
import SliderSlick from "../commonComponents/Slider";

const ElectronicsProducts = () => {
  const [electronics, setElectronics] = useState([]);
  const { setCurrentCategory } = useCategoryContext();
  const [loading, setLoading] = useState(false);

  // Fetch electronics products
  const fetchElectronicsProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/api/products/get-products?category=smartphones");
      setElectronics(data.data);
    } catch (err) {
      console.error("Error fetching products:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchElectronicsProducts();
  }, []);

  return (
    <div className="my-10">
      <h1 className="text-2xl font-medium text-gray-700 uppercase">Smart Phones</h1>
      <p className="font-light text-gray-600">Buy latest smartphones from top brands</p>

      {/* Product Slider */}
      <div className="mt-10">
        {loading ? (
          <SliderSlick
            slides={Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="p-2">
                <ProductSkeleton />
              </div>
            ))}
          />
        ) : (
          <SliderSlick
            slides={electronics.slice(0, 10).map((product) => (
              <div key={product._id} className="p-2">
                <ProductCard product={product} />
              </div>
            ))}
          />
        )}
      </div>

      {/* Explore More Button */}
      <Link
        to="/products"
        className="block w-fit mx-auto mt-10 border border-orange-500 px-10 py-2 rounded-md text-orange-500 transition hover:bg-orange-500 hover:text-white"
        onClick={() => setCurrentCategory("smartphones")}
      >
        Explore more
      </Link>
    </div>
  );
};

export default ElectronicsProducts;
