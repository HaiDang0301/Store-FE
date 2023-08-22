import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
function ProtectedRoute({ children }) {
  const user = localStorage.getItem("accessToken");
  const role = JSON.parse(window.localStorage.getItem("admin"));
  if (!user) {
    toast.error("You are not logged in", {
      position: "bottom-right",
      autoClose: 5000,
    });
    return <Navigate to="/login"></Navigate>;
  } else {
    if (role === true) {
      return children;
    } else {
      alert("Bạn không có quyền truy cập");
      return <Navigate to="/"></Navigate>;
    }
  }
}

export default ProtectedRoute;
