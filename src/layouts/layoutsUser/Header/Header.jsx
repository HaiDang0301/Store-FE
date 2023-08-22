import cart from "../../../assets/cart.png";
import { Link, useNavigate } from "react-router-dom";
import classnames from "classnames/bind";
import styles from "./Header.module.scss";
import { useEffect, useState } from "react";
import Items from "../Items/Items";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import imgmenu from "../../../assets/menu.png";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
const cx = classnames.bind(styles);
function Header() {
  const [sumproduct, setSumproduct] = useState(0);
  const [sump, setSumP] = useState(true);
  const [changeCart, setChangeCart] = useState(true);
  const [menu, setMenu] = useState(true);
  const [product, setProduct] = useState([]);
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState();
  const { t } = useTranslation();
  const id = JSON.parse(window.localStorage.getItem("id"));
  const changeLanguage = (e) => {
    const languageValue = e.target.value;
    i18n.changeLanguage(languageValue);
  };
  const navigate = useNavigate();
  const arr = [];
  var sum = 0;
  var totalprice = 0;
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("item"))) {
      const sumItem = JSON.parse(localStorage.getItem("item"));
      if (sumItem) {
        {
          sumItem.map((item, index) => {
            arr.push(parseInt(item.quantity));
          });
        }
      }
      for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
      }
      for (let i = 0; i < sumItem.length; i++) {}
      setSumproduct(sum);
      if (sum > 99) {
        setSumP(false);
      }
    }
  }, [changeCart]);
  useEffect(() => {
    if (JSON.parse(window.localStorage.getItem("item"))) {
      setProduct(JSON.parse(window.localStorage.getItem("item")));
    }
  }, [changeCart]);
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setUser(JSON.parse(window.localStorage.getItem("name")));
    }
  });
  function handleClick() {
    setChangeCart(!changeCart);
    if (JSON.parse(window.localStorage.getItem("item"))) {
      const Item = JSON.parse(window.localStorage.getItem("item"));
      for (let i = 0; i < Item.length; i++) {
        totalprice += parseInt(Item[i].price.split(".").join(""));
      }
      setTotal(totalprice.toLocaleString());
    }
  }
  function clickMenu() {
    setMenu(!menu);
  }
  function onclickNavMenu() {
    setMenu(true);
    setChangeCart(true);
  }
  function logout() {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  }
  function handleOrder() {
    if (!JSON.parse(window.localStorage.getItem("item"))) {
      toast.error("Giỏ Hàng Trống", {
        position: "bottom-right",
        autoClose: 5000,
      });
    } else {
      navigate(`/${id}/payment`);
      setChangeCart(true);
    }
  }
  function removeAll() {
    if (JSON.parse(window.localStorage.getItem("item"))) {
      localStorage.removeItem("item");
      toast.success("Xóa Đơn Hàng Thành Công", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        window.location.reload();
      });
    } else {
      toast.error("Giỏ Hàng Trống", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  async function removeKey(e) {
    const item = JSON.parse(window.localStorage.getItem("item"));
  }
  return (
    <header className={cx("wrapper")}>
      <div className={cx("nav")}>
        <div className={cx("nav-top")}>
          <div className={cx("nav-info")}>
            <div className={cx("title-info")}>
              <nav className={cx("phone-info")}>
                <label htmlFor="phone">Call Us: +0 345 649-255</label>
              </nav>
              <nav className={cx("email-info")}>
                <label htmlFor="email">Email: </label>
                <Link to="#">dinhhaidang1003@gmail.com</Link>
              </nav>
            </div>
            <div className={cx("singin")}>
              {user ? (
                <>
                  <div className={cx("user")}>
                    <label>Hi {user}</label>
                  </div>
                  <div className={cx("logout")}>
                    ,<button onClick={logout}>Logout</button>
                  </div>
                </>
              ) : (
                <>
                  <div className={cx("login")}>
                    <Link to="/login">Login</Link>
                  </div>
                  <div className={cx("register")}>
                    <Link to="/register">/ Register</Link>
                  </div>
                </>
              )}
            </div>
            <div className={cx("nav-top-social")}>
              <Items
                items={[
                  {
                    img: "https://assets.website-files.com/5badda2935e11303a89a461e/5bae5eec5227792568635e37_twitter-icon-white.svg",
                    link: "/",
                  },
                  {
                    img: "https://assets.website-files.com/5badda2935e11303a89a461e/5bae5eec3cb36463d4cf4661_facebook-icon-white.svg",
                    link: "https://www.facebook.com/profile.php?id=100023095460530",
                  },
                  {
                    img: "https://assets.website-files.com/5badda2935e11303a89a461e/5bae5eec7fe624275552217c_instagram-icon-white.svg",
                    link: "/",
                  },
                  {
                    img: "https://assets.website-files.com/5badda2935e11303a89a461e/5bae5eec6e93377c0bbdba8a_pinterest-icon-white.svg",
                    link: "/",
                  },
                  {
                    img: "https://assets.website-files.com/5badda2935e11303a89a461e/5bae5eecfff242b7c309e311_youtube-icon.svg",
                    link: "/",
                  },
                ]}
              ></Items>
            </div>
            <div className={cx("translate")}>
              <label>Language</label>
              <select onChange={changeLanguage}>
                <option value="eng">English</option>
                <option value="vie">Vietnamese</option>
              </select>
            </div>
          </div>
        </div>
        <div className={cx("nav-bottom")}>
          <div className={cx("nav-main")}>
            <div className={cx("logo")}>
              <Link to="/">
                <h2>Store</h2>
                <ToastContainer></ToastContainer>
              </Link>
            </div>
            <div className={cx(menu ? "navigation" : "nav-mobile")}>
              <Link to="/catalog/page=1" onClick={onclickNavMenu}>
                <h5>{t("catalog")}</h5>
                <ToastContainer></ToastContainer>
              </Link>
              <Link to="/delivery" onClick={onclickNavMenu}>
                <h5>{t("delivery")}</h5>
                <ToastContainer></ToastContainer>
              </Link>
              <Link to="/about" onClick={onclickNavMenu}>
                <h5>{t("about")}</h5>
                <ToastContainer></ToastContainer>
              </Link>
              <Link to="/contacts" onClick={onclickNavMenu}>
                <h5>{t("contacts")}</h5>
                <ToastContainer></ToastContainer>
              </Link>
            </div>
            <div className={cx("cart")}>
              <Link to={`/${id}/cart`}>
                <img src={cart} alt="" />
              </Link>
              <div className={cx("sum-products")}>
                <Link to="" onClick={handleClick}>
                  {sump ? sumproduct : 99 + "+"}
                </Link>
              </div>
              <div className={cx("menu")}>
                <Link onClick={clickMenu}>
                  <img src={imgmenu} alt="" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx(changeCart ? "cart-active" : "active-cart")}>
        <div className={cx("close")}>
          <Link to="" onClick={handleClick}>
            X
          </Link>
        </div>
        <div className={cx("remove")}>
          <button onClick={removeAll}>Remove All</button>
        </div>
        <div className={cx("product")}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            {product.map((item, index) => (
              <tbody key={index}>
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <img src={item.image} alt="" />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>
                    <button onClick={removeKey}>x</button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          <div className={cx("totalprice")}>
            <label htmlFor="">Total Price : {total}</label>
          </div>
          <div className={cx("order")}>
            <button onClick={handleOrder}>Buy Now</button>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
