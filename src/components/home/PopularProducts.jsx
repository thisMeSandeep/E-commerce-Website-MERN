import ProductCard from "../commonComponents/ProductCard";
import categories from "../../data/categories";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { useEffect, useState } from "react";
import ProductSkeleton from "../commonComponents/ProductSkeleton";

const PopularProducts = () => {
    const [popularProducts, setPopularProducts] = useState([]);
    const [category, setCategory] = useState("groceries");
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    // Fetch some products
    const fetchProduct = async () => {
        setLoading(true);
        try {
            const { data } = await axiosInstance.get(`/api/products/get-products?category=${category}`);
            if (data.success) {
                setPopularProducts(data.data);
            }
        } catch (err) {
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [category]);

    return (
        <div className="my-10">
            {/* Popular products header */}
            <div className="flex flex-col lg:flex-row gap-5 lg:items-center justify-between ">
                <div>
                    <h1 className="text-2xl font-medium text-gray-700 uppercase">Popular Products</h1>
                    <p className=" font-light text-gray-600">
                        Do not miss the current offers until the end of March.
                    </p>
                </div>
                <div className="overflow-x-auto no-scrollbar">
                    <div className="flex items-center gap-5 ">
                        {categories.slice(2, 10).map((item, index) => (
                            <span
                                onClick={() => setCategory(item)}
                                key={index}
                                className={` cursor-pointer text-nowrap ${category===item?"text-orange-500":"text-gray-700"}`}
                            >
                                {item.replace("-", " ")}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-8 sm:grid-cols-3  lg:grid-cols-5 place-items-center">
                {loading
                    ? Array.from({ length: 10 }).map((_, index) => (
                        <ProductSkeleton key={index} />
                    ))
                    : popularProducts.slice(0, 10).map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
            </div>

            {/* Explore more button */}
            <button
                className="block mx-auto mt-10 border border-orange-500 px-10 py-2 rounded-md text-orange-500 transition hover:bg-orange-500 hover:text-white"
                onClick={() => navigate("/products")}
            >
                Explore more
            </button>
        </div>
    );
};

export default PopularProducts;
