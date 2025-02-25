import ProductCard from "../commonComponents/ProductCard";
import useProductStore from "../../store/productStore";
import { useStore } from "zustand";
import { useNavigate} from "react-router-dom";

const PopularProducts = () => {

    const { products } = useStore(useProductStore);
    const navigate=useNavigate();

    return (
        <div className="my-10">
            <h1 className="text-2xl font-medium text-gray-700">Popular Products</h1>

            <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center">
                {
                    products.slice(0, 10).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </div>

            <button className="block mx-auto mt-10 border px-10 py-2 rounded-md text-gray-600  transition hover:bg-gray-100" onClick={()=>navigate("/products")}>Explore more</button>

        </div>
    );
};

export default PopularProducts;
