import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";

const useProductStore = create((set, get) => ({
  products: [],
  category: null,
  minPrice: null,
  maxPrice: null,
  sort: "asc",
  search: null,
  page: 1,
  totalPages: 1,
  currentPage: 1,

  // Function to get products
  getProducts: async () => {
    try {
      let { category, minPrice, maxPrice, sort, page, search } = get();

      if (category === "all") {
        set({ category: null });
        category = null;
      }

      // query parameters
      const params = new URLSearchParams();
      if (category) params.append("category", category);
      if (minPrice) params.append("minPrice", minPrice);
      if (maxPrice) params.append("maxPrice", maxPrice);
      if (sort) params.append("sort", sort);
      if (page) params.append("page", page);
      if (search) params.append("search", search);

      const { data } = await axiosInstance.get(
        `/api/products/get-products?${params.toString()}`
      );

      if (data.success) {
        set({
          products: data.data,
          totalPages: data.totalPages || 1,
          currentPage: data.currentPage || 1,
        });
      }
    } catch (err) {
      console.log("Problem fetching products:", err.message);
    }
  },

  // Function to update filters
  setCategory: (category) => set({ category }),
  setMinPrice: (minPrice) => set({ minPrice }),
  setMaxPrice: (maxPrice) => set({ maxPrice }),
  setSort: (sort) => set({ sort }),
  setSearch: (search) => set({ search }),
  setPage: (page) => set({ page }),
}));

export default useProductStore;
