import useProductStore from "../../store/productStore";

const DescriptionTab = ({ productId }) => {
    // Get product from Zustand store directly
    const product = useProductStore((state) =>
        state.products.find((p) => p.id === productId)
    );

    if (!product) return <p>Loading...</p>;

    return (
        <div className="flex justify-center items-center gap-2 flex-col px-5 py-5 md:py-8">
            <p className="font-semibold text-xl text-gray-800">Description</p>
            <p className="text-center text-gray-600">{product.description}</p>
            <p className="text-center text-gray-600">
                Crafted with precision and designed for excellence, this product delivers top-notch performance and reliability.
                Whether you're a professional or a casual user, you'll appreciate the attention to detail and superior quality
                that makes it stand out. Experience the perfect balance of style and functionality.
            </p>
        </div>

    );
};

export default DescriptionTab;
