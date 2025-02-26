import { assets } from "../../assets/assets"

const ProductDetails = ({ product }) => {


    //  calculate discounted price
    const discountedPrice = product.price - (product.discountPercentage / 100) * product.price;

    return (
        <div className="">


            {/* about rating */}
            <div className="flex gap-2 items-center">
                <img src={assets.star_icon} alt="" />
                <p className="text-black font-medium">{product.rating} Star Rating </p>
                <p className="text-gray-600">({product.reviews.length} User feedback)</p>
            </div>

            {/* product title */}
            <h1 className="text-2xl font-semibold mt-4">{product.title}</h1>

            {/* about product */}
            <span className="flex items-center justify-between mt-4">
                <p className="text-gray-600 text-sm">Sku: <span className="text-black font-semibold">{product.sku}</span></p>
                <p className="text-gray-600 text-sm">Availbility: <span className="text-green-600 font-semibold">{product.availabilityStatus}</span></p>
            </span>
            <span className="flex items-center justify-between mt-2">
                <p className="text-gray-600 text-sm">Brand: <span className="text-black font-semibold">{product.brand || "Not available"}</span></p>
                <p className="text-gray-600 text-sm">Category: <span className="text-black font-semibold">{product.category}</span></p>
            </span>

            {/* price section */}
            <span className="mt-4 flex items-center gap-4">
                <p className="text-xl font-semibold text-blue-6 00">${discountedPrice.toFixed(2)}</p>
                <p className="text-sm text-gray-600 line-through font-medium">${product.price}</p>
                <p className="bg-orange-500 px-2 py-2 rounded-md text-white font-semibold">{product.discountPercentage}% OFF</p>
            </span>

            <hr className="mt-4 h-[1px] bg-gray-600/30" />

            {/* additional details */}
            <p className="text-gray-600 flex items-center gap-2 border py-1 px-2 mt-4 rounded">Minimun order Quantity: <span className="text-gray-900 font-medium">{product.minimumOrderQuantity}</span></p>

        </div>
    )
}

export default ProductDetails