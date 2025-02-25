import { Search } from "lucide-react"
import useProductStore from "../../store/productStore";
import { useStore } from "zustand";
import ProductCard from "../commonComponents/ProductCard";

const options = [
  { value: "max", label: "Most popular" },
  { value: "low", label: "Lowest Price" },
  { value: "high", label: "Highest Price" },
];

const ProductsList = () => {

  const { products } = useStore(useProductStore);

  return (
    <div className="flex-1">

      {/* upper search boxes */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        {/* first search box */}
        <div className="relative border rounded-sm py-0.5 px-0.5 w-full sm:w-1/2">
          <input placeholder="Search for anything" type="text" className=" px-2 pr-8 py-1 outline-none focus:outline-none text-gray-500 w-full" />
          <Search className="absolute top-[50%] right-2 -translate-y-[50%] size-4 text-gray-500" />
        </div>

        {/* second search box */}
        <div className="flex   items-center gap-5 text-gray-700 text-sm font-medium">
          <p className="hidden sm:block">Sort by:</p>
          <select className="w-48 px-5 py-2 border border-black/20 rounded-sm bg-white outline-none cursor-pointer">
            {options.map((item) => (
              <option value={item.value} key={item.value}>
                {item.label}
              </option>
            ))}
          </select>

        </div>
      </div>


      {/* products list */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-5 place-items-center max-h-[1000px] overflow-y-scroll  no-scrollbar">
        {
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        }
      </div>

    </div>
  )
}

export default ProductsList