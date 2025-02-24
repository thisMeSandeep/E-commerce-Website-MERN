import Search from "./Search"
import { assets, CartIcon } from "../../assets/assets"
import { Link } from "react-router-dom"
import { LogIn, LogOut, Settings, ShoppingBag, ShoppingCart } from "lucide-react"
import { useState } from "react"

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const user = false;

  return (
    <header className="py-4 md:py-5 border-b border-gray-300 text-gray-700 fixe top-0  z-10">
      <nav className="container flex items-center justify-between gap-3 md:gap-5 lg:gap-8">
        {/* logo */}
        <Link to="/"> <img src={assets.logo} alt="logo" className="w-28 md:w-32" /></Link>

        {/* search bar */}
        <Search />

        {/* Navlinks */}
        <ul className="hidden lg:flex items-center gap-4 lg:gap-8">
          <Link to="/" className="hover:text-gray-900 transition">Home</Link>
          <Link to="/products" className="hover:text-gray-900 transition">Shop</Link>
          <Link to="about" className="hover:text-gray-900 transition">About Us</Link>
          <Link to="contact" className="hover:text-gray-900 transition">Contact</Link>
        </ul>


        {/* login/profile */}

        {
          user ? (
            <div className="relative cursor-pointer" onClick={() => setShowDropdown(prev => !prev)} >
              <img src={assets.user_icon} alt="user icon" className="border-2 p-1 border-gray-400 rounded-full " />
              {/* dropdown */}
              <div className="border bg-white z-50 w-[300px] py-2 flex flex-col gap-2 rounded-md shadow-2xl absolute right-0 top-8" style={{ display: showDropdown ? "block" : "none" }}>
                {/* user info */}
                <div className="flex items-center gap-5 border-b px-4 py-2">
                  <img src={assets.user_icon} alt="user pic" />
                  <p className="flex flex-col ">
                    <span>Sandeep Singh</span>
                    <span className="text-sm">snayal50@gmail.com</span>
                  </p>
                </div>
                <ul className="flex flex-col   text-gray-600">
                  <Link to="profile" className="flex items-center gap-4 border-t px-4 py-3 hover:text-gray-700 -md  hover:bg-gray-200/50"><Settings className="size-5" />Profile</Link>
                  <Link to="cart" className="flex items-center gap-4 border-t px-4 py-3 hover:text-gray-700 -md hover:bg-gray-200/50"><ShoppingCart className="size-5" />Cart</Link>
                  <Link to="orders" className="flex items-center gap-4 border-t px-4 py-3 hover:text-gray-700 -md hover:bg-gray-200/50"><ShoppingBag className="size-5" /> My Orders</Link>
                  <button className="flex items-center gap-4 border-t px-4 py-3 hover:text-gray-700 -md hover:bg-gray-200/50"><LogOut className="size-5" />Log out</button>
                </ul>
              </div>
            </div>
          ) : (
            <Link to="/login" className="flex gap-2 items-center hover:text-gray-900">
              <img src={assets.user_icon} alt="" />
              <span>Account</span>
            </Link>
          )
        }

      </nav>
    </header>
  )
}

export default Navbar 