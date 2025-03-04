import { useState } from "react"
import AddressList from "./AddressList";
import AddAddress from "./AddAddress";

const tabs = [
    {
        id: 1,
        tabDesc: "Manage Address"
    },
    {
        id: 2,
        tabDesc: "Add New Address"
    }
]

const Address = () => {
    const [selectedTab, setSelectedTab] = useState(tabs[0].tabDesc);

    const renderTabContent = () => {
        switch (selectedTab) {
            case tabs[0].tabDesc:
                return <AddressList />;
            case tabs[1].tabDesc:
                return <AddAddress />;
            default:
                return <AddressList />;
        }
    };

    return (
        <div>
            <div className="flex items-center justify-center gap-10 border-b border-black/30">
                {
                    tabs.map((tab) => (
                        <div key={tab.id}>
                            <button className="font-medium text-gray-800 md:text-xl" onClick={() => setSelectedTab(tab.tabDesc)}>{tab.tabDesc}</button>
                            <div
                                className={`w-full scale-x-110 h-[2px] bg-orange-500 ${selectedTab === tab.tabDesc ? "block" : "hidden"
                                    }`}
                            ></div>
                        </div>
                    ))
                }
            </div>
            {renderTabContent()}
        </div>
    )
}

export default Address