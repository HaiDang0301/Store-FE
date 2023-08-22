import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import {
  Link,
  useParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
const cx = classNames.bind(styles);
const baseUrl = "http://localhost:5050/products/catalog/";
function Product() {
  const navigate = useNavigate();
  document.title = "Admin | Product";
  const params = useParams();
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [page, setPage] = useState(false);
  const [search] = useSearchParams();
  const Api = search.get("search")
    ? baseUrl + params.page + "?" + search
    : baseUrl + params.page;
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  useEffect(() => {
    axios
      .get(Api, {
        headers: {
          token: JSON.parse(window.localStorage.getItem("accessToken")),
        },
      })
      .then((res) => {
        if (res.data === "No Page") {
          toast.error("No product page", {
            position: "bottom-right",
            autoClose: 5000,
          });
        } else {
          setData(res.data);
        }
      });
  }, [page, search]);
  function handleClose() {
    setId(""), setShow(false);
  }
  function handlePage(e) {
    const newPage = e.selected + 1;
    navigate(
      search.get("name")
        ? `/admin/products/catalog/page=${newPage}/?${search}`
        : `/admin/products/catalog/page=${newPage}`
    );
    setPage(!page);
  }
  if (!data.products)
    return (
      <div className={cx("create")}>
        <Link to="/admin/product/create">Create Product</Link>
      </div>
    );
  return (
    <div className={cx("wrapper")}>
      <div className={cx("create")}>
        <Link to="/admin/product/create">Create Product</Link>
      </div>
      <div className={cx("message")}>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <p className="text text-danger">Notification</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>You are sure to delete</Modal.Body>
          <Modal.Footer>
            <Link to={`/admin/product/${id}/delete`} className="btn btn-danger">
              Delete
            </Link>
            <ToastContainer></ToastContainer>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Brand</th>
            <th scope="col">Category</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        {data.products.map((item, index) => (
          <tbody key={item._id}>
            <tr>
              <th scope="row">{index + 1}</th>
              <td>
                <img src={item.image} alt="" />
              </td>
              <td>{item.name}</td>
              <td>{item.brand}</td>
              <td>{item.category}</td>
              <td>{item.number}</td>
              <td>{item.price.toLocaleString()}</td>
              <td>
                <Link
                  className={cx("update")}
                  to={`/admin/product/${item._id}/edit`}
                >
                  <img src="https://img.icons8.com/arcade/1x/edit.png" alt="" />
                </Link>
                <Link
                  className={cx("delete")}
                  onClick={(e) => {
                    setId(item._id);
                    setShow(true);
                  }}
                >
                  <img
                    src="https://img.icons8.com/arcade/1x/filled-trash.png"
                    alt=""
                  />
                </Link>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      <div className={cx("page")}>
        <ReactPaginate
          nextLabel=">"
          onPageChange={handlePage}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
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
  );
}

export default Product;
