import { createContext, useState, useContext } from "react";

const CategoryContext = createContext();

export const CategoryContextProvider = ({ children }) => {
    const [currentCategory, setCurrentCategory] = useState("all");

    const value = {
        currentCategory,
        setCurrentCategory
    }

    return (
        <CategoryContext.Provider value={value}>
            {children}
        </CategoryContext.Provider>
    );
};

// Custom hook for easier usage
export const useCategoryContext = () => {
    const context = useContext(CategoryContext);
    if (!context) {
        console.log("error in category context")
    }
    return context;
};

export default CategoryContext;
