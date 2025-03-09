import { FaFacebookF, FaInstagram, FaXTwitter, FaGithub, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-12 mt-10">
      <div className="max-w-6xl mx-auto px-5">
        {/* Top Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="mb-6">
            <span className="text-2xl font-bold">
              <span className="text-orange-500">D</span>ropCart
            </span>
          </div>
          <p className="mb-6 max-w-md">
            Discover quality products with seamless shopping and reliable service.
          </p>
          {/* Social Icons */}
          <div className="flex space-x-4">
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500">
              <FaFacebookF className="text-xl transition-colors" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500">
              <FaInstagram className="text-xl transition-colors" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500">
              <FaXTwitter className="text-xl transition-colors" />
            </a>
            <a href="https://github.com/thisMeSandeep" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500">
              <FaGithub className="text-xl transition-colors" />
            </a>
            <a href="https://www.linkedin.com/in/sandeep-singh-85a533264" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500">
              <FaLinkedin className="text-xl transition-colors" />
            </a>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10">
          <div>
            <h3 className="font-semibold text-lg">Shop</h3>
            <ul className="mt-3 space-y-2">
              <li><a href="#" className="hover:text-orange-500">New Arrivals</a></li>
              <li><a href="#" className="hover:text-orange-500">Best Sellers</a></li>
              <li><a href="#" className="hover:text-orange-500">Categories</a></li>
              <li><a href="#" className="hover:text-orange-500">Discounts</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Customer Service</h3>
            <ul className="mt-3 space-y-2">
              <li><a href="#" className="hover:text-orange-500">Contact Us</a></li>
              <li><a href="#" className="hover:text-orange-500">Shipping & Delivery</a></li>
              <li><a href="#" className="hover:text-orange-500">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-orange-500">FAQs</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Company</h3>
            <ul className="mt-3 space-y-2">
              <li><a href="#" className="hover:text-orange-500">About Us</a></li>
              <li><a href="#" className="hover:text-orange-500">Careers</a></li>
              <li><a href="#" className="hover:text-orange-500">Press</a></li>
              <li><a href="#" className="hover:text-orange-500">Blog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Legal</h3>
            <ul className="mt-3 space-y-2">
              <li><a href="#" className="hover:text-orange-500">Terms of Service</a></li>
              <li><a href="#" className="hover:text-orange-500">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-orange-500">Cookies Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-10 text-sm text-gray-600">
          &copy; {new Date().getFullYear()} DropCart. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
