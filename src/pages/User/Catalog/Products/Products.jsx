import classNames from "classnames/bind";
import styles from "./Products.module.scss";
import {
  Link,
  useParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
const cx = classNames.bind(styles);
const baseURL = "http://localhost:5050/products";
function Products() {
  const params = useParams();
  const [isLoading, setIsloading] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useSearchParams();
  const [status, setStatus] = useState(false);
  const [statusButton, setStatusButton] = useState(true);
  const navigate = useNavigate();
  const category = params.category + "/" + params.page;
  const sort = params.sort;
  const Api = search.get("search")
    ? baseURL + "/" + category + "/" + sort + "/?" + search
    : baseURL + "/" + category + "/" + sort;
  useEffect(() => {
    axios
      .get(Api)
      .then((res) => {
        if (res.data === "No Products") {
          toast.error("No Products", {
            position: "bottom-right",
            autoClose: 5000,
          });
        } else {
          setData(res.data);
        }
      })
      .catch((err) => {
        alert("Không Thể Kết Nối Đến Server");
      });
    setTimeout(() => {
      setIsloading(true);
    }, 200);
  }, [status, params.sort]);
  function handlePage(e) {
    setStatus(!status);
    const newPage = e.selected + 1;
    if (!sort) {
      navigate(
        search.get("search")
          ? `/${params.category}/page=${newPage}?${search}`
          : `/${params.category}/page=${newPage}`
      );
    } else {
      navigate(
        search.get("search")
          ? `/${params.category}/page=${newPage}/${sort}?${search}`
          : `/${params.category}/page=${newPage}/${sort}`
      );
    }
    window.scrollTo({ top: 400, behavior: "smooth" });
  }
  function handleChange(e) {
    const newQuery = e.target.value;
    setSearch({
      search: newQuery,
    });
    setStatusButton(false);
  }
  function handleSearch(e) {
    e.preventDefault();
    navigate(`/${params.category + "/page=1" + "?" + search}`);
    setStatus(!status);
    setStatusButton(true);
  }
  function handleSort(e) {
    const sort = e.target.value;
    console.log(sort);
    navigate(`/${params.category + "/" + params.page + "/" + sort}`);
  }
  if (!data.products) return null;
  return (
    <div className={cx("wrapper")}>
      <div className={cx("title-heading")}>
        <div className={cx("main-search")}>
          <div className={cx("nav-main")}>
            <div className={cx("search")}>
              <form>
                <input
                  type="search"
                  name="search"
                  id="search"
                  onChange={handleChange}
                  placeholder="Enter your name products"
                />
                <div className={cx("btn-search")}>
                  <button
                    onClick={handleSearch}
                    type="submit"
                    disabled={statusButton}
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
            <div className={cx("sort")}>
              <div className={cx("quick-sort")}>Sort</div>
              <div className={cx("select")}>
                <select onChange={handleSort}>
                  <option value="Default">Sort Default</option>
                  <option value="New">New Products</option>
                  <option value="Increase">Price from low to high</option>
                  <option value="Reduce">Price from high to low</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("title-category")}>
          <nav className={cx("title-name")}>
            <div className={cx("title")}>
              <h4 htmlFor="">
                {params.category === "catalog" ? "All Toys" : params.category}
              </h4>
            </div>
            <div className={cx("category")}>
              <div className={cx("all-toys")}>
                <Link to="/catalog/page=1" onClick={(e) => setStatus(!status)}>
                  All toys
                </Link>
              </div>
              <div className={cx("wooden-toy")}>
                <Link
                  to="/Wooden-Toys/page=1"
                  onClick={(e) => setStatus(!status)}
                >
                  Wooden Toys
                </Link>
              </div>
              <div className={cx("stuffed-animals")}>
                <Link
                  to="/Stuffed-Animals/page=1"
                  onClick={(e) => setStatus(!status)}
                >
                  Stuffed Animals
                </Link>
              </div>
            </div>
          </nav>
        </div>
        <div className={cx("product")}>
          <div className="row" style={{ width: "100%" }}>
            {isLoading ? (
              <>
                {data.products.map((item) => (
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
                {data.products.map((item, index) => (
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
                      <SkeletonTheme baseColor="#202020" highlightColor="#444">
                        <Skeleton count={1} width={"20%"}></Skeleton>
                      </SkeletonTheme>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        <div className={cx("page")}>
          <ReactPaginate
            nextLabel=">"
            onPageChange={handlePage}
            pageCount={data.totalPage || 1}
            previousLabel="<"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            initialPage={params.page.slice(5) - 1}
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </div>
  );
}

export default Products;
