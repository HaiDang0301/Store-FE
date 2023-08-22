import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import classNames from "classnames/bind";
import styles from "./layoutUser.module.scss";
const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
  return (
    <div className={cx("wrapper")}>
      <Header></Header>
      <div className={cx("children")}>{children}</div>
      <Footer></Footer>
    </div>
  );
}

export default DefaultLayout;
