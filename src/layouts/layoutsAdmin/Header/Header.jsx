import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
const cx = classNames.bind(styles);
import bell from "../../../../src/assets/bell.png";
import axios from "axios";
import email from "../../../assets/email.png";
import search from "../../../assets/search.png";
import { useEffect, useState } from "react";
function Header() {
  const navigate = useNavigate();
  const baseUrl = "http://localhost:5050/admin/products/stock";
  const [query, setQuery] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [stock, setStock] = useState(true);
  useEffect(() => {
    axios
      .get(baseUrl, {
        headers: {
          token: JSON.parse(window.localStorage.getItem("accessToken")),
        },
      })
      .then((res) => {
        setProducts(res.data);
      });
  }, []);
  function handleChange(e) {
    const newQuery = e.target.value;
    setQuery({
      search: newQuery,
    });
  }
  function handleSearch(e) {
    e.preventDefault();
  }
  function Logout() {
    localStorage.clear();
    navigate("/login");
  }
  function handleStock() {
    setStock(!stock);
  }
  if (!products.count)
    return (
      <div className={cx("header")}>
        <div className={cx("search")}>
          <div className={cx("image-search")}>
            <div className={cx("img")}>
              <img src={search} alt="" />
            </div>
          </div>
          <form onSubmit={handleSearch}>
            <input
              type="search"
              name="search"
              id="search"
              onChange={handleChange}
              placeholder="Search . . ."
            />
          </form>
        </div>
        <div className={cx("email")}>
          <div className={cx("img-email")}>
            <Link to="#">
              <img src={email} alt="" />
            </Link>
          </div>
        </div>
        <div className={cx("notification")}>
          <div className={cx("img-notification")}>
            <Link to={"#"} onClick={handleStock}>
              <img src={bell} alt="" />
            </Link>
            <span>0</span>
          </div>
        </div>

        <div className={cx("profile-admin")}>
          <Dropdown>
            <Dropdown.Toggle
              style={{ backgroundColor: "#1a1919", border: "none" }}
            >
              Hi Admin
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={Logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    );
  return (
    <div className={cx("header")}>
      <div className={cx("search")}>
        <div className={cx("image-search")}>
          <div className={cx("img")}>
            <img src={search} alt="" />
          </div>
        </div>
        <form onSubmit={handleSearch}>
          <input
            type="search"
            name="search"
            id="search"
            onChange={handleChange}
            placeholder="Search . . ."
          />
        </form>
      </div>
      <div className={cx("email")}>
        <div className={cx("img-email")}>
          <Link to="#">
            <img src={email} alt="" />
          </Link>
        </div>
      </div>
      <div className={cx("notification")}>
        <div className={cx("img-notification")}>
          <Link to={"#"} onClick={handleStock}>
            <img src={bell} alt="" />
          </Link>
          <span>{products.count}</span>
          <div className={cx(stock ? "none-stock" : "hide-stock")}>
            {products.products.map((item) => (
              <div key={item._id}>
                <div className={cx("wrapper")}>
                  <div className={cx("image")}>
                    <img src={item.image} alt="" />
                  </div>
                  <div className={cx("title")}>
                    <div>
                      <label>{item.name}</label>
                    </div>
                    <div>
                      <label>Số Lượng: {item.number}</label>
                      <br />
                      <label>
                        Tình trạng:{" "}
                        <label className={cx("status")}>{item.status}</label>{" "}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={cx("profile-admin")}>
        <Dropdown>
          <Dropdown.Toggle
            style={{ backgroundColor: "#1a1919", border: "none" }}
          >
            Hi Admin
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={Logout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}

export default Header;
