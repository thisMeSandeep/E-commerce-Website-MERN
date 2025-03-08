import { Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Navbar from "./components/commonComponents/Navbar"
// import Footer from "./components/commonComponents/Footer.jsx"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import ProductDetailPage from "./pages/ProductDetailPage"
import ShopPage from "./pages/ShopPage"
import ContactPage from "./pages/ContactPage"
import UserProfile from "./pages/UserProfile"
import MyOrdersPage from "./pages/MyOrdersPage"
import ShoppingCart from "./pages/ShoppingCart.jsx"
import useUserStore from "./store/userStore"
import { useEffect } from "react"
import WishListPage from "./pages/WishListPage.jsx"
import ScrollToTop from "./utils/ScrollToTop.jsx"
import ErrorPage from "./pages/ErrorPage.jsx"
import Avatar from "./components/commonComponents/Avatar.jsx"
import Address from "./components/address/Address.jsx"
import CheckoutPage from "./pages/CheckoutPage.jsx"
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage.jsx"





const App = () => {

  const getUserData = useUserStore((state) => state.getUserData);

  useEffect(() => {
    getUserData();
  }, [])

  return (
    <>
      <Toaster />
      <Navbar />
      <ScrollToTop />
      <div className="mt-[120px] md:mt-[140px]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="products" element={<ShopPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/product-details/:pid" element={<ProductDetailPage />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/wishlist" element={<WishListPage />} />
          <Route path="/profile" element={<UserProfile />}>
            <Route index element={<Avatar />} />
            <Route path="address" element={<Address />} />
          </Route>
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<MyOrdersPage />} />
          <Route path="/checkout-success" element={<CheckoutSuccessPage />} />
        </Routes >
      </div>
      {/* <Footer /> */}
    </>
  )
}

export default App