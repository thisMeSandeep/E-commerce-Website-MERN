import { ChevronRight, Home } from "lucide-react"

const BreadCrumbs = ({title}) => {
    return (
        <div className="flex text-gray-500 text-sm items-center gap-2 py-4 bg-blue-100/50 px-5 overflow-x-scroll no-srollbar text-nowrap">
            <span className="flex items-center gap-2"><Home className="size-5" /> Home</span>
            <ChevronRight className="size-5" />
            <span>Shop</span>
            <ChevronRight className="size-5" />
            <span>All Categories</span>
            <ChevronRight className="size-5" />
            <span>{title}</span>
        </div>
    )
}

export default BreadCrumbs