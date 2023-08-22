import classnames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";
import Items from "../Items/Items";
const cx = classnames.bind(styles);
function Footer() {
  return (
    <footer className={cx("wrapper")}>
      <div className={cx("colation")}>
        <div className={cx("photo-grappher")}>
          <img
            style={{ width: "100%" }}
            src="https://assets.website-files.com/5badda2935e11303a89a461e/5baf3d57ace69c149bb331b8_tim-gouw-165547-unsplash.jpg"
            alt=""
          />
        </div>
        <div className={cx("children")}>
          <div className={cx("nav-children")}>
            <div className={cx("nav-title")}>
              <nav>
                <h2>Available for FREE!</h2>
                <p>
                  You can find friendly, safe toys for young children, you can
                  view product information before deciding to buy products from
                  us.
                </p>
              </nav>
            </div>
            <div className={cx("nav-image")}>
              <img
                src="https://assets.website-files.com/5badda2935e11303a89a461e/5bb5c77ee73150e2021b0db4_side-image-01-p-1080.jpeg"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className={cx("main-subscribe")}>
          <div className={cx("subscribe")}>
            <div className={cx("main")}>
              <div className={cx("main-mobile")}>
                <div className={cx("logo")}>
                  <div className={cx("telegram")}>
                    <img
                      src="https://assets.website-files.com/5badda2935e11303a89a461e/5baf56dcace69cfd39b34f7a_paperplane-icon-white.svg"
                      alt=""
                    />
                  </div>
                </div>
                <div className={cx("title")}>
                  <label htmlFor="">
                    Add email to receive notifications to get 10% discount !
                  </label>
                </div>
                <div className={cx("input")}>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Your Email Address"
                  />
                  <div className={cx("button")}>
                    <Link to="">Subscribe</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("elastic")}>
          <div className={cx("info")}>
            <div className={cx("title-insta")}>
              <div className={cx("themes")}>
                <label htmlFor="">@ElasticThemes</label>
                <h3>We're on Instagram!</h3>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("prevew-image")}>
          <div className={cx("photo")}>
            <div className="row">
              <div className="col-12 col-sm-4 col-lg-2">
                <Link to="">
                  <img
                    src="https://assets.website-files.com/5badda2935e11303a89a461e/5badecf79395558fbeb88a49_instagram-01.jpg"
                    alt=""
                  />
                </Link>
              </div>
              <div className="col-12 col-sm-4 col-lg-2">
                <Link to="">
                  <img
                    src="https://assets.website-files.com/5badda2935e11303a89a461e/5badecf735e113f8679a57e6_instagram-02.jpg"
                    alt=""
                  />
                </Link>
              </div>
              <div className="col-12 col-sm-4 col-lg-2">
                <Link to="">
                  <img
                    src="https://assets.website-files.com/5badda2935e11303a89a461e/5badecf735e11327b99a57e7_instagram-03.jpg"
                    alt=""
                  />
                </Link>
              </div>
              <div className="col-12 col-sm-4 col-lg-2">
                <Link to="">
                  <img
                    src="https://assets.website-files.com/5badda2935e11303a89a461e/5badecf7939555df08b88a48_instagram-04.jpg"
                    alt=""
                  />
                </Link>
              </div>
              <div className="col-12 col-sm-4 col-lg-2">
                <Link to="">
                  <img
                    src="https://assets.website-files.com/5badda2935e11303a89a461e/5badecf7939555514eb88a4a_instagram-05.jpg"
                    alt=""
                  />
                </Link>
              </div>
              <div className="col-12 col-sm-4 col-lg-2">
                <Link to="">
                  <img
                    src="https://assets.website-files.com/5badda2935e11303a89a461e/5badecf71f2da2228d17155f_instagram-06.jpg"
                    alt=""
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("mores-photo")}>
          <div className={cx("see")}>
            <Link to="">See Mores Photo</Link>
          </div>
        </div>
        <div className={cx("bottom")}>
          <div className={cx("nav-bottom")}>
            <div className={cx("nav-nav")}>
              <div className={cx("nav-bottom-children")}>
                <div className={cx("footer-bottom")}>
                  <h4>Store</h4>
                  <div className={cx("nav-mobile")}>
                    <div className={cx("title-footer")}>
                      <label htmlFor="">Home</label>
                      <label htmlFor="">Catalog</label>
                      <label htmlFor="">Delivery</label>
                      <label htmlFor="">About</label>
                      <label htmlFor="">Contacts</label>
                    </div>
                    <div className={cx("social")}>
                      <Items
                        items={[
                          {
                            img: "https://assets.website-files.com/5badda2935e11303a89a461e/5bae5eec5227792568635e37_twitter-icon-white.svg",
                            link: "/",
                          },
                          {
                            img: "https://assets.website-files.com/5badda2935e11303a89a461e/5bae5eec3cb36463d4cf4661_facebook-icon-white.svg",
                            link: "/",
                          },
                          {
                            img: "https://assets.website-files.com/5badda2935e11303a89a461e/5bae5eec7fe624275552217c_instagram-icon-white.svg",
                            link: "/",
                          },
                          {
                            img: "https://assets.website-files.com/5badda2935e11303a89a461e/5bae5eec6e93377c0bbdba8a_pinterest-icon-white.svg",
                            link: "/",
                          },
                          {
                            img: "https://assets.website-files.com/5badda2935e11303a89a461e/5bae5eecfff242b7c309e311_youtube-icon.svg",
                            link: "/",
                          },
                        ]}
                      ></Items>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("nav-bottom-children1")}>
              <div className={cx("bottom-footer")}>
                <p>Created with love by Hai Dang</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
