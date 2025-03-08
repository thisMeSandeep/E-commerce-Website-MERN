
import { NavLink, Outlet } from "react-router-dom";
import BreadCrumbs from "../components/commonComponents/BreadCrumbs";
import { HomeIcon, User } from "lucide-react";


const UserProfile = () => {



  return (
    <div >
      <BreadCrumbs />
      <h1 className="text-gray-600  text-xl font-semibold  py-4 md:py-5 px-6 sm:px-20 lg:px-32  border-b">ACCOUNT SETTING</h1>


      <div className="container mt-8">


        <div className="flex flex-col  items-start gap-2">

          {/* nested links */}
          <ul className="flex items-center gap-5 ">
            <NavLink
              to="/profile"
              end
              className={({ isActive }) =>
                `py-1.5 px-2 rounded-sm flex items-center gap-2 text-gray-600 font-medium border ${isActive ? "border-b-orange-500 border-b-4 " : ""
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
                `py-1.5 px-2 rounded-sm flex items-center gap-2 text-gray-600 font-medium border ${isActive ? "border-b-orange-500 border-b-4 " : ""
                }`
              }
            >
              <HomeIcon className="text-orange-500" />
              <span className="hidden md:inline">Manage Address</span>
            </NavLink>



          </ul>

          <div className="flex-1 w-full  px-2">
            <Outlet />
          </div>


        </div>
      </div>
    </div>
  );
};

export default UserProfile;