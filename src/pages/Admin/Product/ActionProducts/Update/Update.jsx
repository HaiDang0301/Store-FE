import classNames from "classnames/bind";
import styles from "./Update.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
const cx = classNames.bind(styles);
const Apiproduct = "http://localhost:5050/admin/product";
const Apibrand = "http://localhost:5050/admin/brands/brand";
const Apicategory = "http://localhost:5050/admin/brand/category";
function UpdateProduct() {
  document.title = "Admin | Update Product";
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const [product, setProduct] = useState([]);
  const [brand, setBrand] = useState([]);
  const [selectbrand, setSelectBrand] = useState();
  const [category, setCategory] = useState([]);
  const [selectcategory, setSelectCategory] = useState();
  const [show, setShow] = useState(false);
  const [check, setCheck] = useState(true);
  const id = useParams();
  const URlEdit = Apiproduct + "/" + id.id + "/" + "edit";
  const URlUpdate = Apiproduct + "/" + id.id + "/" + "update";
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      image: product.image,
      name: product.name,
      brand: product.brand,
      category: product.category,
      quantity: product.number,
      price: product.price,
      description: product.description,
    },
    validationSchema: Yup.object({
      image: Yup.string().required("Please provide enough image"),
      name: Yup.string().required("Please provide enough name"),
      price: Yup.number().required("Please provide enough price"),
      quantity: Yup.number().required("Please provide enough quantity"),
      description: Yup.string().required("Please provide enough description"),
    }),
    enableReinitialize: true,
  });
  useEffect(() => {
    axios
      .get(URlEdit, {
        headers: {
          token: JSON.parse(window.localStorage.getItem("accessToken")),
        },
      })
      .then((res) => {
        setProduct(res.data);
      });
  }, []);
  useEffect(() => {
    axios.get(Apibrand).then((res) => {
      setBrand(res.data);
    });
  }, [selectbrand]);
  useEffect(() => {
    axios.get(Apicategory).then((res) => {
      setCategory(res.data);
    });
  }, [selectcategory]);
  function handleClose() {
    setShow(false);
  }
  function handleShow(e) {
    e.preventDefault();
    setShow(true);
  }
  function handleUpdate(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", formik.values.image);
    formData.append("name", formik.values.name);
    formData.append("brand", selectbrand);
    formData.append("category", selectcategory);
    formData.append("number", formik.values.quantity);
    formData.append("price", formik.values.price);
    formData.append("description", formik.values.description);
    if (!selectbrand || !selectcategory) {
      toast.error("Please provide full information", {
        position: "bottom-right",
        autoClose: 5000,
      });
    } else {
      try {
        axios
          .put(URlUpdate, formData, {
            headers: {
              token: JSON.parse(window.localStorage.getItem("accessToken")),
            },
          })
          .then((res) => {
            if (res.data === "Bạn không có quyền truy cập") {
              toast.error("Bạn không có quyền sử dụng chức năng này", {
                position: "bottom-right",
                autoClose: 5000,
              });
            }
            if (res.data === "Update Thành Công") {
              toast.success("Update Thành Công", {
                position: "bottom-right",
                autoClose: 5000,
              });
              navigate("/admin/products/catalog/page=1");
              <ToastContainer></ToastContainer>;
            }
          });
      } catch (error) {
        alert("Không thể kết nối đến server");
      }
    }
  }
  return (
    <div className={cx("wrapper")}>
      <div className={cx("message")}>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <p className="text text-danger">Notification</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>You are sure to update</Modal.Body>
          <Modal.Footer>
            <Link onClick={handleUpdate} className="btn btn-warning">
              Update
            </Link>
            <ToastContainer></ToastContainer>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className={cx("inner")}>
        <div className={cx("form")}>
          <form>
            <div className={cx("image")}>
              <label htmlFor="img">Image</label>
              <input
                type="text"
                name="image"
                id="image"
                onClick={(e) => setCheck(true)}
                value={check ? product.image || "" : formik.values.image || ""}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <br />
              <div className={cx("check")}>
                {formik.errors.image && formik.touched.image
                  ? formik.errors.image
                  : null}
              </div>
            </div>
            <div className={cx("main")}>
              <label htmlFor="img">Name</label>
              <input
                onClick={(e) => setCheck(false)}
                type="text"
                name="name"
                id="name"
                value={check ? product.name || "" : formik.values.name || ""}
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
                value={selectcategory}
                onChange={(e) => setSelectCategory(e.target.value)}
              >
                <option>Select the category</option>
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
                onClick={(e) => setCheck(false)}
                value={
                  check ? product.number || "" : formik.values.quantity || ""
                }
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
                onClick={(e) => setCheck(false)}
                value={check ? product.price || "" : formik.values.price || ""}
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
                onClick={(e) => setCheck(false)}
                value={
                  check
                    ? product.description || ""
                    : formik.values.description || ""
                }
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
              <button
                disabled={!formik.dirty}
                className="btn btn-primary"
                onClick={handleShow}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
