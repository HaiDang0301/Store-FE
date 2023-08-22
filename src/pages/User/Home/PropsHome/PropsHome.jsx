import classNames from "classnames/bind";
import styles from "./Props.module.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const cx = classNames.bind(styles);
const baseURL = "http://localhost:5050/";
function ProductItems(props) {
  const [isLoading, setIsloading] = useState(false);
  const [product, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(baseURL)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        alert("Không Thể Kết Nối Đến Server");
      });
    setTimeout(() => {
      setIsloading(true);
    }, 2000);
  }, []);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("title-heading")}>
        <div className={cx("main")}>
          <div className={cx("title")}>{props.title}</div>
          <div className={cx("link")}>
            <Link to={props.link}>
              See all
              <img
                src="https://img.icons8.com/ios-glyphs/1x/arrow.png"
                alt=""
              />
            </Link>
          </div>
        </div>
        <div className={cx("product")}>
          <div className="row" style={{ width: "100%" }}>
            {isLoading ? (
              <>
                {product
                  .filter((c) => c.category === props.category)
                  .splice(0, 4)
                  .map((item) => (
                    <div
                      key={item._id}
                      className="col-12 col-sm-6 col-lg-3"
                      style={{ marginBottom: "30px" }}
                    >
                      <div className={cx("box")}>
                        <div className={cx("product-img")}>
                          <Link to={`/catalog/product/${item.slug}`}>
                            <img src={item.image} alt="" />
                          </Link>
                          <div className={cx("add-to-card")}>
                            <Link to={`/catalog/product/${item.slug}`}>
                              Add To Card
                            </Link>
                          </div>
                        </div>
                        <div className={cx("name")}>{item.name}</div>
                        <div className={cx("price")}>
                          {item.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
              </>
            ) : (
              <>
                {product
                  .filter((c) => c.category == props.category)
                  .map((item, index) => (
                    <div
                      key={index}
                      className="col-12 col-sm-6 col-lg-3"
                      style={{ marginBottom: "30px" }}
                    >
                      <div className={cx("box")}>
                        <div className={cx("product-img")}>
                          <div className={cx("loading")}>
                            <div className={cx("nav-loading")}>
                              <Link to="">
                                <img
                                  src="https://img.icons8.com/ios-filled/1x/spinner--v2.gif"
                                  alt=""
                                />
                              </Link>
                            </div>
                          </div>
                          <div className={cx("add-to-card")}>
                            <Link to="">Add To Card</Link>
                          </div>
                        </div>
                        <div className={cx("name")}>
                          <SkeletonTheme
                            baseColor="#202020"
                            highlightColor="#444"
                          >
                            <Skeleton count={1} width={"50%"}></Skeleton>
                          </SkeletonTheme>
                        </div>
                        <SkeletonTheme
                          baseColor="#202020"
                          highlightColor="#444"
                        >
                          <Skeleton count={1} width={"20%"}></Skeleton>
                        </SkeletonTheme>
                      </div>
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItems;
