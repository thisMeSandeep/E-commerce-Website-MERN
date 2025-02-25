import ProductCard from "../commonComponents/ProductCard"
import useProductStore from "../../store/productStore";
import { useStore } from "zustand";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ElectronicsProducts = () => {

    const { products } = useStore(useProductStore);
    const [electronics, setElectronics] = useState([]);
    const navigate=useNavigate();

    useEffect(() => {
        const electronicProducts = products.filter((item) => item.category === "smartphones" || item.category === "mens-watches");
        setElectronics(electronicProducts);
    }, [products])

    return (
        <div className="my-10">
            <h1 className="text-2xl font-medium text-gray-700">Electronics</h1>

            <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center">
                {
                    electronics.slice(0, 10).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </div>

            <button className="block mx-auto mt-10 border px-10 py-2 rounded-md  text-gray-600  transition hover:bg-gray-100" onClick={() =>navigate("/products")}>Explore more</button>

        </div>
    )
}

export default ElectronicsProducts