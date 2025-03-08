import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";

const ProductCard = ({ product }) => {
    const { addItemToWishlist } = useAppContext();

    // Calculate discounted price
    const discountPercentage = product.discountPercentage || 0;
    const discountedPrice = product.price - (discountPercentage * product.price) / 100;

    // wishlist data
    const itemData = {
        productId: product._id,
        title: product.title,
        thumbnail: product.thumbnail,
        price: discountedPrice.toFixed(2),
        stockStatus: product.stock > 0 ? "In Stock" : "Out of Stock",
    };

    // Add item to wishlist
    const addItem = async () => {
        console.log(itemData)
        await addItemToWishlist(itemData);
    };

    return (
        <div className="flex flex-col items-start gap-0.5  relative min-w-[150px] w-full border shadow rounded-lg">
             
             {/* discounte % */}
             <p className="bg-orange-400 absolute top-2 left-2 text-[12px] font-medium text-white px-1 py-1.5 rounded-xl z-10">{Math.trunc(discountPercentage)}%</p>

            {/* Product Image */}
            <Link to={`/product-details/${product._id}`} className="cursor-pointer group relative bg-gray-500/10  w-full h-45 flex items-center justify-center overflow-hidden">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="group-hover:scale-[1.2] transition duration-300 object-cover w-4/5 h-4/5 md:w-full md:h-full"
                />
            </Link>

            {/* Product Title & Description */}
            <div className="overflow-hidden w-full p-4 space-y-1">
                <p className="md:text-base font-medium  w-full truncate text-gray-700">{product.title}</p>
                <p className="w-full text-xs text-gray-500/70 max-sm:hidden truncate">{product.description}</p>

                {/* Rating */}
                <div className="flex items-center gap-2">
                    <p className="text-xs">{product.rating}</p>
                    <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <img
                                key={index}
                                className="h-3 w-3"
                                src={index < Math.round(product.rating) ? assets.star_icon : assets.star_dull_icon}
                                alt="star_icon"
                            />
                        ))}
                    </div>
                </div>

                {/* Price & Wishlist Button */}
                <div className="flex items-end justify-between w-full">
                    <p className="text-base font-medium">${discountedPrice.toFixed(2)}</p>
                    <button className="bg-white p-2 rounded-full shadow-md hover:scale-105" onClick={addItem}>
                        <img className="h-3 w-3" src={assets.heart_icon} alt="heart_icon" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
