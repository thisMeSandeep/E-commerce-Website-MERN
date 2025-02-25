import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import useProductStore from "../store/productStore";
import BreadCrumbs from "../components/commonComponents/BreadCrumbs";
import MainProduct from "../components/productDetails/MainProduct";

const ProductDetailPage = () => {
  const { pid } = useParams();
  const { products } = useStore(useProductStore);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!pid || products.length === 0) return; // Prevent running on empty products
  
    const foundProduct = products.find((p) => p.id === parseInt(pid));
    if (foundProduct) setProduct(foundProduct);
  }, [pid, products]); 

  console.log(pid, product);

  return (
    <div className="mt-28">
      <BreadCrumbs />
      <div className="container mt-10">
        <MainProduct product={product} />
      </div>

    </div>
  );
};

export default ProductDetailPage;
