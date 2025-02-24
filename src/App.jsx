import { Routes, Route } from "react-router-dom"
import Navbar from "./components/commonComponents/Navbar"
import Footer from "./components/commonComponents/Footer"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import ProductDetailPage from "./pages/ProductDetailPage"
import ShoppingCard from "./pages/ShoppingCard"
import ShopPage from "./pages/ShopPage"
import ContactPage from "./pages/ContactPage"
import UserProfile from "./pages/UserProfile"



const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="products" element={<ShopPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/product-details:pid" element={<ProductDetailPage />} />
        <Route path="/cart" element={<ShoppingCard />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes >

      <Footer />
    </>
  )
}

export default App