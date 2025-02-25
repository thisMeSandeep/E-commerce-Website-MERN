// import Search from "./Search"
import { assets } from "../../assets/assets"
import { Link } from "react-router-dom"
import { LogOut, Menu, Settings, ShoppingBag, ShoppingCart, X } from "lucide-react"
import { useState } from "react"
import HeaderNav2 from "./HeaderNav2"
import useUserStore from "../../store/userStore"
import { useStore } from "zustand"

const navItems = [
  {
    path: "/",
    name: "Home"
  },
  {
    path: "/products",
    name: "Shop"
  },
  {
    path: "/about",
    name: "About Us"
  },
  {
    path: "/contact",
    name: "Contact"
  }
]


const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const { user } = useStore(useUserStore);

  return (
    <header className="text-gray-700 fixed top-0 left-0 right-0  bg-white z-30">

      <nav className="py-4 md:py-5 container border-b border-gray-300 flex items-center justify-between gap-3 md:gap-5 lg:gap-8 relative">

        {/* logo */}
        <Link to="/"> <img src={assets.logo} alt="logo" className="w-28 md:w-32" /></Link>


        {/* Navlinks desktop */}
        <ul className="hidden lg:flex items-center gap-4 lg:gap-8">
          {
            navItems.map((nav) => (
              <Link to={nav.path} key={nav.name} className="text-gray-600 hover:text-gray-900">{nav.name}</Link>
            ))
          }
        </ul>

        {/* Navlinks mobile*/}
        {toggleMenu ? <X className="lg:hidden ml-auto cursor-pointer" onClick={() => setToggleMenu(prev => !prev)} /> : <Menu className="lg:hidden ml-auto cursor-pointer" onClick={() => setToggleMenu(prev => !prev)} />}

        <ul className={`absolute  ${toggleMenu ? "flex" : "hidden"} flex-col items-center justify-center gap-4 lg:gap-8  top-14 sm:top-14 right-0 left-0 border w-full h-screen bg-white z-20`}>
          {
            navItems.map((nav) => (
              <Link to={nav.path} key={nav.name} className="text-gray-600 hover:text-gray-900" onClick={() => setToggleMenu(false)}>{nav.name}</Link>
            ))
          }
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
      <HeaderNav2 />
    </header>
  )
}

export default Navbar 