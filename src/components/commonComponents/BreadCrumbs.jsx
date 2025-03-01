import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BreadCrumbs = ({ productName }) => {
    const { pathname } = useLocation();
    const paths = pathname.split("/").filter(Boolean);

    return (
        <div className="flex text-gray-500 text-sm items-center gap-2 py-4 bg-blue-100/50 px-5 overflow-x-auto no-scrollbar text-nowrap">
            <Link to="/" className="flex items-center gap-2">
                <Home className="size-5 text-orange-500" /> Home
            </Link>

            {paths.map((segment, index) => {
                const isLast = index === paths.length - 1;
                const url = `/${paths.slice(0, index + 1).join("/")}`;
                
                const displayText = isLast && productName ? productName : segment.replace("-", " ");

                return (
                    <div key={url} className="flex items-center gap-2">
                        <ChevronRight className="size-4 text-gray-400" />
                        {isLast ? (
                            <span className="capitalize text-gray-700">{displayText}</span>
                        ) : (
                            <Link to={url} className="capitalize text-blue-600 hover:underline">
                                {displayText}
                            </Link>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default BreadCrumbs;
