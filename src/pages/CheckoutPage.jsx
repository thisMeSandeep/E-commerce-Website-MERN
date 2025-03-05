import { useState } from "react";
import BreadCrumbs from "../components/commonComponents/BreadCrumbs"
import useAddressStore from "../store/AddressStore"
import useUserStore from "../store/userStore";
import { Link } from "react-router-dom";
import cashImage from "../assets/cash.png"
import dollarImage from "../assets/dollar.png"
import PlaceSingleOrderCard from "../components/commonComponents/PlaceSingleOrderCard";
import useCheckoutStore from "../store/checkoutStore";
import PlaceCartItemsOrderCard from "../components/commonComponents/PlaceCartItemsOrderCard";

const paymentOptions = [
  {
    id: 1,
    type: "COD",
    icon: cashImage
  },
  {
    id: 2,
    type: "Online Payment",
    icon: dollarImage
  }
]


const CheckoutPage = () => {

  const [paymentType, setPaymentType] = useState("Online Payment");

  const selectedAddress = useAddressStore((state) => state.selectedAddress);
  const user = useUserStore((state) => state.user);
  const checkoutType = useCheckoutStore((state) => state.checkoutType);
  console.log(checkoutType)


  return (
    <div className="mt-24 md:mt-[120px]">
      <BreadCrumbs />

      <div className="container my-10 flex flex-col md:flex-row items-start justify-between gap-5">
        {/* address */}
        <div className="">
          <div className="flex-1">
            <h1 className="text-gray-700 text-xl font-medium">Billing Information</h1>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2  gap-5">

              {/* name */}
              <div>
                <p className="text-sm text-gray-600">User name</p>
                <p className="mt-1 text-gray-700 border px-2 py-1 rounded-sm ">{user?.name}</p>
              </div>

              {/* address */}
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p className="mt-1 text-gray-700 border px-2 py-1 rounded-sm ">{selectedAddress?.fullAddress}</p>
              </div>

              {/* country */}
              <div>
                <p className="text-sm text-gray-600">Country</p>
                <p className="mt-1 text-gray-700 border px-2 py-1 rounded-sm ">{selectedAddress?.country}</p>
              </div>

              {/* State */}
              <div>
                <p className="text-sm text-gray-600">State</p>
                <p className="mt-1 text-gray-700 border px-2 py-1 rounded-sm ">{selectedAddress?.state}</p>
              </div>

              {/* city */}
              <div>
                <p className="text-sm text-gray-600">City</p>
                <p className="mt-1 text-gray-700 border px-2 py-1 rounded-sm ">{selectedAddress?.city}</p>
              </div>

              {/* Zip Code  */}
              <div>
                <p className="text-sm text-gray-600">Zip Code</p>
                <p className="mt-1 text-gray-700 border px-2 py-1 rounded-sm ">{selectedAddress?.zipCode}</p>
              </div>

              {/* email */}
              <div className="text-sm text-gray-600">
                <p>Email</p>
                <p className="mt-1 text-gray-700 border px-2 py-1 rounded-sm ">{user?.email}</p>
              </div>

              {/* phone */}
              <div className="text-sm text-gray-600">
                <p>Phone Number</p>
                <p className="mt-1 text-gray-700 border px-2 py-1 rounded-sm ">{selectedAddress?.mobile}</p>
              </div>

            </div>
          </div>

          <Link to='/profile/address' className="text-blue-600 underline underline-offset-4 inline-block mt-5">Ship into different address?</Link>
          {/* address ends here */}
          {/* payment option */}
          <div className="flex items-start justify-between gap-5 mt-5 border rounded-sm px-4 py-2">
            {
              paymentOptions.map((payment) => (
                <div key={payment.id} className="w-full flex flex-col items-center gap-5 border-r border-l p-2 cursor-pointer " onClick={() => setPaymentType(payment.type)}>
                  <img src={payment.icon} alt="payment option" className="size-8" />
                  <p className="text-gray-800">{payment.type}</p>
                  <div className="size-4 rounded-full border border-black/80 flex items-center justify-center">
                    <div className={`size-2 border-4 rounded-full border-orange-500 ${paymentType === payment.type ? "block" : "hidden"} `}></div>
                  </div>
                </div>
              ))
            }
          </div>

        </div>

        {/* checkout */}
        {checkoutType === "single" ? <PlaceSingleOrderCard paymentType={paymentType} /> : <PlaceCartItemsOrderCard />}

      </div>
    </div>
  )
}

export default CheckoutPage