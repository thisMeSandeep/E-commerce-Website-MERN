import { create } from "zustand";

const useCheckoutStore = create((set) => ({
  checkoutType: null,
  productDetails:
    JSON.parse(localStorage.getItem("checkoutProductDetails")) || null,

  setSingleProduct: (product) => {
    set({ checkoutType: "single", productDetails: product, cartItems: [] }),
      localStorage.setItem("checkoutProductDetails", JSON.stringify(product));
  },
  clearCheckout: () => {
    set({ checkoutType: null, product: null, cartItems: [] }),
      localStorage.removeItem("checkoutProductDetails");
  },
}));

export default useCheckoutStore;
