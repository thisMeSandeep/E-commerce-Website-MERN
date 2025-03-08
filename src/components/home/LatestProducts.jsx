import ProductCard from "../commonComponents/ProductCard";
import axiosInstance from "../../utils/axiosInstance";
import { useEffect, useState } from "react";
import ProductSkeleton from "../commonComponents/ProductSkeleton";

const LatestProducts = () => {
    const [latestProducts, setLatestProducts] = useState([]);
    const [loading, setLoading] = useState(true);


    // Fetch some products
    const fetchProduct = async () => {
        setLoading(true);
        try {
            const { data } = await axiosInstance.get(`/api/products/get-products`);
            if (data.success) {
                setLatestProducts(data.data);
            }
        } catch (err) {
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    return (
        <div className="my-10">
            {/* Popular products header */}
            <div className="flex flex-col lg:flex-row gap-5 lg:items-center justify-between ">
                <div>
                    <h1 className="text-2xl font-medium text-gray-700 uppercase">Latest Products</h1>
                    <p className=" font-light text-gray-600">
                        Buy latest Product with extra discount
                    </p>
                </div>
            </div>

            {/* Products Grid */}
            <div className="mt-10 flex items-center gap-5 overflow-x-scroll no-scrollbar">
                {loading
                    ? Array.from({ length: 10 }).map((_, index) => (
                        <ProductSkeleton key={index} />
                    ))
                    : latestProducts.slice(10, 20).map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
            </div>
        </div>
    );
};

export default LatestProducts;
