import className from "classnames/bind";
import styles from "./OrderDetail.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const cx = className.bind(styles);
function OrderDetail() {
  var sum = 0;
  const id = useParams();
  const navigate = useNavigate();
  const array = [];
  const [money, setMoney] = useState();
  const [data, setData] = useState([]);
  const [city, setCity] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [ward, setWard] = useState([]);
  const baseUrl = `http://localhost:5050/${id.id}/orders/detail`;
  const UrlC = `https://provinces.open-api.vn/api/p/${data.city}?depth=2`;
  const UrlD = `https://provinces.open-api.vn/api/d/${data.districts}?depth=2`;
  const UrlW = `https://provinces.open-api.vn/api/w/${data.ward}?depth=2`;
  useEffect(() => {
    axios
      .get(baseUrl, {
        headers: { token: JSON.parse(localStorage.getItem("accessToken")) },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        alert("Không thể kết nối đến server");
      });
  }, []);
  useEffect(() => {
    if (data.city) {
      axios.get(UrlC).then((res) => {
        setCity(res.data);
      });
    }
    if (data.districts) {
      axios.get(UrlD).then((res) => {
        setDistricts(res.data);
      });
    }
    if (data.ward) {
      axios.get(UrlW).then((res) => {
        setWard(res.data);
      });
    }
  }, [data]);
  useEffect(() => {
    for (let i = 0; i < array.length; i++) {
      sum += array[i];
      setMoney(sum.toLocaleString());
    }
  });
  return (
    <div className={cx("wrapper")}>
      <div className={cx("main")}>
        <div>
          <p>Thông tin khách hàng</p>
          <div className={cx("info-customer")}>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Mã Hóa Đơn</th>
                  <th scope="col">Khách Hàng</th>
                  <th scope="col">Số Điện Thoại</th>
                  <th scope="col">Tỉnh/Thành Phố</th>
                  <th scope="col">Quận/Huyện</th>
                  <th scope="col">Phường/Xã</th>
                  <th scope="col">Địa chỉ nhà</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{id.id.slice(-5).toUpperCase()}</td>
                  <td>{data.fullname}</td>
                  <td>{data.phonenumber}</td>
                  <td>{city.name}</td>
                  <td>{districts.name}</td>
                  <td>{ward.name}</td>
                  <td>{data.address}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p>Sản phẩm đặt mua</p>
        <div className={cx("product-order")}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Tên Sản Phẩm</th>
                <th scope="col">Ảnh Minh Họa</th>
                <th scope="col">Số Lượng</th>
                <th scope="col">Tổng Giá</th>
              </tr>
            </thead>
            <tbody>
              {data.cart
                ? data.cart.map(
                    (item, index) =>
                      array.push(parseInt(item.price.split(".").join(""))) && (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>
                            <img src={item.image} alt="" />
                          </td>
                          <td>{item.quantity}</td>
                          <td>{item.price}</td>
                        </tr>
                      )
                  )
                : null}
            </tbody>
          </table>
        </div>
        <div className={cx("money")}>Thành Tiền: {money}</div>
        <br />
        <div className={cx("back")}>
          <button onClick={(e) => navigate(-1)} className="btn btn-primary">
            Quay Lại
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
