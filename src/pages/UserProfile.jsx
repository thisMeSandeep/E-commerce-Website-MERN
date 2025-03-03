
import { NavLink, Outlet } from "react-router-dom";
import BreadCrumbs from "../components/commonComponents/BreadCrumbs";
import {  HomeIcon, User } from "lucide-react";


const UserProfile = () => {



  return (
    <div className="mt-[120px]">
      <BreadCrumbs />
      <h1 className="text-gray-600  text-xl font-semibold  py-2 px-6 sm:px-20 lg:px-32  border-b">ACCOUNT SETTING</h1>
      <div className="container mt-10">
        {/* nested links */}
        <div className="flex items-start gap-2">
          <ul className="flex flex-col gap-5">
            <NavLink
              to="/profile"
              end
              className={({ isActive }) =>
                `py-1.5 px-2 rounded-sm flex items-center gap-2 text-gray-600 font-semibold border ${isActive ? "border-r-orange-500 border-r-4 " : ""
                }`
              }
            >
              <User className="text-orange-500" />
              <span className="hidden md:inline">Profile</span>
            </NavLink>

            <NavLink
              to="address"
              end
              className={({ isActive }) =>
                `py-1.5 px-2 rounded-sm flex items-center gap-2 text-gray-600 font-semibold border ${isActive ? "border-r-orange-500 border-r-4 " : ""
                }`
              }
            >
              <HomeIcon className="text-orange-500" />
              <span className="hidden md:inline">Manage Address</span>
            </NavLink>



          </ul>
          <div className="flex-1  shadow-sm px-2">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;