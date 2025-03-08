
import { Star } from "lucide-react";

const ReviewTab = ({ reviews }) => {


    return (
        <div className="p-5 md:p-8 bg-white rounded">
            <h2 className="text-lg md:text-xl font-semibold mb-4 border-b pb-2">
                Customer Reviews ({reviews.length})
            </h2>

            {reviews.length === 0 ? (
                <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
            ) : (
                <div className="space-y-6 h-[400px] overflow-scroll no-scrollbar">
                    {reviews.map((review, index) => (
                        <div key={index} className="border p-4 rounded-lg shadow-sm">
                            {/* Reviewer name and date */}
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold text-gray-800">{review.reviewerName}</h3>
                                <p className="text-sm text-gray-500">
                                    {new Date(review.date).toLocaleDateString()}
                                </p>
                            </div>

                            {/* Rating with Stars */}
                            <div className="flex items-center gap-1 mt-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={18}
                                        className={i < review.rating ? "text-yellow-500" : "text-gray-300"}
                                        fill={i < review.rating ? "currentColor" : "none"}
                                    />
                                ))}
                            </div>

                            {/* Comment */}
                            <p className="mt-2 text-gray-700">{review.comment}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReviewTab;
