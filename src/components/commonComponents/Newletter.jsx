import { Loader } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleOnClick = () => {
        if (!email) return;

        setLoading(true);
        setTimeout(() => {
            toast.success("Subscribed");
            setLoading(false); 
        }, 2000);
    };

    return (
        <div className="flex flex-col items-center justify-center text-center space-y-2 pt-8 pb-14">
            <h1 className="md:text-4xl text-2xl font-medium">
                Subscribe now & get 20% off
            </h1>
            <p className="md:text-base text-gray-500/80 pb-8">
                Stay ahead with exclusive deals, insider updates, and the latest trends—subscribe now and never miss out!
            </p>
            <div className="flex items-center justify-between max-w-2xl w-full md:h-14 h-12">
                <input
                    className="border border-gray-500/30 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
                    type="email"
                    placeholder="Enter your email id"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    className="md:px-12 px-8 h-full text-white bg-orange-600 rounded-md rounded-l-none flex items-center justify-center"
                    onClick={handleOnClick}
                    disabled={loading} 
                >
                    {loading ? <Loader className="animate-spin" /> : "Subscribe"}
                </button>
            </div>
        </div>
    );
};

export default Newsletter;
