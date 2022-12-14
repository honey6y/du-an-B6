import styles from "./Banner.module.scss";
import classNames from "classnames/bind";
import { Row, Col } from "antd";
import Carousel from "nuka-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faComment,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

function Banner() {
  const cx = classNames.bind(styles);
  return (
    <div className={cx("main-slider")}>
      <div className={cx("wrapper")}>
        <Row gutter={5}>
          <Col md={24} lg={16} xl={16}>
            <div className={cx("banner")}>
              <Carousel 
                  defaultControlsConfig={{
                  }}
                  wrapAround={true} 
                  slidesToShow={1} 
                  dragThreshold={0.1} 
                  autoplay={true}
                  renderCenterLeftControls={({ previousDisabled, previousSlide }) => (
                    <button className={cx('btn-control-arrow')} onClick={previousSlide} disabled={previousDisabled}>
                        <LeftOutlined />
                    </button>
                  )}
                  renderCenterRightControls={({ nextDisabled, nextSlide }) => (
                    <button className={cx('btn-control-arrow')} onClick={nextSlide} disabled={nextDisabled}>
                        <RightOutlined />
                    </button>
                  )}
                >
                <div>
                  <img
                    src="https://theme.hstatic.net/1000205427/1000509844/14/ms_banner_img7.jpg?v=56"
                    alt=""
                    width="100%"
                  />
                </div>
                <div>
                  <img
                    src="https://theme.hstatic.net/1000205427/1000509844/14/ms_banner_img5.jpg?v=56"
                    alt=""
                    width="100%"
                  />
                </div>
                <div>
                  <img
                    src="https://theme.hstatic.net/1000205427/1000509844/14/ms_banner_img4.jpg?v=56"
                    alt=""
                    width="100%"
                  />
                </div>
                <div>
                  <img
                    src="https://theme.hstatic.net/1000205427/1000509844/14/ms_banner_img6.jpg?v=56"
                    alt=""
                    width="100%"
                  />
                </div>
                <div>
                  <img
                    src="https://theme.hstatic.net/1000205427/1000509844/14/ms_banner_img1.jpg?v=56"
                    alt=""
                    width="100%"
                  />
                </div>
              </Carousel>
              <div className={cx("banner-des")}>
                        <div className={cx("banner-des-content")} >
                          Mua tai nghe abcd t???ng <br></br>loa anker 400
                        </div>
                        <div className={cx("banner-des-content")} >
                          Tai nghe Partron bhb400 <br></br> gi???m 65%
                        </div>
                        <div className={cx("banner-des-content")} >
                          K???p s???c ko d??y <br></br> gi???m 50%
                        </div>
                        <div className={cx("banner-des-content")} >
                          Nhi???t k?? th??ng minh <br></br>gi???m 60%
                        </div>
                        <div className={cx("banner-des-content")} >
                          T???u s???c Anodit <br></br> gi???m 60%
                        </div>
                    </div>
            </div>
          </Col>
          <Col md={24} lg={8} xl={8}>
            <div className={cx("aside-banner")}>
              <div className={cx("news-title-box")}>
                <h3 className={cx("news-title")}>Tin c??ng ngh???</h3>
                <div className={cx("ads")}>
                  <p className={cx("ads-content")}>
                    Ch??o m???ng b???n ?????n v???i Ph??? Ki???n Hay. N???u b???n c???n gi??p ????? h??y
                    li??n h??? v???i ch??ng t??i qua Hotline: (+84) 888 136 633 ho???c
                    Email: phukienhay.vn@gmail.vn
                  </p>
                </div>
              </div>
              <div className={cx("shortnew-box")}>
                <div className={cx("img-box-news")}>
                  <img
                    src="https://file.hstatic.net/1000205427/article/-o-muc-gia-1-5-trieu-dong-fexsx-1_9e1b155a9cff4b669f70c475b2b4aa43_7bac355ba9b940df94670bcb872579c8_large.jpg"
                    alt=""
                    width="100%"
                  />
                </div>
                <div className={cx("shortnew-content-box")}>
                  <div>
                    Partron PBH-400 ??? Chi???c tai nghe ho??n h???o d??nh cho Iphone
                    Xs, Xs Max ??? m???c gi?? 1.5 tri???u ?????ng
                  </div>
                  <div className={cx("shortnews-icons")}>
                    <div className={cx("article-icons")}>
                      <FontAwesomeIcon icon={faCalendarDays}></FontAwesomeIcon>
                      <span> 22/10/20</span>
                    </div>
                    <div className={cx("article-icons")}>
                      <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                      <span>Admin Tony</span>
                    </div>
                    <div className={cx("article-icons")}>
                      <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>
                      <span> 0</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={cx("shortnew-box")}>
                <div className={cx("img-box-news")}>
                  <img
                    src="//file.hstatic.net/1000205427/article/1671219_99c9eeab05d045e4b1333bcd7e9e1ee4_0567851ac181458f9b2ba1e72ee144e5_large.jpg"
                    alt=""
                    width="100%"
                  />
                </div>
                <div className={cx("shortnew-content-box")}>
                  <div>
                    TR??N TAY NHI???T K??? ??I???N T??? G???N ??I???N THO???I CROISE.A PTD-100:
                    NH??? G???N, ??O ????? NHANH V?? ??A N??NG
                  </div>
                  <div className={cx("shortnews-icons")}>
                    <div className={cx("article-date")}>
                      <FontAwesomeIcon icon={faCalendarDays}></FontAwesomeIcon>
                      <span> 09/06/20</span>
                    </div>
                    <div className={cx("article-author")}>
                      <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                      <span>Admin Tony</span>
                    </div>
                    <div className={cx("article-comments")}>
                      <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>
                      <span> 0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("aside-banner")}>
              <div>
                <img
                  src="//theme.hstatic.net/1000205427/1000509844/14/smallbanner_img1.jpg?v=56"
                  alt=""
                  width="100%"
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Banner;
