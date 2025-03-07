
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
            <h1 className=" text-2xl font-medium text-gray-700 uppercase">Explore By Categories</h1>
            <p className="text-gray-600 font-light">Explore products by category of your choice</p>
            <div className="mt-10 flex items-center justify-center gap-5 flex-wrap">
                {
                    exploreCategories.map((item) => (
                        <div
                            onClick={()=>handleOnClick(item.category)}
                            key={item.id}
                            className="w-36 flex flex-col  items-center justify-between gap-4 border p-5 rounded-sm shadow  group transform transition-all duration-300 hover:scale-[1.05] cursor-pointer"
                        >
                         <img src={item.image} alt="" className="size-10"/> 
                         <p className="text-nowrap">{item.category.replace("-"," ")}</p>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default ExploreCategories