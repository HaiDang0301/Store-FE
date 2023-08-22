import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import PropsMenu from "./PropsMenu/PropsMenu";
import home from "../../../assets/home.png";
import brand from "../../../assets/brand.png";
import product from "../../../assets/product.png";
import chat from "../../../assets/chat.png";
import order from "../../../assets/order.png";
import user from "../../../assets/user.png";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
const cx = classNames.bind(styles);
function SideBar() {
  useEffect(() => window.addEventListener("scroll", {}));
  return (
    <div className={cx("wrapper")}>
      <div className={cx("logo")}>
        <div className={cx("img")}>
          <img
            src="https://mobiosolutions.github.io/ms-e-commerce-admin-panel-bootstrap4/assets/image/logo.png"
            alt=""
          />
        </div>
      </div>
      <PropsMenu
        items={[
          {
            img: home,
            title: "Home",
            link: "/admin/home",
          },
          {
            img: brand,
            title: "Brand",
            link: "/admin/brand",
          },
          {
            img: product,
            title: "Products",
            link: "/admin/products/catalog/page=1",
          },
          {
            img: order,
            title: "Order",
            link: "/admin/order/page=1",
          },
          {
            img: chat,
            title: "Chat",
            link: "/admin/chat",
          },
          {
            img: user,
            title: "User",
            link: "/admin/user",
          },
        ]}
      ></PropsMenu>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default SideBar;
