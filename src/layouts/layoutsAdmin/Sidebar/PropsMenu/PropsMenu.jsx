import classNames from "classnames/bind";
import styles from "./PropsMenu.module.scss";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);
function PropsMenu(props) {
  return (
    <div className={cx("wrapper")}>
      {props.items.map((item, index) => (
        <div key={index} className={cx("item")}>
          <div className={cx("nav-item")}>
            <div className={cx("img")}>
              <Link to={item.link}>
                <img src={item.img} alt="" />
              </Link>
            </div>
            <div className={cx("title")}>{item.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PropsMenu;
