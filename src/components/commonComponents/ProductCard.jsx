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
        <div className="flex flex-col items-start gap-0.5 cursor-pointer relative min-w-[200px] w-full">
            {/* Product Image */}
            <Link to={`/product-details/${product._id}`} className="cursor-pointer group relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="group-hover:scale-105 transition object-cover w-4/5 h-4/5 md:w-full md:h-full"
                />
            </Link>

            {/* Product Title & Description */}
            <p className="md:text-base font-medium pt-2 w-full truncate">{product.title}</p>
            <p className="w-full text-xs text-gray-500/70 max-sm:hidden truncate">{product.description}</p>

            {/* Rating */}
            <div className="flex items-center gap-2">
                <p className="text-xs">{product.rating}</p>
                <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <img
                            key={index}
                            className="h-3 w-3"
                            src={index < Math.floor(product.rating) ? assets.star_icon : assets.star_dull_icon}
                            alt="star_icon"
                        />
                    ))}
                </div>
            </div>

            {/* Price & Wishlist Button */}
            <div className="flex items-end justify-between w-full mt-1">
                <p className="text-base font-medium">${discountedPrice.toFixed(2)}</p>
                <button className="bg-white p-2 rounded-full shadow-md hover:scale-105" onClick={addItem}>
                    <img className="h-3 w-3" src={assets.heart_icon} alt="heart_icon" />
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
