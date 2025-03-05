import { create } from "zustand";

const useCheckoutStore = create((set) => ({
  checkoutType: localStorage.getItem("checkoutType") || null, 
  singleProduct:JSON.parse(localStorage.getItem("checkoutProductDetails")) || null,
  cartItems: JSON.parse(localStorage.getItem("checkoutCartItems")) || [],

  // Handle single product checkout
  setSingleProduct: (product) => {
    set({
      checkoutType: "single",
      singleProduct: product,
      cartItems: [],
    });
    localStorage.setItem("checkoutProductDetails", JSON.stringify(product));
    localStorage.setItem("checkoutType", "single");
    localStorage.removeItem("checkoutCartItems");
  },

  // Handle cart checkout
  setCartCheckout: (cartProducts) => {
    set({
      checkoutType: "cart",
      singleProduct: null,
      cartItems: cartProducts,
    });
    localStorage.setItem("checkoutCartItems", JSON.stringify(cartProducts));
    localStorage.setItem("checkoutType", "cart");
    localStorage.removeItem("checkoutProductDetails");
  },

  // Clear checkout state after order completion
  clearCheckout: () => {
    set({ checkoutType: null, singleProduct: null, cartItems: [] });
    localStorage.removeItem("checkoutProductDetails");
    localStorage.removeItem("checkoutCartItems");
    localStorage.removeItem("checkoutType");
  },
}));

export default useCheckoutStore;
