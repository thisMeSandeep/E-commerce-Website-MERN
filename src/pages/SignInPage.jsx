import { useState } from "react";
import { Link } from "react-router-dom";
import { EyeOff, Eye } from "lucide-react";


const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Data:", formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl text-gray-500 font-semibold text-center mb-6">Sign In</h2>

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
              className="w-full px-4 pr-8 py-2 mt-1 border rounded-lg focus:ring-1 focus:ring-black/20 outline-none text-gray-600"
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
              {passwordVisibility ? <Eye className="size-4 absolute top-[50%] right-[5px] -translate-y-[50%] cursor-pointer text-gray-500" onClick={() => setPasswordVisibility(prev => !prev)} /> : <EyeOff className="size-4 absolute top-[50%] right-[5px] -translate-y-[50%] cursor-pointer text-gray-500" onClick={() => setPasswordVisibility(prev => !prev)} />
              }
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Sign In
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
