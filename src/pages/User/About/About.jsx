import classNames from "classnames/bind";
import styles from "./About.module.scss";
import { useEffect } from "react";
import TitleHeader from "../../../layouts/layoutsUser/Heading/Title";
const cx = classNames.bind(styles);
function About() {
  document.title = "Information";
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div>
      <TitleHeader title="About"></TitleHeader>
      <div className={cx("wrapper")}>
        <div className={cx("about")}>
          <div className={cx("main")}>
            <div className={cx("about-top")}>
              <div className={cx("nav-about")}>
                <div className={cx("title")}>
                  <label>
                    Chúng tôi tin rằng dịch vụ này hữu ích cho xã hội nói
                    chung... Người bán hàng bán được nhiều hơn, khách hàng mua
                    sắm thoải mái hơn, và người giao hàng có thêm nhiều công
                    việc và thu nhập xứng đáng.
                  </label>
                  <label>Gmail liên hệ : dinhhaidang1003@gmail.com</label>
                  <p>
                    Facebook:{" "}
                    <a
                      href="https://www.facebook.com/profile.php?id=100023095460530"
                      target="_blank"
                    >
                      Chuyển đến trang liên hệ
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className={cx("image")}>
              <div className={cx("img")}>
                <img
                  src="https://assets.website-files.com/5badda2935e11303a89a461e/5bb5c77fe7ca6c69b821cffc_about-image-p-1600.jpeg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
