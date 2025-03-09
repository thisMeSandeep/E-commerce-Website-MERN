import { useEffect } from "react";
import useAddressStore from "../../store/AddressStore";
import { Trash2, CheckCircle } from "lucide-react";

const AddressList = () => {

    const addresses = useAddressStore((state) => state.addresses);
    const fetchAddresses = useAddressStore((state) => state.fetchAddresses);
    const deleteAddress = useAddressStore((state) => state.deleteAddress);
    const selectAddress = useAddressStore((state) => state.selectAddress);
    const selectedAddress = useAddressStore((state) => state.selectedAddress);

    //   fetch address 
    useEffect(() => {
        fetchAddresses();
    }, [fetchAddresses]);

    //   handle delete
    const handleDelete = async (id) => {
        await deleteAddress(id);
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-sm">
            <h2 className="text-xl font-semibold text-gray-600 mb-6">Saved Addresses</h2>

            {addresses.length === 0 ? (
                <div className="text-center text-gray-500">
                    <p>No saved addresses. Add a new address.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {addresses.map((address) => (
                        <div
                            key={address._id}
                            className={`p-4 border rounded-md shadow-sm ${selectedAddress?._id === address._id ? "border-orange-500 " : ""
                                }`}
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold text-gray-700">
                                    {selectedAddress._id === address._id ? <span className="text-orange-500 font-bold">Default Address</span> : ""}
                                </h3>
                                {/* delete button */}
                                <div>
                                    <button
                                        className="text-red-500 hover:text-red-600"
                                        onClick={() => handleDelete(address._id)}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>

                            <p className="text-gray-600 mt-2">{address.address}</p>
                            <p className="text-gray-500">{address.city}, {address.state}, {address.zipCode}</p>
                            <p className="text-gray-500">{address.country}</p>
                            <p className="text-gray-500">📞 {address.mobile}</p>

                            {selectedAddress?._id !== address._id ? <button
                                onClick={() => selectAddress(address._id)}
                                className="mt-3 flex items-center gap-2 px-3 py-1.5 text-sm border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white"
                            >
                                <CheckCircle size={16} /> Set as Default
                            </button> : ""}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AddressList;
