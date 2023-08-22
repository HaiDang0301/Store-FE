import SideBar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import classNames from "classnames/bind";
import styles from "./layoutAdmin.module.scss";
const cx = classNames.bind(styles);
function LayoutAdmin({ children }) {
  return (
    <>
      <div className={cx("layout")}>
        <div className={cx("sidebar")}>
          <SideBar></SideBar>
        </div>
        <div className={cx("main")}>
          <Header></Header>
          <div className={cx("children")}>{children}</div>
        </div>
      </div>
    </>
  );
}

export default LayoutAdmin;
