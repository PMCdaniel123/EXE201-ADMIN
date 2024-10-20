import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const token = Cookies.get("token");

  if (!token) {
    toast.error("You need to login first");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
