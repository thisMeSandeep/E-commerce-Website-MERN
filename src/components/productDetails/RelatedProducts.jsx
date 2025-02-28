import { useEffect, useState } from "react"
import axiosInstance from "../../utils/axiosInstance";
import ProductCard from "../commonComponents/ProductCard";

const RelatedProducts = ({ category }) => {
    const [relatedProducts, setRelatedProducts] = useState([]);

    //  fetch related products
    const fetchProducts = async () => {
        try {
            const { data } = await axiosInstance.get(`/api/products/get-products?category=${category}`);
            if (data.success) {
                setRelatedProducts(data.data)
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        if (category) {
            fetchProducts();
        }
    }, [category])


    return (
        <div className="my-16">
            <h1 className="text-2xl font-semibold text-gray-600">Related Products</h1>
            <div className=" mt-5 flex items-center  gap-5 overflow-x-auto no-scrollbar">
                {
                    relatedProducts.slice(0, 10).map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                }
            </div>
        </div>
    )
}

export default RelatedProducts