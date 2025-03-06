import BreadCrumbs from "../components/commonComponents/BreadCrumbs"
import checkCirlce from "../assets/CheckCircle.png"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

const CheckoutSuccessPage = () => {
  return (
    <div className="mt-[120px]">
      <BreadCrumbs />
      <div className="container flex justify-between items-center flex-col gap-5 mt-10">
        <img src={checkCirlce} alt="checkout success" />
        <p className="text-gray-800 text-2xl text-center ">Your order is succesfully placed</p>
        <p className="text-gray-500 text-center"> feel free to explore more products or check out our latest offers.</p>
        <div className="flex flex-col md:flex-row items-center gap-5">
          <Link to="/orders" className="border-2 border-orange-500/50 text-orange-500 uppercase font-medium  text-center py-2 px-10 text-nowrap rounded-sm flex items-center gap-2">view order <ArrowRight /></Link>
          <Link to="/products" className="border bg-orange-500 text-white  text-center py-2 px-10 text-nowrap rounded-sm">Explore more products</Link>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSuccessPage