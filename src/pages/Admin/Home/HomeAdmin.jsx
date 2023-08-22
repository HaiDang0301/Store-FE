import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
const cx = classNames.bind(styles);
const baseUrl = "http://localhost:5050";
function HomeAdmin() {
  document.title = "Admin | Home Page";
  const [product, setProduct] = useState([]);
  const [sum, setSum] = useState();
  useEffect(() => {
    axios.get(baseUrl).then((res) => {
      setProduct(res.data);
    });
  }, []);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("total")}>
          <div className={cx("annual-revenue")}>
            <div className={cx("nav")}>
              <div className={cx("title")}>Annual Revenue</div>
              <div className={cx("number")}>
                <h1>$ 9999</h1>
              </div>
            </div>
          </div>
          <div className={cx("monthly-revenue")}>
            <div className={cx("nav")}>
              <div className={cx("title")}>Monthly Revenue</div>
              <div className={cx("number")}>
                <h1>$ 9999</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("header")}>
        <div className={cx("total")}>
          <div className={cx("number-available")}>
            <div className={cx("nav")}>
              <div className={cx("title")}>Number Available</div>
              <div className={cx("number")}>
                <h1>999</h1>
              </div>
            </div>
          </div>
          <div className={cx("quantity-sold")}>
            <div className={cx("nav")}>
              <div className={cx("title")}>Quantity Sold</div>
              <div className={cx("number")}>
                <h1>99</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomeAdmin;
