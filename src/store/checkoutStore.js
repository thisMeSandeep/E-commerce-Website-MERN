import { create } from "zustand";

const useCheckoutStore = create((set) => ({
  checkoutType: localStorage.getItem("checkoutType") || null,
  order: JSON.parse(localStorage.getItem("orderData")) || [],

  // Set order details
  setOrder: (orderData) => {
    set({ order: orderData });
    localStorage.setItem("orderData", JSON.stringify(orderData));
  },

  // Set checkout type
  setCheckoutType: (type) => {
    set({ checkoutType: type });
    localStorage.setItem("checkoutType", type);
  },

  // Remove order data
  removeOrder: () => {
    set({ order: [] }); // Update state
    localStorage.removeItem("orderData");
  },
}));

export default useCheckoutStore;
