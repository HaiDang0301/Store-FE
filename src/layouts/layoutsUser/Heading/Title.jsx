import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Title.module.scss";
const cx = classNames.bind(styles);
function TitleHeader(props) {
  const navigate = useNavigate();
  return (
    <div style={{ paddingTop: "50px", paddingBottom: "50px" }}>
      <div className={cx("header")}>
        <nav className={cx("nav-catalog")}>
          <div className={cx("main-catalog")}>
            <div className={cx("title")}>
              <Link to="/">Home</Link>
            </div>
            <div className={cx("img")}>
              <img
                src="https://img.icons8.com/ios-glyphs/1x/arrow.png"
                alt=""
              />
            </div>
            <div className={cx("catalog")}>{props.title}</div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default TitleHeader;
