import className from "classnames/bind";
import styles from "./Payment.module.scss";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
const cx = className.bind(styles);
const UrlC = "https://provinces.open-api.vn/api/?depth=1";
function Payment() {
  let totalprice = 0;
  const [name, setName] = useState();
  const [telephone, setTelephone] = useState();
  const [city, setCity] = useState([]);
  const [selectCity, setSelectCity] = useState();
  const [code, setCode] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectdistricts, setSelectdistricts] = useState();
  const [codeD, setCodeD] = useState([]);
  const [wards, setWards] = useState([]);
  const [address, setAddress] = useState();
  const [selectward, setSelectward] = useState([]);
  const [total, setTotal] = useState();
  const navigate = useNavigate();
  const param = useParams();
  const id = JSON.parse(window.localStorage.getItem("id"));
  const UrlC = "https://provinces.open-api.vn/api/?depth=1";
  const UrlD = `https://provinces.open-api.vn/api/p/${code}?depth=2`;
  const UrlW = `https://provinces.open-api.vn/api/d/${codeD}?depth=2`;
  const UrlOrders = `http://localhost:5050/${param.id}/store`;
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  useEffect(() => {
    axios
      .get(UrlC)
      .then((res) => {
        setCity(res.data);
      })
      .catch("Không thể kết nối đến server");
  }, []);
  useEffect(() => {
    axios
      .get(UrlD)
      .then((res) => {
        setDistricts(res.data.districts);
      })
      .catch("Không thể kết nối đến server");
  }, [code]);
  useEffect(() => {
    axios
      .get(UrlW)
      .then((res) => {
        setWards(res.data.wards);
      })
      .catch("Không thể kết nối đến server");
  }, [codeD]);
  useEffect(() => {
    if (JSON.parse(window.localStorage.getItem("item"))) {
      const Item = JSON.parse(window.localStorage.getItem("item"));
      for (let i = 0; i < Item.length; i++) {
        totalprice += parseInt(Item[i].price.split(".").join(""));
      }
      setTotal(totalprice.toLocaleString());
    }
  }, []);
  function handleCity(e) {
    setSelectCity(e.target.value);
    setCode(e.target.value);
  }
  function handleDistricts(e) {
    setSelectdistricts(e.target.value);
    setCodeD(e.target.value);
  }
  function handleWards(e) {
    setSelectward(e.target.value);
  }
  function handleOrder(e) {
    e.preventDefault();
    if (JSON.parse(window.localStorage.getItem("item"))) {
      axios
        .post(UrlOrders, {
          id: param.id,
          name: name,
          telephone: telephone,
          city: selectCity,
          districts: selectdistricts,
          ward: selectward,
          address: address,
          cart: JSON.parse(window.localStorage.getItem("item")),
          total: total,
        })
        .then((res) => {
          if (res.data === "Đặt Hàng Thành Công") {
            localStorage.removeItem("item");
            // navigate(`/${id}/cart`);
            setTimeout(() => {
              window.location.reload();
            });
            toast.success("Đặt Hàng Thành Công", {
              position: "bottom-right",
            });
          }
        })
        .catch((err) => alert("Không thể kết nối đến server"));
    } else {
      toast.error("Bạn chưa có đơn hàng", {
        position: "bottom-right",
        autoClose: 5000,
      });
      navigate("/");
    }
  }
  return (
    <div className={cx("wrapper")}>
      <div className={cx("payment")}>
        <p>Thông Tin Khách Hàng</p>
        <div className={cx("main")}>
          <div className={cx("title")}>
            <p>Họ Tên</p>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
            <p>Số Điện Thoại</p>
            <input
              type="text"
              name="phone"
              id="phone"
              onChange={(e) => setTelephone(e.target.value)}
            />
            <p>Tỉnh / Thành Phố</p>
            <select name="city" onChange={handleCity}>
              <option value="default">Chọn Tỉnh / Thành Phố</option>
              {city.map((item, index) => (
                <option key={index} value={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
            <p>Quận / Huyện</p>
            <select name="districts" id="" onChange={handleDistricts}>
              <option value="">Chọn Quận / Huyện</option>
              {districts
                ? districts.map((item, index) => (
                    <option value={item.code} key={index}>
                      {item.name}
                    </option>
                  ))
                : null}
            </select>
            <p>Phường / Xã</p>
            <select name="districts" id="" onChange={handleWards}>
              <option value="">Chọn Phường / Xã</option>
              {wards
                ? wards.map((item, index) => (
                    <option value={item.code} key={index}>
                      {item.name}
                    </option>
                  ))
                : null}
            </select>
            <p>Địa Chỉ Nhà</p>
            <input
              type="text"
              name="address"
              id="address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className={cx("payments")}>
          <button className="btn btn-primary" onClick={handleOrder}>
            Mua Hàng
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payment;
