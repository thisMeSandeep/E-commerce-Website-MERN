import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, LogOut, Menu, Settings, ShoppingBag, ShoppingCart, X } from "lucide-react";
import useUserStore from "../../store/userStore";
import { assets } from "../../assets/assets";
import HeaderNav2 from "./HeaderNav2";

const navItems = [
  { path: "/", name: "Home" },
  { path: "/products", name: "Shop" },
  { path: "/about", name: "About Us" },
  { path: "/contact", name: "Contact" },
];

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const user = useUserStore((state) => state.user);
  const logoutUser = useUserStore((state) => state.logoutUser);
  const navigate = useNavigate();


  // Handle Logout
  const handleLogout = async () => {
    try {
      await logoutUser();
      setShowDropdown(false);
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <header className="text-gray-700 fixed top-0 left-0 right-0 bg-white z-30">
      <nav className="py-4 md:py-5 container border-b border-gray-300 flex items-center justify-between gap-3 md:gap-5 lg:gap-8 relative">

        {/* Logo */}
        <Link to="/">
          <img src={assets.logo} alt="logo" className="w-28 md:w-32" />
        </Link>

        {/* Desktop Navlinks */}
        <ul className="hidden lg:flex items-center gap-4 lg:gap-8">
          {navItems.map((nav) => (
            <Link key={nav.name} to={nav.path} className="text-gray-600 hover:text-gray-900">
              {nav.name}
            </Link>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        {toggleMenu ? (
          <X className="lg:hidden ml-auto cursor-pointer" onClick={() => setToggleMenu(false)} />
        ) : (
          <Menu className="lg:hidden ml-auto cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}

        {/* Mobile Menu */}
        <ul
          className={`fixed top-16 right-2 w-full h-screen bg-white flex flex-col items-center justify-center gap-6 transition-transform duration-300 ${toggleMenu ? "translate-x-0" : "translate-x-full"
            } lg:hidden z-40`}
        >
          {navItems.map((nav) => (
            <Link
              key={nav.name}
              to={nav.path}
              className="text-gray-600 hover:text-gray-900"
              onClick={() => setToggleMenu(false)}
            >
              {nav.name}
            </Link>
          ))}
        </ul>

        {/* User Dropdown */}
        {user ? (
          <div className="relative cursor-pointer" onClick={() => setShowDropdown((prev) => !prev)}>
            <img
              src={assets.user_icon}
              alt="user icon"
              className="border-2 p-1 border-gray-400 rounded-full"
            />

            {/* Dropdown */}
            <div
              className={`border bg-white w-[300px] py-2 flex flex-col gap-2 rounded-md shadow-2xl absolute right-0 top-10 transition-opacity duration-200 ${showDropdown ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
            >
              {/* User Info */}
              <div className="flex items-center gap-5 border-b px-4 py-2">
                <img src={assets.user_icon} alt="user pic" className="size-5" />
                <p className="flex flex-col">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-sm text-gray-500">{user.email}</span>
                </p>
              </div>

              {/* Dropdown Links */}
              <ul className="flex flex-col text-gray-600 text-sm">
                <Link
                  to="/profile"
                  className="flex items-center gap-4  px-4 py-3 hover:text-gray-700 hover:bg-gray-200/50"
                >
                  <Settings className="size-4" />
                  Profile
                </Link>
                <Link
                  to="/cart"
                  className="flex items-center gap-4 border-t px-4 py-3 hover:text-gray-700 hover:bg-gray-200/50"
                >
                  <ShoppingCart className="size-4" />
                  Cart
                </Link>
                <Link
                  to="/wishlist"
                  className="flex items-center gap-4 border-t px-4 py-3 hover:text-gray-700 hover:bg-gray-200/50"
                >
                  <Heart className="size-4" />
                  Wishlist
                </Link>
                <Link
                  to="/orders"
                  className="flex items-center gap-4 border-t px-4 py-3 hover:text-gray-700 hover:bg-gray-200/50"
                >
                  <ShoppingBag className="size-4" />
                  My Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-4 border-t px-4 py-3 hover:text-gray-700 hover:bg-gray-200/50"
                >
                  <LogOut className="size-4" />
                  Log out
                </button>
              </ul>
            </div>
          </div>
        ) : (
          <Link to="/login" className="flex gap-2 items-center hover:text-gray-900">
            <img src={assets.user_icon} alt="user icon" />
            <span>Account</span>
          </Link>
        )}
      </nav>
      <HeaderNav2 />
    </header>
  );
};

export default Navbar;
