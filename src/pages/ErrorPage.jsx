
import { Link } from "react-router-dom";
import errorPageImage from "../assets/errorPage.png";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4 ">
      <div className="text-center p-6 max-w-md w-full ">
        <img
          src={errorPageImage}
          alt="Error Image"
          className="mx-auto mb-4 w-full max-w-xs"
        />
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Oops! Page Not Found</h1>
        <p className="text-gray-600 mt-2">
          The page you are looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;