// components/SideBar.js
import { useEffect, useState, useCallback } from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import categories from "../../data/categories"
import useProductStore from "../../store/productStore";
import { useCategoryContext } from "../../contexts/CategoryContext";

const priceRanges = [
  { label: "All Prices", all: true },
  { label: "Under $20", min: 0, max: 20 },
  { label: "$25 to $100", min: 25, max: 100 },
  { label: "$100 to $300", min: 100, max: 300 },
  { label: "$300 to $500", min: 300, max: 500 },
  { label: "$500 to $1000", min: 500, max: 1000 },
  { label: "$1000+", min: 1000, max: null },
];

// slider styling
const stylingOptions = {
  color: "#f97316",
  "& .MuiSlider-thumb": { backgroundColor: "#f97316" },
  "& .MuiSlider-track": { backgroundColor: "#f97316" },
  "& .MuiSlider-rail": { backgroundColor: "#ffedd5" },
};

const SideBar = () => {

  const [priceValue, setPriceValue] = useState([0, 1000]);
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const { currentCategory, setCurrentCategory } = useCategoryContext();

  const setCategory = useProductStore((state) => state.setCategory);
  const setMinPrice = useProductStore((state) => state.setMinPrice);
  const setMaxPrice = useProductStore((state) => state.setMaxPrice);
  const getProducts = useProductStore((state) => state.getProducts);

  // Debounce for slider 
  const debouncedGetProducts = useCallback(
    () => {
      const timer = setTimeout(() => getProducts(), 300);
      return () => clearTimeout(timer);
    },
    [getProducts]
  );

  // Sync category to store
  useEffect(() => {
    setCategory(currentCategory);
    getProducts();
  }, [currentCategory, setCategory, getProducts]);

  // Sync price filters to store
  useEffect(() => {
    if (selectedPriceRange.all) {
      setMinPrice(null);
      setMaxPrice(null);
    } else {
      const min = selectedPriceRange.min !== undefined ? selectedPriceRange.min : priceValue[0];
      const max = selectedPriceRange.max !== undefined ? selectedPriceRange.max : priceValue[1];
      setMinPrice(min);
      setMaxPrice(max);
    }
    debouncedGetProducts();
  }, [selectedPriceRange, priceValue, setMinPrice, setMaxPrice, debouncedGetProducts]);

  const handleSliderChange = useCallback((event, newValue) => {
    setPriceValue(newValue);
    if (!selectedPriceRange.all) setSelectedPriceRange(priceRanges[0]);
  }, [selectedPriceRange]);

  const handlePriceRange = useCallback((range) => {
    setSelectedPriceRange(range);
    if (!range.all && range.max) setPriceValue([range.min, range.max]);
  }, []);

  return (
    <div className=" hidden lg:block  pb-4">
      <h1 className="text-gray-900 font-medium">CATEGORIES</h1>
      <ul className="space-y-2 border-b py-4">
        <li className="flex items-center gap-2">
          <div
            className={`size-4 rounded-full border cursor-pointer flex items-center justify-center ${currentCategory === "all" ? "bg-orange-500" : "bg-white border-black/20"
              }`}
            onClick={() => setCurrentCategory("all")}
          >
            <div className="size-2 rounded-full bg-white" />
          </div>
          <p className={currentCategory === "all" ? "text-gray-800" : "text-gray-600"}>All</p>
        </li>
        {categories.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <div
              className={`size-4 rounded-full border cursor-pointer flex items-center justify-center ${currentCategory === item ? "bg-orange-500" : "bg-white border-black/20"
                }`}
              onClick={() => setCurrentCategory(item)}
            >
              <div className="size-2 rounded-full bg-white" />
            </div>
            <p className={`capitalize ${currentCategory === item ? "text-gray-800" : "text-gray-600"}`}>
              {item.replace("-", " ")}
            </p>
          </li>
        ))}
      </ul>

      <div className="my-10">
        <h1 className="text-gray-900 font-medium">PRICE RANGE</h1>
        <Box width={280}>
          <Slider
            value={priceValue}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
            sx={stylingOptions}
          />
        </Box>
      </div>

      <div className="space-y-2 border-b pb-4">
        {priceRanges.map((price) => (
          <div key={price.label} className="flex items-center gap-2">
            <div
              className={`size-4 rounded-full border-2 cursor-pointer ${selectedPriceRange === price ? "border-orange-500" : "border-black/20"
                }`}
              onClick={() => handlePriceRange(price)}
            />
            <p className="text-gray-600">{price.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;