import axios from "axios";
import className from "classnames/bind";
import { Link, useParams } from "react-router-dom";
import styles from "./Cart.module.scss";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
const cx = className.bind(styles);
function Cart() {
  var sum = 0;
  const id = useParams();
  const [orders, setOrders] = useState([]);
  const baseUrl = `http://localhost:5050/${id.id}/orders`;
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  useEffect(() => {
    axios.get(baseUrl).then((res) => {
      setOrders(res.data);
    });
  }, []);
  if (!orders) return null;
  return (
    <div className={cx("wrapper")}>
      <div className={cx("main")}>
        <p>Đơn hàng của bạn</p>
        <div className={cx("table-order")}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Mã Hóa Đơn</th>
                <th scope="col">Đơn Giá</th>
                <th scope="col">Ngày đặt hàng</th>
                <th scope="col">Trạng thái đơn hàng</th>
                <th scope="col">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item._id.slice(-5).toUpperCase()}</td>
                  <td>{item.totalprice}</td>
                  <td>{item.date.toString().slice(0, 10)}</td>
                  <td>{item.status}</td>
                  <td>
                    <Link to={`/${item._id}/detail`}>Xem Đơn Hàng</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Cart;
