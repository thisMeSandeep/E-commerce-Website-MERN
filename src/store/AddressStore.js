import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

const useAddressStore = create((set, get) => ({
  addresses: [],
  selectedAddress: null,

  //function Fetch addresses 
  fetchAddresses: async () => {
    try {
      const { data } = await axiosInstance.get("/api/user/get-address");
      if (data.success) {
        set({ addresses: data.addresses });
      }
    } catch (err) {
      console.error("Error fetching addresses:", err.message);
    }
  },

  //function to add a new address
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

  //function to update an address
  updateAddress: async (updatedFields) => {
    try {
      const { data } = await axiosInstance.put(
        "/api/user/update-address",
        updatedFields
      );
      if (data.success) {
        toast.success(data.message);
        await get().fetchAddresses(); 
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  },

  //function to  delete an address
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

  // Select an address for checkout
  selectAddress: (id) => {
    set((state) => ({
      selectedAddress: state.addresses.find((addr) => addr._id === id) || null,
    }));
  },
}));

export default useAddressStore;
