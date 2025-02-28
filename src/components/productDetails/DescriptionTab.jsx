
const DescriptionTab = ({ productDescription }) => {

    return (
        <div className="flex justify-center items-center gap-2 flex-col px-5 py-5 md:py-8">
            <p className="font-semibold text-xl text-gray-800">Description</p>
            <p className="text-center text-gray-600">{productDescription}</p>
            <p className="text-center text-gray-600">
                Crafted with precision and designed for excellence, this product delivers top-notch performance and reliability.
                Whether you're a professional or a casual user, you'll appreciate the attention to detail and superior quality
                that makes it stand out. Experience the perfect balance of style and functionality.
            </p>
        </div>

    );
};

export default DescriptionTab;
