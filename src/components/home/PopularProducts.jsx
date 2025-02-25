import ProductCard from "../commonComponents/ProductCard";
import useProductStore from "../../store/productStore";
import { useStore } from "zustand";

const PopularProducts = () => {

    const { products } = useStore(useProductStore);

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

            <button className="block mx-auto mt-10 border px-10 py-2 rounded-lg shadow text-gray-600  transition hover:bg-gray-100">Explore more</button>

        </div>
    );
};

export default PopularProducts;
