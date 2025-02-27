import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeOff, Eye, Loader } from "lucide-react";
import useUserStore from "../store/userStore";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const navigate = useNavigate();
  const registerUser = useUserStore((state) => state.registerUser);
  const error = useUserStore((state) => state.error);
  const registerStatus = useUserStore((state) => state.registerStatus);



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }

    setPasswordError("");

    if (registerStatus === "loading") return;

    try {
      await registerUser(formData);
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };


  return (
    <div className="mt-16 flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-500">Register</h2>

        {/*  password error display */}
        {passwordError && <p className="text-red-500 text-center">{passwordError}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name Input */}
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-1 focus:ring-black/20 outline-none"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-1 focus:ring-black/20 outline-none"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                type={passwordVisibility ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-2 mt-1 border rounded-lg  focus:ring-1 focus:ring-black/20 outline-none text-gray-600"
                required
              />
              {passwordVisibility ? (
                <Eye
                  className="size-5 absolute top-[50%] right-[5px] -translate-y-[50%] cursor-pointer text-gray-500"
                  onClick={() => setPasswordVisibility((prev) => !prev)}
                />
              ) : (
                <EyeOff
                  className="size-5 absolute top-[50%] right-[5px] -translate-y-[50%] cursor-pointer text-gray-500"
                  onClick={() => setPasswordVisibility((prev) => !prev)}
                />
              )}
            </div>
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-1 focus:ring-black/20 outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition flex items-center justify-center"
            disabled={registerStatus === "loading"}
          >
            {registerStatus === "loading" ? <Loader className="animate-spin" /> : "Register"}
          </button>
        </form>

        {/* Extra Links */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
