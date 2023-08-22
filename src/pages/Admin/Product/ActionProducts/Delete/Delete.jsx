import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
const baseUrl = "http://localhost:5050/admin/product";
import { toast, ToastContainer } from "react-toastify";
function DeleteProduct() {
  const navigate = useNavigate();
  const id = useParams();
  const baseUrlDelete = baseUrl + "/" + id.id + "/" + "delete";
  axios
    .delete(baseUrlDelete, {
      headers: {
        token: JSON.parse(window.localStorage.getItem("accessToken")),
      },
    })
    .then((res) => {
      if (res.data === "Xóa Thành Công") {
        toast.success("Delete success", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }),
          navigate("/admin/products/catalog/page=1");
      }
      if (res.data === "Bạn không có quyền truy cập") {
        toast.error("Bạn không thể sử dụng chức năng này", {
          position: "bottom-right",
          autoClose: 5000,
        });
      }
      <ToastContainer></ToastContainer>;
    });
  return <div></div>;
}

export default DeleteProduct;
