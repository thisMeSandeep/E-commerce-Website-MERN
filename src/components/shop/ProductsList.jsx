import { Search, Loader } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import useProductStore from "../../store/productStore";
import ProductCard from "../commonComponents/ProductCard";

const options = [
  { value: "asc", label: "Lowest Price" },
  { value: "desc", label: "Highest Price" },
];

const ProductsList = () => {
  const getProducts = useProductStore((state) => state.getProducts);
  const products = useProductStore((state) => state.products) || [];
  const category = useProductStore((state) => state.category);
  const minPrice = useProductStore((state) => state.minPrice);
  const maxPrice = useProductStore((state) => state.maxPrice);
  const sort = useProductStore((state) => state.sort);
  const setSort = useProductStore((state) => state.setSort);
  const setSearch = useProductStore((state) => state.setSearch);
  const page = useProductStore((state) => state.page);
  const totalPages = useProductStore((state) => state.totalPages);
  const currentPage = useProductStore((state) => state.currentPage);
  const setPage = useProductStore((state) => state.setPage);

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch products with debounced effect
  const fetchProducts = useCallback(() => {
    setLoading(true);
    getProducts().finally(() => setLoading(false));
  }, [getProducts]);

  // Sync search term to store and fetch products
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      setSearch(searchTerm || null); // Clear search if empty
      fetchProducts();
    }, 300);
    return () => clearTimeout(delaySearch);
  }, [searchTerm, setSearch, fetchProducts]);

  // Fetch products when other filters change
  useEffect(() => {
    fetchProducts();
  }, [category, minPrice, maxPrice, sort, page, fetchProducts]);

  // Handle sort change
  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="flex-1">
      {/* Upper search boxes */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        {/* Search Input */}
        <div className="relative border rounded-sm py-0.5 px-0.5 w-full sm:w-1/2">
          <input
            placeholder="Search for anything"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-2 pr-8 py-1 outline-none text-gray-500 w-full"
          />
          <Search className="absolute top-1/2 right-2 -translate-y-1/2 size-4 text-gray-500" />
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-5 text-gray-700 text-sm font-medium">
          <p className="hidden sm:block">Sort by:</p>
          <select
            className="w-48 px-5 py-2 border border-black/20 rounded-sm bg-white outline-none cursor-pointer"
            value={sort}
            onChange={handleSortChange}
          >
            {options.map((item) => (
              <option value={item.value} key={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* List products */}
      {loading ? (
        <div className="h-[500px] flex items-center justify-center">
          <Loader className="text-gray-600 size-10" />
        </div>
      ) : products.length === 0 ? (
        <div className="h-[500px] flex items-center justify-center">
          <p className="text-gray-500 text-lg">No products found!</p>
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 place-items-center max-h-[1000px] overflow-y-scroll no-scrollbar">
          {products.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && !loading && products.length > 0 && (
        <div className="my-5 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-3 py-1 rounded border ${
                currentPage === pageNum ? "bg-orange-500 text-white" : "bg-white"
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsList;