import { useState } from "react";
import DescriptionTab from "./DescriptionTab";
import FeaturesTab from "./FeaturesTab";
import ReviewTab from "./ReviewTab";

const tabs = [
    { id: 1, tabType: "DESCRIPTION" },
    { id: 2, tabType: "FEATURES" },
    { id: 3, tabType: "REVIEW" }
];

const ProductDescription = ({ product }) => {
    const [tabType, setTabType] = useState("DESCRIPTION");

    //  function to render tab content
    const renderTabContent = () => {
        switch (tabType) {
            case "FEATURES":
                return <FeaturesTab product={product} />;
            case "REVIEW":
                return <ReviewTab reviews={product.reviews} />;
            default:
                return <DescriptionTab productDescription={product.description} />;
        }
    };

    return (
        <div className="border rounded my-5">
            {/* Tab selection section */}
            <div className="flex items-center justify-center gap-8 sm:gap-10 pt-4 sm:pt-6 lg:pt-8 border-b">
                {tabs.map((tab) => (
                    <span key={tab.id}>
                        <button
                            className="text-sm font-medium text-gray-900"
                            onClick={() => setTabType(tab.tabType)}
                        >
                            {tab.tabType}
                        </button>
                        <div
                            className={`w-full scale-x-110 h-[2px] bg-orange-500 ${tabType === tab.tabType ? "block" : "hidden"
                                }`}
                        ></div>
                    </span>
                ))}
            </div>

            {/*selected tab content */}
            <div>{renderTabContent()}</div>
        </div>
    );
};

export default ProductDescription;
