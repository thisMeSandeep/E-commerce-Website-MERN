import { createContext, useContext } from "react";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    // Function to add items to wishlist
    const addItemToWishlist = async (itemData) => {

            

        try {
            const { data } = await axiosInstance.post("/api/wishlist/add-Items", itemData);
            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            if (err.response?.data?.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error(err.message);
            }
        }
    };

    const value = {
        addItemToWishlist,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    return context;
};

export default AppContext;
