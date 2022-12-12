import { LikeOutlined } from "@ant-design/icons";
import {
    DownOutlined,
    MinusOutlined,
    PlusOutlined,
    UpOutlined,
} from "@ant-design/icons/lib/icons";
import axios from "axios";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./SelectProduct.module.scss";

const cx = classNames.bind(styles);

function SelectProduct() {
    let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzkzZWJhNmZjYTM3MmRiMzhiNTFiYTEiLCJ1c2VybmFtZSI6ImNodWJlYnUxIiwiZW1haWwiOiJjaHViZWJ1MUBnbWFpbC5jb20iLCJhdmF0YXIiOiJodHRwczovL21lZGlhLmlzdG9ja3Bob3RvLmNvbS9waG90b3MvYnVzaW5lc3NtYW4tc2lsaG91ZXR0ZS1hcy1hdmF0YXItb3ItZGVmYXVsdC1wcm9maWxlLXBpY3R1cmUtcGljdHVyZS1pZDQ3NjA4NTE5OD9rPTIwJm09NDc2MDg1MTk4JnM9NjEyeDYxMiZ3PTAmaD04SjNWZ09aYWJfT2lZb0l1WmZpTUl2dWNGWUI4dldZbEtuU2pLdUtlWVFNPSIsInJvbGUiOiJ1c2VyIiwiY3JlYXRlZEF0IjoiMjAyMi0xMi0xMFQwMjoxNTowMi4zNDFaIiwidXBkYXRlZEF0IjoiMjAyMi0xMi0xMFQwMjoxNTowMi4zNDFaIiwiX192IjowLCJpYXQiOjE2NzA2NDQ5MDJ9.3db6SHeI8YCaQajK0-Z7_17MovvjUu_Th7iCLi-7E7E`;
    let { idProduct } = useParams();
    const [productDetail, setProductDetail] = useState({});
    const [imgCurrent, setImgCurrent] = useState(``);
    const imgThumbUl = useRef();
    const [marginListThumb, setMarginListThumb] = useState(0);
    const thumbControlBtn = useRef();
    const imgCurrentView = useRef();
    const imgCurrentViewLensZoom = useRef();
    const productThumbZoom = useRef();
    useEffect(() => {
        axios({
            url: `https://shope-b3.thaihm.site/api/product/get-one-product/${idProduct}`,
            method: "GET",
            headers: {
                authorization: token,
            },
        })
            .then((res) => {
                // console.log(res);
                let totalProduct = res.data.product;
                let totalImg = totalProduct.listDtail.reduce((total, item) => {
                    return (total += item.listImg.length);
                }, 0);
                if (totalImg >= 5) {
                    thumbControlBtn.current.className = cx(
                        "list-img-thumb-control"
                    );
                } else {
                    thumbControlBtn.current.className = cx(
                        "list-img-thumb-control",
                        "display-none"
                    );
                }
                setProductDetail(totalProduct);
            })
            .catch((err) => {
                // console.log(err)
            });
        imgCurrentViewLensZoom.current.addEventListener(
            "wheel",
            function (event) {
                // some logic
                event.preventDefault(); // <-- that should not be used in passive
                // some other magic
                scaleLens(event);
            }
        );
    }, []);

    function setImgCurrentSrc(e) {
        document
            .querySelectorAll(`.${cx("list-img-thumb-item")}`)
            .forEach((item) => {
                item.className = cx("list-img-thumb-item");
            });
        e.currentTarget.className = cx("list-img-thumb-item", "img-active");
        setImgCurrent(e.target.src);
    }

    function downListImgThumb() {
        let changeMarginListThumb = marginListThumb - 100;
        if (changeMarginListThumb < 495 - imgThumbUl.current.offsetHeight) {
            changeMarginListThumb = 495 - imgThumbUl.current.offsetHeight;
        } else {
            setMarginListThumb((old) => old - 100);
        }
        imgThumbUl.current.style.marginTop = `${changeMarginListThumb}px`;
        // console.log(imgThumbUl.current.style.marginTop);
    }
    function upListImgThumb() {
        let changeMarginListThumb = marginListThumb + 100;
        // console.log(imgThumbUl.current.style.marginTop);
        if (changeMarginListThumb > 0) {
            changeMarginListThumb = 0;
        } else {
            setMarginListThumb((old) => old + 100);
        }
        imgThumbUl.current.style.marginTop = `${changeMarginListThumb}px`;
    }

    function getCursorPos(e) {
        var a,
            x = 0,
            y = 0;
        e = e || window.event;
        // console.log(e);
        /* Get the x and y positions of the image: */
        a = imgCurrentView.current.getBoundingClientRect();
        /* Calculate the cursor's x and y coordinates, relative to the image: */
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /* Consider any page scrolling: */
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
    }

    function scaleLens(e) {
        // e.preventDefault();
        productThumbZoom.current.className = cx("product-thumb-zoom");
        imgCurrentViewLensZoom.current.className = cx(
            "img-current-view-lens-zoom"
        );
        // productThumbZoom.current.classList.remove(cx("display"));
        // imgCurrentViewLensZoom.current.classList.remove(cx("display"));

        productThumbZoom.current.style.backgroundImage =
            "url('" + imgCurrentView.current.src + "')";
        let deltaY = e.deltaY;
        // console.log(deltaY);
        let lensWidth = imgCurrentViewLensZoom.current.offsetWidth;
        let lensHeight = imgCurrentViewLensZoom.current.offsetHeight;
        if (deltaY > 0) {
            if (lensWidth < imgCurrentView.current.offsetWidth - 10) {
                lensWidth += 10;
            } else {
                lensWidth = imgCurrentView.current.offsetWidth;
            }

            if (lensHeight < imgCurrentView.current.offsetHeight - 10) {
                lensHeight += 10;
            } else {
                lensHeight = imgCurrentView.current.offsetHeight;
            }
        } else if (deltaY < 0) {
            if (lensWidth <= 20) {
                lensWidth = 20;
            } else {
                lensWidth -= 10;
            }

            if (lensHeight <= 20) {
                lensHeight = 20;
            } else {
                lensHeight -= 10;
            }
        }
        imgCurrentViewLensZoom.current.style.width = lensWidth + "px";
        imgCurrentViewLensZoom.current.style.height = lensHeight + "px";

        let scaleX =
            productThumbZoom.current.offsetWidth /
            imgCurrentViewLensZoom.current.offsetWidth;
        let scaleY =
            productThumbZoom.current.offsetHeight /
            imgCurrentViewLensZoom.current.offsetHeight;
        var pos, x, y;
        pos = getCursorPos(e);
        x = pos.x - imgCurrentViewLensZoom.current.offsetWidth / 2;
        y = pos.y - imgCurrentViewLensZoom.current.offsetHeight / 2;
        if (
            x >
            imgCurrentView.current.width -
                imgCurrentViewLensZoom.current.offsetWidth
        ) {
            x =
                imgCurrentView.current.width -
                imgCurrentViewLensZoom.current.offsetWidth;
        }
        if (x < 0) {
            x = 0;
        }
        if (
            y >
            imgCurrentView.current.height -
                imgCurrentViewLensZoom.current.offsetHeight
        ) {
            y =
                imgCurrentView.current.height -
                imgCurrentViewLensZoom.current.offsetHeight;
        }
        if (y < 0) {
            y = 0;
        }
        imgCurrentViewLensZoom.current.style.left = x + "px";
        imgCurrentViewLensZoom.current.style.top = y + "px";
        if (scaleX <= scaleY) {
            productThumbZoom.current.style.backgroundSize =
                imgCurrentView.current.width * scaleX +
                "px " +
                imgCurrentView.current.height * scaleX +
                "px";
        } else {
            productThumbZoom.current.style.backgroundSize =
                imgCurrentView.current.width * scaleY +
                "px " +
                imgCurrentView.current.height * scaleY +
                "px";
        }
        if (scaleX <= scaleY) {
            productThumbZoom.current.style.backgroundPosition =
                "-" + x * scaleX + "px -" + y * scaleX + "px";
        } else {
            productThumbZoom.current.style.backgroundPosition =
                "-" + x * scaleY + "px -" + y * scaleY + "px";
        }
    }

    function hideThumbZoomAndLens(e) {
        e.preventDefault();
        productThumbZoom.current.className = cx(
            "product-thumb-zoom",
            "display-none"
        );
        imgCurrentViewLensZoom.current.className = cx(
            "img-current-view-lens-zoom",
            "display-none"
        );
    }

    return (
        <div className={cx("wrapper")}>
            <div className={cx("product-detail-inner")}>
                <div className={cx("product-preview")}>
                    <div className={cx("list-img-thumbnail")}>
                        <ul
                            ref={imgThumbUl}
                            className={cx("list-img-thumb-ul")}
                        >
                            <li
                                className={cx(
                                    "list-img-thumb-item",
                                    "img-active"
                                )}
                                onClick={setImgCurrentSrc}
                            >
                                <img
                                    src={`https://shope-b3.thaihm.site/${productDetail.thumbnail}`}
                                    alt=""
                                    width="100%"
                                />
                            </li>

                            {productDetail.listDtail
                                ? productDetail.listDtail.map((item) => {
                                      return item.listImg.map(
                                          (imgItem, indexImg) => (
                                              <li
                                                  key={`${item._id}${indexImg}`}
                                                  className={cx(
                                                      "list-img-thumb-item"
                                                  )}
                                                  onClick={setImgCurrentSrc}
                                              >
                                                  <img
                                                      src={`https://shope-b3.thaihm.site/${imgItem}`}
                                                      alt=""
                                                      width="100%"
                                                  />
                                              </li>
                                          )
                                      );
                                  })
                                : null}
                            {/* {productDetail.listDtail
                                ? productDetail.listDtail.map(
                                      (item, indexItem) => {
                                          return item.listImg.map(
                                              (imgItem, indexImg) => (
                                                  <li
                                                      key={`${item._id}${indexImg}`}
                                                      className={cx(
                                                          "list-img-thumb-item"
                                                      )}
                                                      onClick={setImgCurrentSrc}
                                                  >
                                                      <img
                                                          src={`https://shope-b3.thaihm.site/${imgItem}`}
                                                          alt=""
                                                          width="100%"
                                                      />
                                                  </li>
                                              )
                                          );
                                      }
                                  )
                                : null} */}
                        </ul>
                        <div
                            ref={thumbControlBtn}
                            className={cx(
                                "list-img-thumb-control",
                                "display-none"
                            )}
                        >
                            <button
                                className={cx("list-img-thumb-control-up")}
                                onClick={upListImgThumb}
                            >
                                <UpOutlined />
                            </button>
                            <button
                                className={cx("list-img-thumb-control-down")}
                                onClick={downListImgThumb}
                            >
                                <DownOutlined />
                            </button>
                        </div>
                    </div>
                    <div className={cx("img-current-view-container")}>
                        <div
                            onMouseMove={scaleLens}
                            onMouseLeave={hideThumbZoomAndLens}
                            className={cx(
                                "img-current-view-lens-zoom",
                                "display-none"
                            )}
                            ref={imgCurrentViewLensZoom}
                        ></div>
                        <img
                            onMouseMove={scaleLens}
                            // onMouseLeave={hideThumbZoomAndLens}
                            ref={imgCurrentView}
                            className={cx("img-current-view")}
                            src={
                                imgCurrent ||
                                `https://shope-b3.thaihm.site/${productDetail.thumbnail}`
                            }
                            alt=""
                        />
                    </div>
                </div>
                <div
                    className={cx("product-thumb-zoom", "display-none")}
                    ref={productThumbZoom}
                ></div>
                <div className={cx("product-info")}>
                    <div className={cx("product-info-header")}>
                        <h1>
                            Ốp Lưng Anker Karapax Breeze cho iPhone 7 Plus/ 8
                            Plus - A9015
                        </h1>
                        <div className={cx("product-brand")}>
                            <span>Thương hiệu: </span>
                            <Link className={cx("product-brand-link")}>
                                khác
                            </Link>
                        </div>
                        <span>|</span>
                    </div>
                    <div className={cx("product-info-price")}>
                        <span>299,000&#8363;</span>
                    </div>
                    <div className={cx("product-info-sort-desc")}>
                        <ul>
                            <li>Dung lượng pin: 3000mAh (Lithium-ion)</li>
                            <li>Thiết kế đẹp mắt, di chuyển tiện lợi</li>
                            <li>Chất âm trầm sâu lắng, âm bass nhẹ nhàng</li>
                            <li>Công nghệ Bluetooth: 4.2</li>
                            <li>Hỗ trợ jack cắm 3.5mm với mọi thiết bị</li>
                            <li>Âm tần mạnh mẽ từ 50Hz - 20000Hz</li>
                            <li>
                                Kết nối không dây hơn 100 loa qua chức năng HK
                                Connect
                            </li>
                        </ul>
                    </div>
                    <strong>
                        <form action="">
                            <div
                                className={cx("product-info-variants-wrapper")}
                            >
                                <div className={cx("product-select-watch")}>
                                    <div
                                        className={cx(
                                            "product-select-watch-header"
                                        )}
                                    >
                                        Màu sắc
                                    </div>
                                    <div
                                        className={cx(
                                            "product-select-watch-wrapper"
                                        )}
                                    >
                                        <div
                                            className={cx(
                                                "product-select-watch-item",
                                                "xam"
                                            )}
                                        >
                                            <img
                                                src="https://shope-b3.thaihm.site/publics/uploads/productDetails/thumbs-1670491583294-686267847.jpeg"
                                                alt=""
                                                height="100%"
                                            />
                                            <span>Xám</span>
                                        </div>
                                        <div
                                            className={cx(
                                                "product-select-watch-item",
                                                "vang"
                                            )}
                                        >
                                            <img
                                                src="https://shope-b3.thaihm.site/publics/uploads/productDetails/thumbs-1670491688007-781122669.jpeg"
                                                alt=""
                                                height="100%"
                                            />
                                            <span>Vàng</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx("product-site-connect")}>
                                    <div className={cx("product-site-hotline")}>
                                        {"Hotline hỗ trợ bán hàng 24/7: "}
                                        <Link
                                            className={cx(
                                                "product-site-hotline-link"
                                            )}
                                        >
                                            0888.136.633
                                        </Link>
                                    </div>
                                    <span>|</span>
                                    <div
                                        className={cx("social-network-actions")}
                                    >
                                        <div
                                            className={cx(
                                                "social-network-actions-item",
                                                "like"
                                            )}
                                        >
                                            <span>
                                                <LikeOutlined
                                                    style={{
                                                        marginRight: "5px",
                                                        color: "#fff",
                                                    }}
                                                />
                                            </span>
                                            <span>Thích </span>
                                            <span>0</span>
                                        </div>
                                        <div
                                            className={cx(
                                                "social-network-actions-item",
                                                "share"
                                            )}
                                        >
                                            <span>Chia sẻ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx("product-buy-action")}>
                                <div className={cx("product-quantity")}>
                                    <span>Số lượng</span>
                                    <div
                                        className={cx(
                                            "product-quantity-adjustment"
                                        )}
                                    >
                                        <button
                                            type="button"
                                            className={cx(
                                                "product-quantity-minusbtn"
                                            )}
                                        >
                                            <MinusOutlined />
                                        </button>
                                        <input type="text" value={1} min={1} />
                                        <button
                                            type="button"
                                            className={cx(
                                                "product-quantity-plusbtn"
                                            )}
                                        >
                                            <PlusOutlined />
                                        </button>
                                    </div>
                                </div>
                                <div
                                    className={cx("product-buy-button-action")}
                                >
                                    <button
                                        className={cx(
                                            "product-button-add-to-cart"
                                        )}
                                        type={"button"}
                                    >
                                        THÊM VÀO GIỎ
                                    </button>
                                    <button
                                        className={cx("product-button-buy-now")}
                                        type={"button"}
                                    >
                                        MUA NGAY
                                    </button>
                                </div>
                            </div>
                        </form>
                    </strong>
                </div>
            </div>
        </div>
    );
}

export default SelectProduct;
