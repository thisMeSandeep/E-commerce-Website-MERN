import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-orange-500 text-white py-8 mt-8">
      <div className="container text-center ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center sm:text-left">
          {/* Company Info */}
          <div>
            <h2 className="text-xl font-semibold">Your E-Commerce</h2>
            <p className="mt-2 text-sm">Bringing you the best products at the best prices.</p>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex flex-col gap-2 items-center sm:items-start">
            <Link to="/about" className="hover:underline">About Us</Link>
            <Link to="/contact" className="hover:underline">Contact</Link>
            <Link to="/products" className="hover:underline">Products</Link>
            <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
          </nav>
          
          {/* Social Media */}
          <div className="flex justify-center sm:justify-end gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200">
              <FaFacebook size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200">
              <FaTwitter size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
        
        {/* Copyright */}
        <p className="mt-6 text-sm">&copy; {new Date().getFullYear()} Your E-Commerce. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
