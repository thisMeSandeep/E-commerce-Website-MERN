import { Award, DollarSign, HeadphonesIcon, Recycle, Truck } from "lucide-react";


const FeaturesTab = ({ product}) => {

   console.log(product)

    return (
        <div className="flex items-center flex-col justify-center gap-5 py-5">
            <h1 className="text-xl text-gray-900">Features</h1>
            <ul className="space-y-4">
                <li className="flex items-center gap-2">
                    <Award className="text-orange-500" />
                    <p className="text-gray-800">{product.warrantyInformation}</p>
                </li>
                <li className="flex items-center gap-2">
                    <Truck className="text-orange-500" />
                    <p className="text-gray-800">{product.shippingInformation}</p>
                </li>
                <li className="flex items-center gap-2">
                    <Recycle className="text-orange-500" />
                    <p className="text-gray-800">{product.returnPolicy}</p>
                </li>
                <li className="flex items-center gap-2">
                    <HeadphonesIcon className="text-orange-500" />
                    <p className="text-gray-800">24/7 Customer support</p>
                </li>
                <li className="flex items-center gap-2">
                    <DollarSign className="text-orange-500" />
                    <p className="text-gray-800">Secure Payment method</p>
                </li>
            </ul>
        </div>
    )
}

export default FeaturesTab