// store/productStore.js (from earlier setup, updated for clarity)
import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";

const useProductStore = create((set) => ({
  products: [],
  category: null,
  minPrice: null,
  maxPrice: null,
  sort: "asc",
  search: null, // Ensure this is included
  page: 1,
  totalPages: 1,
  currentPage: 1,

  getProducts: async () => {
    try {
      const { category, minPrice, maxPrice, sort, search, page } = useProductStore.getState();

      const params = new URLSearchParams();
      if (category) params.append("category", category);
      if (minPrice !== null) params.append("minPrice", minPrice);
      if (maxPrice !== null) params.append("maxPrice", maxPrice);
      params.append("sort", sort);
      if (search) params.append("search", search); // Ensure search is included
      params.append("page", page);

      const { data } = await axiosInstance.get(`/api/products/get-products?${params.toString()}`);
      if (data.success) {
        set({
          products: data.data,
          totalPages: data.totalPages || 1,
          currentPage: data.currentPage || 1,
        });
      }
    } catch (err) {
      console.error("Error fetching products:", err.message);
    }
  },

  setCategory: (category) => set({ category, page: 1 }),
  setMinPrice: (minPrice) => set({ minPrice, page: 1 }),
  setMaxPrice: (maxPrice) => set({ maxPrice, page: 1 }),
  setSort: (sort) => set({ sort, page: 1 }),
  setSearch: (search) => set({ search, page: 1 }), // Ensure page resets on search
  setPage: (page) => set({ page }),
}));

export default useProductStore;