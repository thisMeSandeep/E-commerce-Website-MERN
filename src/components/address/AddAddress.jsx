import { useState } from "react";
import useAddressStore from "../../store/AddressStore";
import { Loader } from "lucide-react";

const AddAddress = () => {
    const [formData, setFormData] = useState({
        fullAddress: "",
        city: "",
        state: "",
        country: "",
        mobile: "",
        zipCode: "",
    });

    const [loading, setLoading] = useState(false)

    const addAddress = useAddressStore((state) => state.addAddress);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await addAddress(formData)
        } catch (err) {
            console.log(err.message);
        } finally {
            setLoading(false)
        }

    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 ">
            <h2 className="text-xl font-semibold text-gray-500 mb-6">Add New Address</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* full address */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-600">Full Address</label>
                    <textarea
                        name="fullAddress"
                        value={formData.fullAddress}
                        onChange={handleChange}
                        required
                        rows="3"
                        className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
                        placeholder="Enter full address..."
                    ></textarea>
                </div>

                {/* City */}
                <div>
                    <label className="block text-sm font-medium text-gray-600">City</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
                        placeholder="Enter city..."
                    />
                </div>

                {/* State */}
                <div>
                    <label className="block text-sm font-medium text-gray-600">State</label>
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
                        placeholder="Enter state..."
                    />
                </div>

                {/* Country */}
                <div>
                    <label className="block text-sm font-medium text-gray-600">Country</label>
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
                        placeholder="Enter country..."
                    />
                </div>

                {/* Zip Code */}
                <div>
                    <label className="block text-sm font-medium text-gray-600">Zip Code</label>
                    <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                        pattern="[0-9]{5,6}"
                        className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
                        placeholder="Enter zip code..."
                    />
                </div>

                {/* Mobile Number */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-600">Mobile</label>
                    <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                        pattern="[0-9]{10}"
                        className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-300"
                        placeholder="Enter mobile number..."
                    />
                </div>

                {/* sumbit button */}
                <div className="md:col-span-2">
                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition flex items-center justify-center"
                    >
                        {
                            loading ? <Loader className="animate-spin text-white" /> : "Save Address"
                        }
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddAddress;
