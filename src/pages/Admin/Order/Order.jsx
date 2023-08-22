import axios from "axios";
import className from "classnames/bind";
import {
  Link,
  useParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import styles from "./Order.module.scss";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ReactPaginate from "react-paginate";
const cx = className.bind(styles);
function Order() {
  const navigate = useNavigate();
  const param = useParams();
  const [search] = useSearchParams();
  const [page, setPage] = useState(true);
  const [orders, setOrders] = useState([]);
  const [update, setUpdate] = useState(true);
  const baseUrl = `http://localhost:5050/orders/${param.page}`;
  const Update = "http://localhost:5050/orders/status";
  const Delete = "http://localhost:5050/orders/delete";
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  useEffect(() => {
    axios
      .get(search.get("search") ? baseUrl + "?" + `${search}` : baseUrl, {
        headers: {
          token: JSON.parse(window.localStorage.getItem("accessToken")),
        },
      })
      .then((res) => {
        setOrders(res.data);
      });
  }, [update, page, search]);
  if (!orders.order) return null;
  function handlePage(e) {
    const newpage = e.selected + 1;
    if (search) {
      navigate(`/admin/order/page=${newpage}?${search}`);
    } else {
      navigate(`/admin/order/page=${newpage}`);
    }
    setPage(!page);
  }
  return (
    <div className={cx("wrapper")}>
      <div className={cx("main")}>
        <p>Danh Sách Đơn Hàng</p>
        <div className={cx("table-order")}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Mã Hóa Đơn</th>
                <th scope="col">Đơn Giá</th>
                <th scope="col">Ngày đặt hàng</th>
                <th scope="col">Trạng thái</th>
                <th scope="col">Cập Nhật</th>
                <th scope="col">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {orders.order.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item._id.slice(-5).toUpperCase()}</td>
                  <td>{item.totalprice}</td>
                  <td>{item.date.toString().slice(0, 10)}</td>
                  <td>{item.status}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      disabled={item.status === "Đang xử lý" ? false : true}
                      onClick={(e) => {
                        axios.put(
                          Update,
                          {
                            id: item._id,
                            status: "Đang giao hàng",
                          },
                          {
                            headers: {
                              token: JSON.parse(
                                window.localStorage.getItem("accessToken")
                              ),
                            },
                          }
                        );
                        setUpdate(!update);
                      }}
                    >
                      Giao Hàng
                    </button>
                    <button
                      disabled={item.status === "Đang giao hàng" ? false : true}
                      className="btn btn-primary"
                      onClick={(e) => {
                        axios.put(
                          Update,
                          {
                            id: item._id,
                            status: "Hoàn thành",
                          },
                          {
                            headers: {
                              token: JSON.parse(
                                window.localStorage.getItem("accessToken")
                              ),
                            },
                          }
                        );
                        setUpdate(!update);
                      }}
                    >
                      Đã Giao Hàng
                    </button>
                  </td>
                  <td>
                    <Link
                      to={`/admin/order/detail/${item._id}`}
                      className="btn btn-primary"
                    >
                      Xem
                    </Link>
                    <button
                      disabled={item.status === "Hoàn thành" ? false : true}
                      className="btn btn-primary"
                      onClick={(e) => {
                        axios
                          .delete(Delete, {
                            data: { id: item._id },
                            headers: {
                              token: JSON.parse(
                                window.localStorage.getItem("accessToken")
                              ),
                            },
                          })
                          .then((res) => {
                            if (res.data === "Xóa Thành Công") {
                              toast.success("Xóa Thành Công", {
                                position: "bottom-right",
                                autoClose: 5000,
                              });
                              setUpdate(!update);
                            }
                          })
                          .catch((err) => {
                            alert("Không thể kết nối đến server");
                          });
                      }}
                    >
                      Xóa
                    </button>
                    <ToastContainer></ToastContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={cx("page")}>
          <ReactPaginate
            nextLabel=">"
            onPageChange={handlePage}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={orders.pagecount || 1}
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
            initialPage={param.page.slice(5) - 1}
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </div>
  );
}

export default Order;
