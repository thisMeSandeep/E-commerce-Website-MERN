import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeOff, Eye, Loader } from "lucide-react";
import useUserStore from "../store/userStore";

const SignInPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const navigate = useNavigate();

  const loginUser = useUserStore((state) => state.loginUser);
  const loginStatus = useUserStore((state) => state.loginStatus);
  const user = useUserStore((state) => state.user);
  const error = useUserStore((state) => state.error);

  if (user) {
    navigate(-1)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      if (response) {
        navigate(-1);
      }
    } catch (err) {
      console.log(err.message)
    }
  };

  return (
    <div className="px-4  py-24 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border">
        <h2 className="text-2xl text-gray-500 font-semibold text-center mb-6">Sign In</h2>

        {/* Display error */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-1 focus:ring-black/20 outline-none text-gray-600"
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
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-1 focus:ring-black/20 outline-none text-gray-600"
                required
              />
              {passwordVisibility ? (
                <Eye
                  className="size-[18px] absolute top-[50%] right-[5px] -translate-y-[50%] cursor-pointer text-gray-500/80"
                  onClick={() => setPasswordVisibility((prev) => !prev)}
                />
              ) : (
                <EyeOff
                  className="size-[18px] absolute top-[50%] right-[5px] -translate-y-[50%] cursor-pointer text-gray-500/80"
                  onClick={() => setPasswordVisibility((prev) => !prev)}
                />
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition flex items-center justify-center"
            disabled={loginStatus === "loading"} // ✅ Prevents multiple clicks
          >
            {loginStatus === "loading" ? <Loader className="animate-spin" /> : "Login"}
          </button>
        </form>

        {/* Extra Links */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
