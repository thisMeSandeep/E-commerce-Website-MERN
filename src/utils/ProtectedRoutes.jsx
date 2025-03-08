import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "../store/userStore";

const ProtectedRoutes = () => {

    const user = useUserStore((state) => state.user)

    return user ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes