import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./ProductDetail.module.scss";
import { ToastContainer, toast } from "react-toastify";
import TitleHeader from "../../../layouts/layoutsUser/Heading/Title";
const cx = classNames.bind(styles);
const arr = [];
const baseUrl = "http://localhost:5050/catalog/product";
function ProductDetail() {
  document.title = "Product";
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const slug = useParams();
  const [product, setProduct] = useState([]);
  const [checkquantity, setCheckquantity] = useState("");
  const [getApi, setGetapi] = useState(false);
  useEffect(() => {
    window.scroll({ top: 170 });
  }, []);
  useEffect(() => {
    axios.get(baseUrl + "/" + slug.slug).then((res) => {
      setProduct(res.data);
    });
  }, [getApi]);
  function Addtocart() {
    if (quantity > 10) {
      return (
        setCheckquantity("You can only buy up to 10 products"),
        setTimeout(() => {
          setQuantity(10);
        }, 3000)
      );
    }
    if (quantity <= 0) {
      return (
        setCheckquantity("The amount of purchase is not in the format"),
        setTimeout(() => {
          setQuantity(1);
        }, 3000)
      );
    } else {
      const setItem = {
        name: product.name,
        image: product.image,
        price: (product.price * quantity).toLocaleString(),
        quantity: quantity,
      };
      if (localStorage.getItem("accessToken")) {
        const item = arr.map((i) => i.name);
        if (item.at(-1) !== setItem.name) {
          arr.push(setItem);
          setGetapi(true);
          setCheckquantity("");
          localStorage.setItem("item", JSON.stringify(arr));
          toast.success("Add products to successful shopping carts", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error("Product already in the cart", {
            position: "bottom-right",
            autoClose: 5000,
          });
        }
      } else {
        navigate("/login");
        toast.error("You are not logged in", {
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
    }
  }
  function handleincrease() {
    setQuantity(parseInt(quantity) + 1);
    setCheckquantity("");
  }
  function handlereduce() {
    setQuantity(parseInt(quantity) - 1);
    setCheckquantity("");
    if (quantity === 1) {
      setQuantity(1);
    }
  }
  function checkFocus() {
    if (quantity <= 0) {
      return (
        setCheckquantity("The amount of purchase is not in the format"),
        setTimeout(() => {
          setQuantity(1);
        }, 2000)
      );
    }
    if (quantity >= 1) {
      return setCheckquantity("");
    }
  }
  return (
    <>
      <TitleHeader title={product.name}></TitleHeader>
      <div className={cx("wrapper")}>
        <div className={cx("inner")}>
          <div className={cx("content")}>
            <div className={cx("product-info")}>
              <div className={cx("title")}>
                <h4>{product.name}</h4>
              </div>
              <div className={cx("description")}>
                <p>{product.description}</p>
              </div>
              <div className={cx("price")}>
                <h4>
                  Total Price : {(product.price * quantity).toLocaleString()}
                </h4>
              </div>
              <div className={cx("quantity")}>
                <div className={cx("nav-quantity")}>
                  <input
                    type="text"
                    name="quantity"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    onBlur={checkFocus}
                  />
                </div>
                <div className={cx("select")}>
                  <div className={cx("increase")}>
                    <button onClick={handleincrease}>+</button>
                  </div>
                  <div className={cx("reduce")}>
                    <button onClick={handlereduce}>-</button>
                  </div>
                </div>
                <div className={cx("add-to-cart")}>
                  <button onClick={Addtocart}>Add to cart</button>
                  <ToastContainer></ToastContainer>
                  <div className={cx("goback")}>
                    <button onClick={(e) => navigate(-1)}>Quay Lại</button>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="check" className="text text-danger">
                  {checkquantity}
                </label>
              </div>
            </div>
            <div className={cx("image")}>
              <img src={product.image} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
