import { ChevronDown, CircleHelp, Headphones, MapPin, Phone, PlusSquare, RefreshCcw, X } from "lucide-react";
import categories from "../../data/categories";
import { useCategoryContext } from "../../contexts/CategoryContext";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const HeaderNav2 = () => {

  const { currentCategory, setCurrentCategory } = useCategoryContext();
  const [toggleSidebar, setToggleSidebar] = useState(false)
  const navigate = useNavigate();

  const handleCategoryChange = (item) => {
    console.log(item)
    setCurrentCategory(item);
    setToggleSidebar(false);
    navigate("/products")
  }

  return (
    <div className="container py-2 md:py-3 border-b border-gray-300 flex justify-between text-gray-600 gap-5 text-sm overflow-x-hidden no-scrollbar">

      <div className=" flex items-center gap-5 md:gap-8">

        {/* category election */}
        <span onClick={() => setToggleSidebar(prev => !prev)} className="flex items-center gap-5 hover:bg-gray-100 px-5 py-2 rounded-sm cursor-pointer text-nowrap"><p className="uppercase">Shop by category</p><ChevronDown /></span>

        {/* category sidebar */}
        <div className={`h-screen w-72 absolute left-0 top-0 bottom-0  shadow-md bg-white z-50 py-4 overflow-x-hidden  overflow-y-hidden transition-all duration-500 ${toggleSidebar ? "translate-x-0" : "-translate-x-[100%]"} `}>
          <div className="flex items-center justify-between px-4">
            <p className="text-gray-700 text-[16px] font-medium uppercase">shop by categories</p>
            <X className="cursor-pointer" onClick={() => setToggleSidebar(false)} />
          </div>
          <ul className="mt-4 space-y-2 h-[100%] overflow-y-scroll no-scrollbar">
            {
              categories.map((item, index) => (
                <div onClick={() => handleCategoryChange(item)} key={index} className="flex items-center justify-between px-4 cursor-pointer hover:bg-gray-100 py-1">
                  <p className="uppercase text-[12px] font-semibold text-gray-800">{item.replace("-", " ")}</p>
                  <PlusSquare className="size-[16px] text-gray-900" />
                </div>
              ))
            }
          </ul>
        </div>


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