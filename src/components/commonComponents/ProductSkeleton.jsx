const ProductSkeleton = () => {
    return (
        <div role="status" className="min-w-[150px]  w-full p-4 border rounded-lg shadow-md animate-pulse">
            {/* Image Skeleton */}
            <div className="w-full h-40 bg-gray-300 rounded-md"></div>

            {/* Product Title */}
            <div className="h-4 bg-gray-300 rounded-md w-3/4 mt-4"></div>

            {/* Price */}
            <div className="h-3 bg-gray-300 rounded-md w-1/3 mt-2"></div>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-3">
                <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
                <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
                <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
                <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
                <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
            </div>

            {/* Button */}
            <div className="h-8 bg-gray-300 rounded-md w-full mt-4"></div>

            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default ProductSkeleton;
