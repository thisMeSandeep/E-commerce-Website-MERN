import { useParams } from "react-router-dom";
import useProductStore from "../store/productStore";
import BreadCrumbs from "../components/commonComponents/BreadCrumbs";
import MainProduct from "../components/productDetails/MainProduct";
import ProductDescription from "../components/productDetails/ProductDescription";

const ProductDetailPage = () => {
  const { pid } = useParams();

  const product = useProductStore((state) => {
    return state.products.find((p) => p.id === parseInt(pid));
  })

  console.log(pid, product);

  return (
    <div className="mt-28">
      <BreadCrumbs title={product?.title} />

      <div className="container mt-10">
        <MainProduct product={product} />
        <ProductDescription productId={product.id} />
      </div>

    </div>
  );
};

export default ProductDetailPage;
