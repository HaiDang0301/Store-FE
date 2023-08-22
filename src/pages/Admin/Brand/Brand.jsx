import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classNames from "classnames/bind";
import styles from "./Brand.module.scss";
import { useState } from "react";
const baseUrl = "http://localhost:5050/admin/brands/store";
const cx = classNames.bind(styles);
import axios from "axios";
function Brand() {
  document.title = "Admin | Brand";
  const formik = useFormik({
    initialValues: {
      brand: "",
      category: "",
    },
  });
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(
        baseUrl,
        {
          brand: formik.values.brand.toLocaleUpperCase(),
          category: formik.values.category,
        },
        {
          headers: {
            token: JSON.parse(window.localStorage.getItem("accessToken")),
          },
        }
      )
      .then((res) => {
        if (res.data === "Loại Sản Phẩm Đã Tồn Tại") {
          toast.error("Loại Sản Phẩm Đã Tồn Tại", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        if (res.data === "Nhà Sản Xuất Đã Tồn Tại") {
          toast.error("Nhà Sản Xuất Đã Tồn Tại", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        if (res.data === "Thêm Thành Công") {
          toast.success("Thêm thành công", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        if (res.data === "Bạn không có quyền truy cập") {
          toast.error("Bạn không có quyền sử dụng chức năng này", {
            position: "bottom-right",
            autoClose: 5000,
          });
        }
      })
      .catch((err) => {
        alert("Không Thể Kết Nối Server");
      });
  }
  return (
    <div className={cx("wrapper")}>
      <form className={cx("form")} action="">
        <div className={cx("nav-form")}>
          <div className={cx("errors")}></div>
          <div className={cx("brand")}>
            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              name="brand"
              id="brand"
              value={formik.values.brand}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </div>
          <div className={cx("category")}>
            <label htmlFor="category">Category</label>
            <input
              type="text"
              name="category"
              id="category"
              value={formik.values.category}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <button className={cx("btn btn-primary")} onClick={handleSubmit}>
              Submit
            </button>
            <ToastContainer />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Brand;
