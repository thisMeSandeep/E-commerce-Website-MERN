import { useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import useUserStore from "../../store/userStore";
import userDummyImage from "../../assets/userDummy.png";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { Pencil } from "lucide-react";

const Avatar = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState(null);
    const user = useUserStore((state) => state.user);
    const getUserData = useUserStore((state) => state.getUserData)
    const [name, setName] = useState(user?.name);
    const [preview, setPreview] = useState(null);


    useEffect(() => {
        if (!image) return;
        const objectUrl = URL.createObjectURL(image);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [image]);


    // function for update profile 
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        // create form data
        const formData = new FormData();
        formData.append('avatar', image);
        formData.append('name', name);
        try {
            const { data } = await axiosInstance.patch("/api/user/update-data", formData);
            if (data.success) {
                toast.success(data.message);
                getUserData();
                setIsEdit(false)
            }
        } catch (err) {
            console.log(err.response.data.message);
            toast.error(err?.response?.data?.message)
        }
    };

    return (
        <div className="py-5">
            <form className=" space-y-5 w-full md:max-w-3xl mx-auto">
                {/* User Avatar */}
                <div className="size-32 mx-auto">
                    <label htmlFor="image" className="cursor-pointer relative">
                        <img
                            src={preview || user?.avatar || userDummyImage}
                            alt="upload"
                            className={`size-32 object-cover rounded-full ${isEdit ? "opacity-60" : ""}`}
                        />
                        {isEdit && (
                            <img
                                src={assets.upload_area}
                                alt="upload icon"
                                className="size-32 object-cover rounded-full absolute top-0 left-0 mix-blend-darken"
                            />
                        )}
                    </label>
                    {isEdit && (
                        <input
                            type="file"
                            accept="image/*"
                            id="image"
                            className="hidden"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    )}
                </div>

                {/* User Account Status */}
                {user && <div className="w-full p-4 border rounded-lg  bg-white">
                    <h3 className="text-lg font-semibold text-gray-700">Account Information</h3>

                    {/* Account Status */}
                    <div className="flex items-center gap-2 mt-2">
                        <span className={`text-xl ${user.accountStatus === "active" ? "text-green-600" : "text-red-600"}`}>
                            {user.accountStatus === "active" ? "🟢" : "🔴"}
                        </span>
                        <p className="text-gray-600">
                            <span className="font-semibold">Status:</span> {user.accountStatus}
                        </p>
                    </div>

                    {/* Last Login */}
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-gray-500">📅</span>
                        <p className="text-gray-600">
                            <span className="font-semibold">Last Login:</span>
                            <span className="text-green-500 ml-1">{user.lastLoginDate}</span>
                        </p>
                    </div>
                </div>}

                {/* email */}
                <p className="w-full p-2 border outline-none  rounded-md text-gray-500 cursor-not-allowed">
                    {user?.email}
                </p>


                {/* Name Input */}
                {isEdit ? (
                    <div className="relative w-full">
                        <input
                            type="text"
                            value={name}
                            name="name"
                            placeholder="Your name"
                            className="w-full p-2 pr-4 border outline-none rounded-md text-gray-500"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Pencil className="text-gray-500 size-4 md:size-5 absolute right-2 top-[50%] -translate-y-[50%]" />
                    </div>
                ) : (
                    <p className="w-full p-2 border outline-none  rounded-md text-gray-500 cursor-text">
                        {user?.name}
                    </p>
                )}

                {/* Update Profile Button */}
                {isEdit && (
                    <button
                        className="px-10  py-2 bg-orange-500 text-white font-semibold rounded-md mt-10"
                        type="button"
                        onClick={handleUpdateProfile}
                    >
                        Update profile
                    </button>
                )}
            </form>

            {/* Edit Button */}
            <div className="md:max-w-3xl mx-auto">
                {!isEdit && (
                    <button
                        className="px-10 py-2 bg-orange-500 text-white font-semibold rounded-md mt-10"
                        type="button"
                        onClick={() => setIsEdit(true)}
                    >
                        Edit your profile
                    </button>
                )}
            </div>
        </div>
    );
};

export default Avatar;
