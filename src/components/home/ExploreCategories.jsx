
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
                            className=" relative flex flex-col items-center justify-between gap-2 border p-3 rounded-lg shadow-lg bg-gradient-to-br from-gray-900 to-gray-700 group "
                        >
                            <img src={item.image} alt="item.image" className=" w-24 md:w-32 object-cover group-hover:scale-110 transition-all duration-300" />
                            <h1 className="text-center text-xl md:text-3xl text-gray-100 font-medium">
                                {item.category}
                            </h1>

                            <div className="flex flex-col lg:flex-row items-center gap-4">
                                <p className="text-center text-sm text-gray-200">{item.highlight}</p>
                                <button className="w-full sm:w-32 bg-gradient-to-br from-orange-500 to-orange-700 px-6 py-[8px] sm:px-10 sm:py-2 text-sm sm:text-lg text-white rounded-lg">
                                    Explore
                                </button>

                            </div>
                        </div>

                    ))
                }
            </div>
        </div>
    )
}

export default ExploreCategories