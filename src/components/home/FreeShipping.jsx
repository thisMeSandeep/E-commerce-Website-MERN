import { TruckIcon } from "lucide-react"
import { Link } from "react-router-dom"

const FreeShipping = () => {
    return (
        <div className="flex flex-col lg:flex-row gap-5 items-center justify-between border-2 border-orange-400 rounded-md px-10 py-4">
            <div className="flex items-center gap-4">
                <TruckIcon className="text-gray-700 size-10"/>
                <p className="text-gray-700 text-2xl font-semibold">Free Shipping</p>
            </div>
            <p className="text-gray-700 text-lg text-center">Guarented free shipping on all products</p>
            <Link to="/products" className="border px-10 py-2 rounded-sm border-orange-500 text-orange-500 font-semibold">Order now</Link>
        </div>
    )
}

export default FreeShipping