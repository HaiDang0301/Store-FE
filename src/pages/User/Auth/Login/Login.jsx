import classNames from "classnames/bind";
import styles from "./Login.module.scss";
const cx = classNames.bind(styles);
import { useFormik } from "formik";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
const baseUrl = "http://localhost:5050/auth/login";
function Login() {
  document.title = "Login";
  const navigate = useNavigate();
  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
    if (localStorage.getItem("accessToken")) {
      navigate("/");
      toast.error("You have logged in", {
        position: "bottom-right",
        autoClose: 5000,
      });
    }
  }, []);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Vui lòng nhập email"),
      password: Yup.string().required("Vui lòng nhập mật khẩu"),
    }),
  });
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      axios
        .post(baseUrl, {
          email: formik.values.email,
          password: formik.values.password,
        })
        .then((res) => {
          if (res.status === 203) {
            toast.error("Thông Tin Tài Khoản Mật Khẩu Không Chính Xác", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else {
            localStorage.setItem("accessToken", JSON.stringify(res.data.token));
            localStorage.setItem(
              "admin",
              JSON.stringify(res.data.others.admin)
            );
            localStorage.setItem("id", JSON.stringify(res.data.others._id));
            localStorage.setItem(
              "name",
              JSON.stringify(res.data.others.fullname)
            );
            if (res.data.others.admin === false) {
              toast.success("Đăng Nhập Thành Công", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              navigate("/");
            } else {
              toast.success("Đăng Nhập Thành Công", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              navigate("/admin/home");
            }
          }
        });
    } catch (error) {
      alert("Không Thể Kết Nối Đến Server");
    }
  }
  return (
    <div className={cx("wrapper")}>
      <form method="GET" className={cx("form")}>
        <div className={cx("login")}>
          <div className={cx("nav-login")}>
            <div className={cx("label")}>
              <label htmlFor="email">Email</label>
              <input
                type="text"
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
            <div className={cx("register")}>
              <label htmlFor="register">
                Do not have an account ? <Link to="/register">Register</Link>
              </label>
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
              src="https://img.icons8.com/external-flat-icons-inmotus-design/256/external-login-security-and-protection-flat-icons-inmotus-design.png"
              alt=""
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
