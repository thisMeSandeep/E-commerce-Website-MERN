import { CircleHelp, Headphones, MapPin, Phone, RefreshCcw } from "lucide-react";
import categories from "../../data/categories";
import { useCategoryContext } from "../../contexts/CategoryContext";
import { useNavigate } from "react-router-dom";

const HeaderNav2 = () => {

  const { currentCategory, setCurrentCategory } = useCategoryContext();
  const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    setCurrentCategory(e.target.value);
    navigate("/products")
  }

  return (
    <div className="container py-2 md:py-3 border-b border-gray-300 flex justify-between text-gray-600 text-sm">

      <div className=" flex items-center gap-5 md:gap-8">

        {/* category selection */}
        <select value={currentCategory} className="w-full  rounded-lg bg-white text-gray-700 focus:outline-none cursor-pointer no-scrollbar " onChange={handleCategoryChange}>
          <option value="all">All</option>
          {categories.map((item, index) => (
            <option value={item} key={index} className="text-gray-700 capitalize">
              {item.replace("-", " ")}
            </option>
          ))}
        </select>


        {/* county  */}
        <p className="flex items-center gap-2">
          <MapPin className="size-4 " />
          <span className="hidden lg:inline">India</span>
        </p>

        {/* Compare */}
        <p className="flex items-center gap-2">
          <RefreshCcw className="size-4 " />
          <span className="hidden lg:inline">Compare</span>
        </p>

        {/* customer support */}
        <p className="flex items-center gap-2">
          <Headphones className="size-4 " />
          <span className="hidden lg:inline text-nowrap">Customer Support</span>
        </p>

        {/* Need help */}
        <p className="flex items-center gap-2">
          <CircleHelp className="size-4 " />
          <span className="hidden lg:inline">Help</span>
        </p>


      </div>
      {/* Mobile number */}
      <p className="flex items-center gap-2">
        <Phone className="size-4" />
        <span className="hidden lg:inline">91 + 9305787990</span>
      </p>

    </div>
  )
}

export default HeaderNav2