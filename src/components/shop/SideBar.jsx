import { useState } from "react"
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import categories from "../../data/categories"



const priceRanges = [
  { label: "All Prices", all: true },
  { label: "Under $20", min: 0, max: 20 },
  { label: "$25 to $100", min: 25, max: 100 },
  { label: "$100 to $300", min: 100, max: 300 },
  { label: "$300 to $500", min: 300, max: 500 },
  { label: "$500 to $1000", min: 500, max: 1000 },
  { label: "$1000 to $10000", min: 1000, max: 10000 }
];

const stylingOptions = {
  color: "#f97316",
  "& .MuiSlider-thumb": {
    backgroundColor: "#f97316",
  },
  "& .MuiSlider-track": {
    backgroundColor: "#f97316",
  },
  "& .MuiSlider-rail": {
    backgroundColor: "#ffedd5",
  },
}

const SideBar = () => {
  const [category, setCategory] = useState("all-category");
  const [value, setValue] = useState([10, 100]);
  const [selectedPrice, setSelectedPrice] = useState(priceRanges[0]);

  console.log("category:", category);
  console.log("value:", value);
  console.log("selectedPrice:", selectedPrice)

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  // handle price range
  const handlePriceRange = (index) => {
    setSelectedPrice(priceRanges[index]);
  }


  return (
    <div className="w-[300px] hidden lg:block h-screen pb-4">
      <h1 className="text-gray-900 font-medium">CATEGORIES</h1>

      {/* categories */}
      <ul className="space-y-2 border-b py-4">
        {
          categories.map((item, index) => (
            <span key={index} className="flex items-center gap-2">
              <div className={`size-4 rounded-full border  cursor-pointer flex items-center justify-center ${category === item ? "bg-orange-500 border-black/10" : "bg-white border-black/20"}`} onClick={() => setCategory(item)}>
                <div className="size-2 rounded-full bg-white"></div>
              </div>
              <p className={`${category === item ? "text-gray-800" : "text-gray-600"}`}> {item.replace(/-/g, " ")}</p>
            </span>
          ))
        }
      </ul>

      {/* Price range */}
      <div className="flex flex-col items-start gap-2 my-10">
        <h1 className="text-gray-900 font-medium">Price Range</h1>
        <Box width={280}>
          <Slider
            getAriaLabel={() => "Price range"}
            value={value}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            min={10}
            max={1000}
            sx={stylingOptions}
          />
        </Box>
      </div>
      {/* price description */}
      <div className="space-y-2 border-b pb-4">
        {
          priceRanges.map((price, index) => (
            <span key={index} className="flex items-center gap-2">
              <div className={`size-4 rounded-full border-2  cursor-pointer ${selectedPrice === priceRanges[index] ? "border-orange-500" : "border-black/20"}`} onClick={() => handlePriceRange(index)} ></div>
              <p className="text-gray-600">{price.label}</p>
            </span>
          ))
        }
      </div>

    </div>
  )
}

export default SideBar