import Address from "../components/commonComponents/Address";
import Avatar from "../components/commonComponents/Avatar";
import BreadCrumbs from "../components/commonComponents/BreadCrumbs";

const UserProfile = () => {



  return (
    <div className="mt-[120px]">
      <BreadCrumbs />
      <div className="container mt-10">
        <h1 className="text-gray-600  text-xl font-semibold mb-10">ACCOUNT SETTING</h1>
        <Avatar />
        <Address />
      </div>
    </div>
  );
};

export default UserProfile;