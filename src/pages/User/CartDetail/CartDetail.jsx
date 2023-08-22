import axios from "axios";
import className from "classnames/bind";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "./CartDetail.module.scss";
import { useEffect, useState } from "react";
const cx = className.bind(styles);
function CartDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const id = useParams();
  const [orders, setOrders] = useState([]);
  const baseUrl = `http://localhost:5050/${id.id}/orders/detail`;
  useEffect(() => {
    axios.get(baseUrl).then((res) => {
      setOrders(res.data);
    });
  }, []);
  if (!orders.cart) return null;
  return (
    <div>
      <div className={cx("wrapper")}>
        <div className={cx("main")}>
          <p>Chi Tiết Đơn Hàng {params.id.slice(-5).toUpperCase()}</p>
          <div className={cx("table-order")}>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {orders.cart.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>
                      <img src={item.image} alt="" />
                    </td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            className="btn btn-primary"
            onClick={(e) => {
              navigate(-1);
            }}
          >
            Quay Lại
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartDetail;
