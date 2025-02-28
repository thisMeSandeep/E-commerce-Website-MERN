
import { useCategoryContext } from "../../contexts/CategoryContext";
import { exploreCategories } from "../../data/ExploreCategories";
import { useNavigate } from "react-router-dom";



const ExploreCategories = () => {

    const { setCurrentCategory } = useCategoryContext();
    const navigate = useNavigate();

    const handleOnClick = (category) => {
        console.log(category)
        setCurrentCategory(category);
        navigate("/products")
    }


    return (
        <div className="my-16">
            <h1 className=" text-2xl font-medium text-gray-700">Explore By Categories</h1>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-5">
                {
                    exploreCategories.map((item) => (
                        <div
                            key={item.id}
                            className="relative flex flex-col items-center justify-between gap-4 border p-5 rounded-2xl shadow  group transform transition-all duration-300 hover:scale-[1.05] "
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
                            <h1 className="text-center text-2xl md:text-3xl text-gray-700 font-semibold capitalize">
                                {item.category.replace("-"," ")}
                            </h1>

                            {/* Highlight Text */}
                            <p className="text-center text-sm  px-3 text-gray-600">
                                {item.highlight}
                            </p>

                            {/* Explore Button */}
                            <button className="w-full sm:w-36 bg-gradient-to-br from-orange-500 to-orange-700 px-6 py-2 text-md text-white font-medium rounded-lg shadow-md transition-all duration-300 hover:brightness-110 hover:scale-[1.05]" onClick={() => handleOnClick(item.category)}>
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