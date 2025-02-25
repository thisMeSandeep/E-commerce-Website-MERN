import { create } from "zustand";

const useUserStore = create((set) => ({
  user: false,
}));

export default useUserStore;
