import DetailProductHeader from "../DetailProductHeader/DetailProductHeader";
import { Breadcrumb, Col, Row } from 'antd';
import {
    DownOutlined,
    MinusOutlined,
    PlusOutlined,
    UpOutlined,
} from "@ant-design/icons/lib/icons";
import axios from "axios";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import styles from "./SelectProduct.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../features/counter/cartSlice";

const cx = classNames.bind(styles);

function SelectProduct() {
    const dispatch = useDispatch()
    const nav = useNavigate()
    // let idCart = useSelector(state => state.cart.cartId)
    let token = localStorage.getItem("token")
    let idCart = localStorage.getItem('idcart')
    let { idProduct } = useParams();
    const [productDetail, setProductDetail] = useState({});
    const [currentItem, setCurrentItem] = useState({});
    const [imgCurrent, setImgCurrent] = useState(``);
    const [imgThump, setImgThump] = useState(``);
    const imgThumbUl = useRef();
    const [marginListThumb, setMarginListThumb] = useState(0);
    const thumbControlBtn = useRef();
    const imgCurrentView = useRef();
    const imgCurrentViewLensZoom = useRef();
    const productThumbZoom = useRef();
    const [buyQuantity, setBuyQuantity] = useState(1);
    const [listColorSize, setListColorSize] = useState([])
    const [productSimple, setProductSimple] = useState([])
    const [listProductCurrentSize, setListProductCurrentSize] = useState([])
    const [currentColor, setCurrentColor] = useState('')
    const [listOption, setListOption] = useState([])
    useEffect(() => {
        window.scrollTo(0, 0)
        axios({
            url: `${process.env.REACT_APP_PORT_API}product/get-one-product/${idProduct}`,
            method: "GET",
            headers: {
                authorization: token,
            },
        })
        .then((res) => {
            console.log(res);
            if(res.data.product.productDetailId) {
                res.data.product.productDetailId.forEach(element => {
                    for(let i = 0; i < element.listImg.length; i++) {
                        if (!element.listImg[i].includes('http')) {
                            element.listImg[i] = `${process.env.REACT_APP_SRC_IMG}${element.listImg[i]}`
                        }
                    }
                });
            }
            let totalProduct = res.data.product;
            let totalSimple = []
            let seenProduct = JSON.parse(localStorage.getItem('seen') || "[]")
            let checkDuplicate = false;
            seenProduct.forEach(item => {
                if(item._id === totalProduct._id) {
                    checkDuplicate = true
                }
            })
            if (!checkDuplicate) {
                seenProduct.push(totalProduct)
            }
            localStorage.setItem('seen', JSON.stringify(seenProduct))

            totalProduct.productDetailId.forEach(element => {
                let simpleItem = {}
                simpleItem.id = element._id
                simpleItem.price = element.price
                simpleItem.color = element.option[0].value
                simpleItem.size = element.option[1]?.value
                totalSimple.push(simpleItem)
            })
            if (totalSimple.length) {
                setCurrentItem(totalSimple[0])
            } else {
                setCurrentItem({
                    id: res.data.product._id,
                    price: res.data.product.price,
                })
            }
            setProductSimple(totalSimple)
            let listColorSizeStat = {};
            totalProduct.productDetailId.forEach(element => {
                if (!listColorSizeStat[element.option[0].value]) {
                    listColorSizeStat[element.option[0].value] = {}
                    listColorSizeStat[element.option[0].value].listImg = element.listImg
                    listColorSizeStat[element.option[0].value].listSize = element.option[1] ? [element.option[1].value] : null
                } else (
                    listColorSizeStat[element.option[0].value].listSize.push(element.option[1].value)
                )
            });
            let listColorSize = Object.entries(listColorSizeStat)
            setCurrentColor(listColorSize[0] ? listColorSize[0][0] : null)
            setListProductCurrentSize(listColorSize[0] ? listColorSize[0][1].listSize : null)
            setListColorSize(listColorSize)

            if(totalProduct.productDetailId[0]) {
                let optionKey = []
                totalProduct.productDetailId[0].option.forEach(item => {
                    optionKey.push(item.optionName)
                })
                setListOption(optionKey)
            } else {
                setListOption([])
            }


            let totalImg = listColorSize.reduce((total, item) => {
                return total += item[1].listImg.length
            }, 0)
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
            let thump = res.data.product.thump[0]
            setProductDetail(totalProduct);
            if(thump.includes('https')) {
                setImgCurrent(res.data.product.thump[0]);
                setImgThump(res.data.product.thump[0]);
            } else {
                setImgCurrent(`${process.env.REACT_APP_SRC_IMG}${thump}`)
                setImgThump(`${process.env.REACT_APP_SRC_IMG}${thump}`)
            }
        })
        .catch((err) => {
            console.log(err)
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
    }, [idProduct]);

    function downListImgThumb() {
        let changeMarginListThumb = marginListThumb - 100;
        if (changeMarginListThumb < 495 - imgThumbUl.current.offsetHeight) {
            changeMarginListThumb = 495 - imgThumbUl.current.offsetHeight;
        } else {
            setMarginListThumb((old) => old - 100);
        }
        imgThumbUl.current.style.marginTop = `${changeMarginListThumb}px`;
    }
    function upListImgThumb() {
        let changeMarginListThumb = marginListThumb + 100;
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

    function filterCurrentItem (currentColor, currentSize) {
        let filter = productSimple.filter(item => {
            return (item.color === currentColor && item.size === currentSize)
        })
        setCurrentItem(filter[0])
    }

    function handleAddProductToCart() {
        if(productSimple.length) {
            axios({
                url: `${process.env.REACT_APP_PORT_API}cart/add-to-cart/${idCart}`,
                method: "PATCH",
                headers: {
                    authorization: token,
                },
                data: {
                    "productDetailId": currentItem.id,
                    "quantity": buyQuantity
                }
            })
            .then(res => {
                console.log(res)
                toast.success("Thêm giỏ hàng thành công");
                dispatch(addToCart(buyQuantity));
            })
            .catch(err => {
                console.log(err)
                toast.error("Thêm vào giỏ hàng thất bại")
            })
        } else {
            axios({
                url: `${process.env.REACT_APP_PORT_API}cart/add-to-cart/${idCart}`,
                method: "PATCH",
                headers: {
                    authorization: token,
                },
                data: {
                    "productId": currentItem.id,
                    "quantity": buyQuantity
                }
            })
            .then(res => {
                console.log(res)
                toast.success("Thêm giỏ hàng thành công");
                dispatch(addToCart(buyQuantity));
            })
            .catch(err => {
                console.log(err)
                toast.error("Thêm vào giỏ hàng thất bại")
            })
        }
        
    }

    function handleBuynowBtn() {
        if(productSimple.length) {
            axios({
                url: `${process.env.REACT_APP_PORT_API}cart/add-to-cart/${idCart}`,
                method: "PATCH",
                headers: {
                    authorization: token,
                },
                data: {
                    "productDetailId": currentItem.id,
                    "quantity": buyQuantity
                }
            })
            .then(res => {
                console.log(res)
                toast.success("Thêm giỏ hàng thành công");
                dispatch(addToCart(buyQuantity));
            })
            .catch(err => {
                console.log(err)
                toast.error("Thêm vào giỏ hàng thất bại")
            })
        } else {
            axios({
                url: `${process.env.REACT_APP_PORT_API}cart/add-to-cart/${idCart}`,
                method: "PATCH",
                headers: {
                    authorization: token,
                },
                data: {
                    "productId": currentItem.id,
                    "quantity": buyQuantity
                }
            })
            .then(res => {
                console.log(res)
                toast.success("Thêm giỏ hàng thành công");
                dispatch(addToCart(buyQuantity));
            })
            .catch(err => {
                console.log(err)
                toast.error("Thêm vào giỏ hàng thất bại")
            })
        }

        nav('/payment')
    }

    return (
        <div className={cx("wrapper")}>
            <DetailProductHeader
                category={productDetail.categoryId ?
                    productDetail.categoryId.categoryName :
                    null
                }
                nameProduct={productDetail.productName}
            ></DetailProductHeader>
            <div className={cx("product-detail-inner")}>
                <Row>
                    <Col md={12} sm={24} xs={24}>
                        <div className={cx("product-preview")}>
                            <div className={cx("list-img-thumbnail")}>
                                <ul
                                    ref={imgThumbUl}
                                    className={cx("list-img-thumb-ul")}
                                >
                                    <li
                                        className={imgCurrent === imgThump?
                                            cx("list-img-thumb-item","img-active") : cx("list-img-thumb-item")}
                                        onClick={() => {
                                            setImgCurrent(productDetail.thump[0])
                                        }}
                                    >
                                        <img
                                            src={imgThump}
                                            alt=""
                                            width="100%"
                                        />
                                    </li>

                                    {listColorSize.length ? listColorSize.map(([key, value], index) => {
                                            return value.listImg.map(
                                                (imgItem, indexImg) => (
                                                    <li
                                                        key={`${index}-${indexImg}`}
                                                        className={imgCurrent ===imgItem ?
                                                            cx("list-img-thumb-item","img-active") : cx("list-img-thumb-item")}
                                                        onClick={() => {setImgCurrent(imgItem)}}
                                                    >
                                                        <img
                                                            src={imgItem}
                                                            alt=""
                                                            width="100%"
                                                        />
                                                    </li>
                                                )
                                            );
                                        })
                                        : null}
                                </ul>
                                <div
                                    ref={thumbControlBtn}
                                    className={cx(
                                        "list-img-thumb-control",
                                        "display-none"
                                    )}
                                >
                                    <UpOutlined
                                        className={cx("list-img-thumb-control-up")}
                                        onClick={upListImgThumb}
                                    />
                                    <DownOutlined
                                        className={cx("list-img-thumb-control-down")}
                                        onClick={downListImgThumb}
                                    />
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
                                    ref={imgCurrentView}
                                    className={cx("img-current-view")}
                                    src={imgCurrent}
                                    alt=""
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={12} sm={24} xs={24}>
                        <div className={cx("product-info")}>
                            <div className={cx("product-info-header")}>
                                <h1 className={cx("product-name")}>
                                    {productDetail.productName}
                                </h1>
                                <div className={cx("product-brand")}>
                                    <span className={cx("product-brand-span")}>Thương hiệu: </span>
                                    <Link className={cx("product-brand-link")}>
                                        {productDetail.brandId ? productDetail.brandId.brandName : null}
                                    </Link>
                                </div>
                                <span className={cx("product-brand-span")}>|</span>
                            </div>
                            <div className={cx("product-info-price")}>
                                <span>{currentItem.price ? currentItem.price.toLocaleString() : null}&#8363;</span>
                            </div>
                            <strong>
                                <form action="">
                                    <div
                                        className={cx("product-info-variants-wrapper")}
                                    >
                                        {listOption[0] ? <div className={cx("product-select-color-watch")}>
                                            <div
                                                className={cx(
                                                    "product-select-color-watch-header"
                                                )}
                                            >
                                                {listOption[0]}
                                            </div>
                                            <div
                                                className={cx(
                                                    "product-select-color-watch-wrapper"
                                                )}
                                            >
                                                {listColorSize.map((item, index) => {
                                                    return (
                                                    <div
                                                        key={index}
                                                        className={currentItem.color === item[0] ? cx("product-select-color-watch-item", "product-select-watch-item-active") : cx("product-select-color-watch-item")}
                                                        onClick={() => {
                                                            setListProductCurrentSize(item[1].listSize)
                                                            setCurrentColor(item[0])
                                                            filterCurrentItem(item[0], item[1].listSize[0])
                                                            setImgCurrent(item[1].listImg[0] || imgThump)
                                                        }}
                                                        >
                                                        <img src="https://theme.hstatic.net/1000205427/1000509844/14/select-pro.png?v=56" alt="" className={currentItem.color === item[0] ? cx('img-check', 'img-check-active') : cx('img-check')}/>
                                                        <img src={item[1].listImg[0]} alt="" height="100%"/>
                                                        <span>{item[0]}</span>
                                                    </div>
                                                    )
                                                })}
                                            </div>
                                        </div> : null}

                                        {listOption[1] ? <div className={cx("product-select-size-watch")}>
                                            <div
                                                className={cx(
                                                    "product-select-size-watch-header"
                                                )}
                                            >
                                                {listOption[1]}
                                            </div>
                                            <div
                                                className={cx(
                                                    "product-select-size-watch-wrapper"
                                                )}
                                            >
                                                {listProductCurrentSize?.map((item, index) => {
                                                    return (
                                                    <div
                                                        key={index}
                                                        className={currentItem.size === item ? cx("product-select-color-watch-item", "product-select-watch-item-active") : cx("product-select-color-watch-item")}
                                                        onClick={() => {
                                                            filterCurrentItem(currentColor, item)
                                                        }}
                                                        >
                                                        <img src="https://theme.hstatic.net/1000205427/1000509844/14/select-pro.png?v=56" alt="" className={currentItem.size === item ? cx('img-check', 'img-check-active') : cx('img-check')}/>
                                                        <span>{item}</span>
                                                    </div>
                                                    )
                                                })}
                                            </div>
                                        </div> : null}
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
                                            <div className={cx("product-site-socialnetwork")}>
                                                <div
                                                    className="fb-like"
                                                    data-href="https://phukienhay.vn/products/op-lung-anker-karapax-breeze-cho-iphone-7-plus-8-plus-a9015"
                                                    data-width=""
                                                    data-layout="button_count"
                                                    data-action="like"
                                                    data-size="small"
                                                    data-share="true"
                                                ></div>
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
                                                    onClick={() => {
                                                        if (buyQuantity > 1) {
                                                            setBuyQuantity(old => old - 1)
                                                        }
                                                    }}
                                                >
                                                    <MinusOutlined />
                                                </button>
                                                <input type="text" value={buyQuantity} min={1} readOnly/>
                                                <button
                                                    type="button"
                                                    className={cx(
                                                        "product-quantity-plusbtn"
                                                    )}
                                                    onClick={() => {
                                                        setBuyQuantity(old => old + 1)
                                                    }}
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
                                                onClick={handleAddProductToCart}
                                            >
                                                THÊM VÀO GIỎ
                                            </button>
                                            <button
                                                className={cx("product-button-buy-now")}
                                                type={"button"}
                                                onClick={handleBuynowBtn}
                                            >
                                                MUA NGAY
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </strong>
                        </div>
                    </Col>
                </Row>
                <div
                    className={cx("product-thumb-zoom", "display-none")}
                    ref={productThumbZoom}
                ></div>
            </div>
        </div>
    );
}

export default SelectProduct;
