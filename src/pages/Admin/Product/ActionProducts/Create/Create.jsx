import classNames from "classnames/bind";
import styles from "./Create.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const cx = classNames.bind(styles);
const Apibrand = "http://localhost:5050/admin/brands/brand";
const Apicategory = "http://localhost:5050/admin/brand/category";
const baseUrl = "http://localhost:5050/admin/product/store";
function CreateProduct() {
  document.title = "Admin | Create Product";
  const [image, setImage] = useState();
  const [brand, setBrand] = useState([]);
  const [selectbrand, setSelectBrand] = useState();
  const [category, setCategory] = useState([]);
  const [selectcategory, setSelectCategory] = useState();
  const [check, setCheck] = useState("");
  useEffect(() => {
    window.scrollTo({ top: 200, behavior: "smooth" });
  }, []);
  useEffect(() => {
    axios.get(Apibrand).then((res) => {
      setBrand(res.data);
    });
  }, []);
  useEffect(() => {
    axios.get(Apicategory).then((res) => {
      setCategory(res.data);
    });
  }, []);
  const formik = useFormik({
    initialValues: {
      image: "",
      name: "",
      quantity: "",
      price: "",
      description: "",
    },
    validationSchema: Yup.object({
      image: Yup.string().required("Please provide enough image"),
      name: Yup.string().required("Please provide enough name"),
      brand: Yup.string().required("Please provide enough price"),
      price: Yup.number().required("Please provide enough price"),
      quantity: Yup.number().required("Please provide enough quantity"),
      description: Yup.string().required("Please provide enough description"),
    }),
  });
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", formik.values.name);
    formData.append("brand", selectbrand);
    formData.append("category", selectcategory);
    formData.append("number", formik.values.quantity);
    formData.append("price", formik.values.price);
    formData.append("description", formik.values.description);
    if (!selectbrand || !selectcategory) {
      setCheck("Please provide enough information");
    } else {
      try {
        axios
          .post(baseUrl, formData, {
            headers: {
              token: JSON.parse(window.localStorage.getItem("accessToken")),
            },
          })
          .then((res) => {
            if (res.data === "Sản Phẩm Đã Tồn Tại") {
              toast.error("The product has existed", {
                position: "bottom-right",
                autoClose: 5000,
              });
              <ToastContainer></ToastContainer>;
            }
            if (res.data === "Bạn không có quyền truy cập") {
              toast.error("Bạn không có quyền sử dụng chức năng này", {
                position: "bottom-right",
                autoClose: 5000,
              });
            }
            if (res.data === "Add successful product") {
              toast.success("Add successful product", {
                position: "bottom-right",
                autoClose: 5000,
              });
              <ToastContainer></ToastContainer>;
            }
          });
      } catch (error) {
        alert("Không Thể Kết Nối Đến Server");
      }
    }
  }
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("form")}>
          <div className={cx("check")}>{check}</div>
          <form encType="multipart/form-data">
            <div className={cx("image")}>
              <label htmlFor="img">Image</label>
              <input
                type="file"
                name="image"
                id=""
                onChange={(e) => setImage(e.target.files[0])}
              />
              <br />
            </div>
            <div className={cx("main")}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <br />
              <div className={cx("check")}>
                {formik.errors.name && formik.touched.name
                  ? formik.errors.name
                  : null}
              </div>
            </div>
            <div className={cx("main")}>
              <label htmlFor="img">Brand</label>
              <select
                name="brand"
                value={selectbrand}
                onChange={(e) => setSelectBrand(e.target.value)}
              >
                <option>Select the manufacturer</option>
                {brand.map((brand, index) => (
                  <option key={index}>{brand}</option>
                ))}
              </select>
            </div>
            <div className={cx("main")}>
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id=""
                value={selectcategory}
                onChange={(e) => setSelectCategory(e.target.value)}
              >
                <option value="">Choose the type of product</option>
                {category.map((category, index) => (
                  <option key={index}>{category}</option>
                ))}
              </select>
            </div>
            <div className={cx("quantity")}>
              <label htmlFor="Quantity">Quantity</label>
              <input
                type="text"
                name="quantity"
                id="quantity"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <div className={cx("check")}>
                {formik.errors.quantity && formik.touched.quantity
                  ? formik.errors.quantity
                  : null}
              </div>
            </div>
            <div className={cx("price")}>
              <label htmlFor="price">Price</label>
              <input
                type="text"
                name="price"
                id="price"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <div className={cx("check")}>
                {formik.errors.price && formik.touched.price
                  ? formik.errors.price
                  : null}
              </div>
            </div>
            <div className={cx("description")}>
              <label htmlFor="description">Description</label>
              <textarea
                type="text"
                name="description"
                id="description"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <div className={cx("check")}>
                {formik.errors.description && formik.touched.description
                  ? formik.errors.description
                  : null}
              </div>
            </div>
            <div className={cx("submit")}>
              <button onClick={handleSubmit} className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
