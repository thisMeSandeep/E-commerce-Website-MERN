
import { exploreCategories } from "../../data/ExploreCategories"

const ExploreCategories = () => {
    return (
        <div className="my-16">
            <h1 className=" text-2xl font-medium text-gray-700">Explore By Categories</h1>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-5">
                {
                    exploreCategories.map((item) => (
                        <div
                            key={item.id}
                            className="relative flex flex-col items-center justify-between gap-4 border p-5 rounded-2xl shadow-xl bg-gradient-to-br from-gray-800 to-gray-600 group transform transition-all duration-300 hover:scale-[1.05] hover:shadow-2xl"
                        >
                            {/* Image with hover effect */}
                            <div className="w-24 md:w-32 overflow-hidden rounded-full shadow-lg">
                                <img
                                    src={item.image}
                                    alt={item.category}
                                    className="object-cover w-full group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>

                            {/* Category Name */}
                            <h1 className="text-center text-2xl md:text-3xl text-gray-100 font-semibold">
                                {item.category}
                            </h1>

                            {/* Highlight Text */}
                            <p className="text-center text-sm text-gray-300 px-3">
                                {item.highlight}
                            </p>

                            {/* Explore Button */}
                            <button className="w-full sm:w-36 bg-gradient-to-br from-orange-500 to-orange-700 px-6 py-2 text-md text-white font-medium rounded-lg shadow-md transition-all duration-300 hover:brightness-110 hover:scale-[1.05]">
                                Explore
                            </button>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default ExploreCategories