import { useState } from "react";
import BreadCrumbs from "../components/commonComponents/BreadCrumbs";
import useAddressStore from "../store/AddressStore";
import useUserStore from "../store/userStore";
import { Link } from "react-router-dom";
import cashImage from "../assets/cash.png";
import dollarImage from "../assets/dollar.png";
import PlaceSingleOrderCard from "../components/commonComponents/PlaceSingleOrderCard";
import useCheckoutStore from "../store/checkoutStore";
import PlaceCartItemsOrderCard from "../components/commonComponents/PlaceCartItemsOrderCard";
import addressImg from "../assets/address.png"
import { CircleHelp } from "lucide-react";

const paymentOptions = [
  {
    id: 1,
    type: "COD",
    icon: cashImage,
  },
  {
    id: 2,
    type: "Online Payment",
    icon: dollarImage,
  },
];

const CheckoutPage = () => {
  const [paymentType, setPaymentType] = useState("Online Payment");
  const selectedAddress = useAddressStore((state) => state.selectedAddress);
  const user = useUserStore((state) => state.user);
  const checkoutType = useCheckoutStore((state) => state.checkoutType);
  const [showModel, setShowModel] = useState(false)

  console.log(checkoutType);

  return (
    <div className="md:mt-[120px]">
      <BreadCrumbs />
      <div className="container my-10 flex flex-col lg:flex-row items-start justify-center gap-5">
        {!selectedAddress ? (
          <div className="flex flex-col gap-8 items-center justify-center">
            <img src={addressImg} alt="address" className="w-[200px]" />
            <Link to="/profile/address" className="border border-orange-500 px-10 py-2 rounded-sm text-orange-500 font-medium ">Choose an address to deliver</Link>
          </div>
        ) : (
          <div className="w-full">
            {/* Billing Information */}
            <div>
              <h1 className="text-gray-700 text-xl font-medium">Billing Information</h1>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <p className="text-sm text-gray-600">User name</p>
                  <p className="mt-1 text-gray-700 border px-2 py-1 rounded-sm">{user?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="mt-1 text-gray-700 border px-2 py-1 rounded-sm">{selectedAddress?.fullAddress}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Country</p>
                  <p className="mt-1 text-gray-700 border px-2 py-1 rounded-sm">{selectedAddress?.country}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">State</p>
                  <p className="mt-1 text-gray-700 border px-2 py-1 rounded-sm">{selectedAddress?.state}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">City</p>
                  <p className="mt-1 text-gray-700 border px-2 py-1 rounded-sm">{selectedAddress?.city}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Zip Code</p>
                  <p className="mt-1 text-gray-700 border px-2 py-1 rounded-sm">{selectedAddress?.zipCode}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="mt-1 text-gray-700 border px-2 py-1 rounded-sm">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone Number</p>
                  <p className="mt-1 text-gray-700 border px-2 py-1 rounded-sm">{selectedAddress?.mobile}</p>
                </div>
              </div>
            </div>
            <Link to="/profile/address" className="text-blue-600 underline underline-offset-4 inline-block mt-5">
              Ship to a different address?
            </Link>

            {/* help */}
            <div className="relative ">
              <CircleHelp onClick={() => setShowModel(prev => !prev)} className="text-white animate-bounce bg-orange-500 rounded-full mt-5 cursor-pointer hover:scale-110 transition-all" />
              <div className={`bg-orange-500 text-white z-10 absolute  left-10 -translate-y-[50%]  px-10 py-4  rounded-md shadow-xl text-center ${showModel ? "block" : "hidden"}`}>
                <p>Online payment is only for demo purpose</p>
                <p>Enter following detials in Card</p>
                <ul className="mt-2">
                  <li>Card Number:4111 <span>1111</span> <span>1111</span> <span>1111</span></li>
                  <li>Any future date :12/25</li>
                  <li>3 digit random CVV</li>
                  <li>4 digit random OTP</li>
                </ul>
              </div>
            </div>

            {/* Payment Options */}
            <div className="flex items-start justify-between gap-5 mt-5 border rounded-sm px-4 py-2 relative">

              {paymentOptions.map((payment) => (
                <div
                  key={payment.id}
                  className="w-full flex flex-col items-center gap-5 border-r border-l p-2 cursor-pointer"
                  onClick={() => setPaymentType(payment.type)}
                >
                  <img src={payment.icon} alt={payment.type} className="size-8" />
                  <p className="text-gray-800">{payment.type}</p>
                  <div className="size-4 rounded-full border border-black/80 flex items-center justify-center">
                    <div className={`size-2 border-4 rounded-full border-orange-500 ${paymentType === payment.type ? "block" : "hidden"}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Checkout */}
        {selectedAddress && <div>{checkoutType === "single" ? <PlaceSingleOrderCard paymentType={paymentType} /> : <PlaceCartItemsOrderCard paymentType={paymentType} />}</div>}
      </div>
    </div>
  );
};

export default CheckoutPage;