import { create } from "zustand";
import products from "../data/productData";

const useProductStore = create((set, get) => ({
  products,
  selectedCategory: "all-category",
  priceRange: null,

  // Function to update selected category
  setCategory: (category) => set({ selectedCategory: category }),

  // Function to update price range
  setPriceRange: (range) => set({ priceRange: range }),
}));

export default useProductStore;
