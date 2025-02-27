import { Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Navbar from "./components/commonComponents/Navbar"
// import Footer from "./components/commonComponents/Footer"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import ProductDetailPage from "./pages/ProductDetailPage"
import ShoppingCard from "./pages/ShoppingCard"
import ShopPage from "./pages/ShopPage"
import ContactPage from "./pages/ContactPage"
import UserProfile from "./pages/UserProfile"
import MyOrdersPage from "./pages/MyOrdersPage"




const App = () => {
  return (
    <>
      <Toaster />
      <Navbar />


      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="products" element={<ShopPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/product-details/:pid" element={<ProductDetailPage />} />
        <Route path="/cart" element={<ShoppingCard />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/orders" element={<MyOrdersPage />} />
      </Routes >

      {/* <Footer /> */}
    </>
  )
}

export default App