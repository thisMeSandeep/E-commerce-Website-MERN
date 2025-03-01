import { useParams } from "react-router-dom";
import BreadCrumbs from "../components/commonComponents/BreadCrumbs";
import MainProduct from "../components/productDetails/MainProduct";
import ProductDescription from "../components/productDetails/ProductDescription";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Loader } from "lucide-react";
import RelatedProducts from "../components/productDetails/RelatedProducts";


const ProductDetailPage = () => {
  const { pid } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

 

  // Fetch product details
  const fetchProductDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axiosInstance.get(`/api/products/get-products/${pid}`);
      if (data.success) {
        setProduct(data.product);
      } else {
        setError(data.message || "Failed to fetch product");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pid) {
      fetchProductDetails();
    }
  }, [pid]);


  return (
    <div className="mt-28">
      <BreadCrumbs productName={product?.title} />
      <div className="container mt-10">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="size-10 text-gray-600 animate-spin" />
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : product ? (
          <>
            <MainProduct product={product} />
            <ProductDescription product={product} />
            <RelatedProducts category={product.category} />
          </>
        ) : (
          <p className="text-gray-500 text-center">No product data available</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;