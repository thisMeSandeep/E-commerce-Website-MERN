import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

const useUserStore = create((set) => ({
  user: true,
  error: null,
  registerStatus: "idle",
  loginStatus: "idle",

  // function to register user
  registerUser: async (formData) => {
    try {
      set({ registerStatus: "loading" });
      const { data } = await axiosInstance.post("/api/user/register", formData);

      if (data.success) {
        set({ user: data.user, registerStatus: "success" });
        toast.success(data.message);
        return data.success;
      }
    } catch (err) {
      set({
        error: err.response?.data?.message || "Something went wrong",
        registerStatus: "error",
      });
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  },

  // function to login user
  loginUser: async (formData) => {
    try {
      set({ loginStatus: "loading", error: null });
      const { data } = await axiosInstance.post("/api/user/login", formData);

      if (data.success) {
        set({ user: data.user, loginStatus: "success" });
        toast.success(data.message);
        return data.success;
      }
    } catch (err) {
      set({
        error: err.response?.data?.message || "Something went wrong",
        loginStatus: "error",
      });
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  },

  // function to logout user
  logoutUser: async () => {
    try {
      const { data } = await axiosInstance.post("/api/user/logout", {});
      if (data.success) {
        set({ user: null, loginStatus: "idle" });
        toast.success(data.message);
      }
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  },

  //function to get user data
  getUserData: async () => {
    try {
      const { data } = await axiosInstance.get("/api/user/getUserData");
      if (data.success) {
        set({ user: data.user });
      }
    } catch (err) {
      console.log(err.message);
    }
  },
}));

export default useUserStore;
