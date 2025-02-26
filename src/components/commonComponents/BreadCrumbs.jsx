import { ChevronRight, Home } from "lucide-react"
import { Link } from "react-router-dom"

const BreadCrumbs = ({title}) => {
    return (
        <div className="flex text-gray-500 text-sm items-center gap-2 py-4 bg-blue-100/50 px-5 overflow-x-auto no-srollbar text-nowrap">
            <Link to="/" className="flex items-center gap-2"><Home className="size-5 text-orange-500" /> Home</Link>
            <ChevronRight className="size-5" />
            <Link to="/products">Shop</Link>
            <ChevronRight className="size-5" />
            <span>All Categories</span>
            <ChevronRight className="size-5" />
            <span>{title}</span>
        </div>
    )
}

export default BreadCrumbs