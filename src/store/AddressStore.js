import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

const useAddressStore = create((set, get) => ({
  addresses: [],
  selectedAddress:
    JSON.parse(localStorage.getItem("previouslySelectedAddress")) || null,

  // function to fetch addresses 
  fetchAddresses: async () => {
    try {
      const { data } = await axiosInstance.get("/api/user/get-address");
      if (data.success) {
        set({ addresses: data.addresses });
        // Restore previously selected address 
        const previousSelected = JSON.parse(
          localStorage.getItem("previouslySelectedAddress")
        );
        const validSelectedAddress =
          data.addresses.find((addr) => addr._id === previousSelected?._id) ||
          data.addresses[0] ||
          null;

        set({ selectedAddress: validSelectedAddress });
        // save to localStorage
        localStorage.setItem(
          "previouslySelectedAddress",
          JSON.stringify(validSelectedAddress)
        );
      }
    } catch (err) {
      console.error("Error fetching addresses:", err.message);
    }
  },

  //function to add new address and refetch address list
  addAddress: async (address) => {
    try {
      const { data } = await axiosInstance.post(
        "/api/user/add-address",
        address
      );
      if (data.success) {
        toast.success(data.message);
        await get().fetchAddresses();
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  },

  // function to delete address and refetch
  deleteAddress: async (id) => {
    try {
      const { data } = await axiosInstance.delete(
        `/api/user/delete-address/${id}`
      );
      if (data.success) {
        toast.success(data.message);
        await get().fetchAddresses();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete address");
      console.error("Error deleting address:", error);
    }
  },

  // Change selected address and update localStorage
  selectAddress: (id) => {
    set((state) => {
      const newSelected =
        state.addresses.find((addr) => addr._id === id) || null;
      localStorage.setItem(
        "previouslySelectedAddress",
        JSON.stringify(newSelected)
      );
      return { selectedAddress: newSelected };
    });
  },
}));

export default useAddressStore;
