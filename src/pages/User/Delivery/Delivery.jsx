import classNames from "classnames/bind";
import styles from "./Delivery.module.scss";
import { useEffect } from "react";
import TitleHeader from "../../../layouts/layoutsUser/Heading/Title";
const cx = classNames.bind(styles);
function Delivery() {
  document.title = "Delivery";
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      <TitleHeader title="Delivery"></TitleHeader>
      <div className={cx("wrapper")}>
        <div className={cx("delivery")}>
          <div className={cx("paragraph")}>
            <div className={cx("title")}>
              <div className={cx("nav-title")}>
                <div className={cx("deliveried")}>
                  <div className={cx("image")}>
                    <img
                      src="https://giaohangtietkiem.vn/wp-content/uploads/2020/11/vn-01.png"
                      alt=""
                    />
                  </div>
                  <div className={cx("param")}>
                    <h3>PHỦ SÓNG 99% HUYỆN XÃ</h3>
                    <p>
                      Lấy hàng / Giao hàng trên 11.000 huyện xã trên toàn quốc
                    </p>
                  </div>
                </div>
                <div className={cx("deliveried")}>
                  <div className={cx("image")}>
                    <img
                      src="https://giaohangtietkiem.vn/wp-content/themes/giaohangtk/images/icon-05.png"
                      alt=""
                      style={{ width: "30%" }}
                    />
                  </div>
                  <div className={cx("param1")}>
                    <h3>GIAO NHANH KHÔNG KỊP HỦY</h3>
                    <p>Giao nội tỉnh 6-12h</p>
                    <p>Giao nội miền 24-36h</p>
                    <p>Giao liên miền 48h</p>
                  </div>
                </div>
                <div className={cx("deliveried")}>
                  <div className={cx("image")}>
                    <img
                      src="https://giaohangtietkiem.vn/wp-content/themes/giaohangtk/images/icon-07.png"
                      alt=""
                      style={{ width: "30%" }}
                    />
                  </div>
                  <div className={cx("param2")}>
                    <h3>GIAO HÀNG LINH HOẠT</h3>
                    <p>
                      Linh hoạt giao hàng cho khách chọn, đổi địa chỉ giao, đổi
                      tiền thu hộ, đổi SĐT, đổi người nhận hàng,…
                      <br />
                      Giao hàng nhanh không kịp hủy đơn ...
                    </p>
                  </div>
                </div>
                <div className={cx("deliveried")}>
                  <div className={cx("image")}>
                    <img
                      src="https://giaohangtietkiem.vn/wp-content/themes/giaohangtk/images/icon-03.png"
                      alt=""
                      style={{ width: "30%" }}
                    />
                  </div>
                  <div className={cx("param3")}>
                    <h3>MIỄN PHÍ GIAO HÀNG KHI ĐẶT NHIỀU SẢN PHẨM</h3>
                    <p>
                      Miễn phí giao hàng khi khách hàng đặt mua nhiều sản phẩm
                      ...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Delivery;
