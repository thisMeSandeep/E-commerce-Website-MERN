import { CircleHelp, Headphones,  MapPin,  Phone, RefreshCcw } from "lucide-react";


const HeaderNav2 = () => {

  const categories = [
    "all-category",
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
    "furniture",
    "tops",
    "womens-dresses",
    "womens-shoes",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "womens-watches",
    "womens-bags",
    "womens-jewellery",
    "sunglasses",
    "automotive",
    "motorcycle",
    "lighting"
  ];


  return (
    <div className="container py-2 md:py-3 border-b border-gray-300 flex justify-between text-gray-600 text-sm">

      <div className=" flex items-center gap-5 md:gap-8">

        {/* category selection */}
        <select className="w-full  rounded-lg bg-white text-gray-700 focus:outline-none cursor-pointer no-scrollbar ">
          {categories.map((item, index) => (
            <option value={item} key={index} className="text-gray-700">
              {item.replace(/-/g, " ")}
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
        <p className="hidden lg:inline">91 + 9305787990</p>
      </p>

    </div>
  )
}

export default HeaderNav2