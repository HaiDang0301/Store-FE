import classNames from "classnames/bind";
import styles from "./Register.module.scss";
const cx = classNames.bind(styles);
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import axios from "axios";
const baseUrl = "http://localhost:5050/auth/register";
function Register() {
  document.title = "Register";
  const [show, setShow] = useState(false);
  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);
  function handleClose() {
    setShow(false);
  }
  const formik = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      full_name: Yup.string()
        .min(2, "Tối thiểu 2 ký tự")
        .max(20, "Tối đa 10 ký tự")
        .required("Vui lòng cung cấp đầy đủ thông tin"),
      email: Yup.string().required("Email Không Được Để Trống"),
      password: Yup.string()
        .min(6, "Mật khẩu quá ngắn")
        .required("Mật Khẩu Khồng Được Để Trống"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Mật khẩu không khớp")
        .required("Vui lòng cung cấp đầy đủ thông tin"),
    }),
  });
  function handleSubmit(e) {
    e.preventDefault();
    if (
      formik.errors.full_name ||
      formik.errors.email ||
      formik.errors.password
    ) {
      toast.error("Vui lòng cung cấp đầy đủ thông tin", {
        position: "bottom-right",
      });
    } else {
      axios
        .post(baseUrl, {
          fullname: formik.values.full_name,
          email: formik.values.email,
          password: formik.values.password,
        })
        .then((res) => {
          if (res.data === "Đăng Ký Thành Công") {
            setShow(true);
          }
          if (res.data === "Tài Khoản Đã Tồn Tại") {
            toast.error("Tài khoản đã được đăng ký", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        })
        .catch((err) => {
          alert("Không Thể Kết Nối Đến Server");
        });
    }
  }
  return (
    <div className={cx("wrapper")}>
      <div className={cx("message")}>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <p className="text">Notification</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>Successful registration you want to login</Modal.Body>
          <Modal.Footer>
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
            <ToastContainer></ToastContainer>
            <Button onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
      <form method="GET" className={cx("form")}>
        <div className={cx("register")}>
          <div className={cx("nav-register")}>
            <div className={cx("label")}>
              <label htmlFor="fullname">Full Name</label>
              <input
                type="text"
                placeholder="Enter Your Full Name"
                id="full_name"
                name="full_name"
                value={formik.values.full_name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <div className={cx("errors")}>
                {formik.touched.full_name && formik.errors.full_name ? (
                  <>{formik.errors.full_name}</>
                ) : null}
              </div>
            </div>
            <div className={cx("label")}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter Your Email"
                name="email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <div className={cx("errors")}>
                {formik.touched.email && formik.errors.email ? (
                  <>{formik.errors.email}</>
                ) : null}
              </div>
            </div>
            <div className={cx("label")}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Enter Your Password"
                name="password"
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <div className={cx("errors")}>
                {formik.touched.password && formik.errors.password ? (
                  <>{formik.errors.password}</>
                ) : null}
              </div>
            </div>
            <div className={cx("label")}>
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Your Password"
                name="confirm_password"
                value={formik.values.confirm_password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <div className={cx("errors")}>
                {formik.touched.confirm_password &&
                formik.errors.confirm_password ? (
                  <>{formik.errors.confirm_password}</>
                ) : null}
              </div>
            </div>
            <div className={cx("submit")}>
              <button
                disabled={!formik.dirty}
                className="btn btn-primary"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
          <div className={cx("image")}>
            <img
              src="https://assets.website-files.com/5badda2935e11303a89a461e/5badecf79395558fbeb88a49_instagram-01.jpg"
              alt=""
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
