import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Items.module.scss";
const cx = classNames.bind(styles);
function Items(props) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("items")}>
        {props.items.map((item, index) => (
          <div className={cx("item")} key={index}>
            <Link to={props.link} target="_blank">
              <img src={item.img} alt="" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Items;
