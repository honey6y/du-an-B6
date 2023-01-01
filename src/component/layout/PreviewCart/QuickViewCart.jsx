import axios from "axios";
import classNames from "classnames/bind";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from './QuickViewCart.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { getCartNumber } from "../../../features/counter/cartSlice";
import {RiCloseLine} from 'react-icons/ri'
import { Col, Row } from 'antd';
import { CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);
function QuickViewCart({activePopUp, handleShowPopUp, handleHidePopUp}) {
    const cartID = localStorage.getItem("idcart")
    let token = localStorage.getItem("token")
    const nav = useNavigate()
    const [product,setProduct] = useState([])
    const [listProduct,setListProduct] = useState([])
    const [provisional, setProvisional] = useState(0)
    const dispatch = useDispatch()
    const totalCart = useSelector(state=>state.cart.cartNumber)
    useEffect(()=>{
        axios({
            url: `${process.env.REACT_APP_PORT_API}cart/get-loged-in-cart`,
            method: "GET",
            headers: {
                Authorization: `${token}`,
            },
        })
        .then((res)=>{
            console.log(res)
            let listProduct = res.data.cart.listProduct
            let product = res.data.cart.product
            listProduct.forEach(element => {
                if(!element.productDetailId.productId.thump[0].includes('https')) {
                    element.productDetailId.productId.thump[0] = `${process.env.REACT_APP_SRC_IMG}${element.productDetailId.productId.thump[0]}`
                }
            });
            product.forEach(element => {
                if(!element.productId.thump[0].includes('https')) {
                    element.productId.thump[0] = `${process.env.REACT_APP_SRC_IMG}${element.productId.thump[0]}`
                }
            });
            setListProduct(listProduct)
            setProduct(product)
            let totalQuantity = 0;
            let listProductQuantity = listProduct.reduce((total, item) => {
                return total += item.quantity
            }, 0)
            let productQuantity = product.reduce((total, item) => {
                return total += item.quantity
            }, 0)
            totalQuantity = listProductQuantity + productQuantity
            dispatch(getCartNumber(totalQuantity))
            let provisional = 0;
            let provisionalListProduct = listProduct.reduce((total, item) => {
                return total += item.productDetailId.price * item.quantity
            }, 0)
            let provisionalProduct = product.reduce((total, item) => {
                return total += item.productId.price * item.quantity
            }, 0)
            provisional = provisionalListProduct + provisionalProduct
            setProvisional(provisional)
        })
        .catch(err => {
            console.log(err)
        })

        return () => {
            window.removeEventListener('click', handleHidePopUp)
        }
    },[totalCart])

    function addEventShow(e) {
        window.addEventListener('click', handleShowPopUp )
        window.removeEventListener('click', handleHidePopUp )
    }

    function addEventHide(e) {
        window.removeEventListener('click', handleShowPopUp )
        window.addEventListener('click', handleHidePopUp )
    }
    
    function removeFromListProduct(idProduct) {
        axios({
            url: `${process.env.REACT_APP_PORT_API}/cart/remove-from-cart/${cartID}`,
            method: 'PATCH',
            data: {
                "productDetailId": `${idProduct}`
            },
            headers: {
                Authorization: `${token}`,
            }
        })
        .then(res => {
            let listProduct = res.data.cart.listProduct
            let product = res.data.cart.product
            let totalQuantity = 0;
            let listProductQuantity = listProduct.reduce((total, item) => {
                return total += item.quantity
            }, 0)
            let productQuantity = product.reduce((total, item) => {
                return total += item.quantity
            }, 0)
            totalQuantity = listProductQuantity + productQuantity
            dispatch(getCartNumber(totalQuantity))
        })
        .catch(err => {
            console.log(err)
        })
    }

    function removeFromProduct(idProduct) {
        axios({
            url: `${process.env.REACT_APP_PORT_API}/cart/remove-from-cart/${cartID}`,
            method: 'PATCH',
            data: {
                "productId": `${idProduct}`
            },
            headers: {
                Authorization: `${token}`,
            }
        })
        .then(res => {
            let listProduct = res.data.cart.listProduct
            let product = res.data.cart.product
            let totalQuantity = 0;
            let listProductQuantity = listProduct.reduce((total, item) => {
                return total += item.quantity
            }, 0)
            let productQuantity = product.reduce((total, item) => {
                return total += item.quantity
            }, 0)
            totalQuantity = listProductQuantity + productQuantity
            dispatch(getCartNumber(totalQuantity))
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className={activePopUp ? cx('quickview-cart-product-active') :cx('quickview-cart-product')}
            onMouseLeave={addEventHide}
            onMouseEnter={addEventShow}
        >
            <h3 className={cx('quickview-cart-total-product')}>
                {totalCart ? <span>GIỎ HÀNG CỦA TÔI ({totalCart} SẢN PHẨM)</span> : <span>GIỎ HÀNG TRỐNG</span>}
                <span  className={cx('btnCloseQVCart')} >
                    <RiCloseLine className={cx('btn-close-quickview-cart')} onClick={addEventHide}/>
                </span>
            </h3>
            <ul className={cx('quickview-cart-total-item')}>
                {!totalCart ? <span>Bạn chưa có sản phẩm nào trong giỏ hàng</span> : null}
                {listProduct.map(item => {
                    return <li className={cx('quickview-cart-item')} key={item.productDetailId._id}>
                            <CloseOutlined className={cx('quickview-cart-item-delete')} onClick={() => removeFromListProduct(item.productDetailId._id)}/>
                            <Row style={{width :'100%'}} gutter={[16, 0]}>
                                <Col className={cx('quickview-cart-item-left')} span={8} style={{width :'100%'}}>
                                    <img src={item.productDetailId.productId.thump[0]} alt="" width={'100%'}/>
                                </Col>
                                <Col className={cx('quickview-cart-item-right')} span={16} style={{width :'100%'}}>
                                    <div className={cx('quickview-cart-item-name')}>{item.productDetailId.productId.productName}</div>
                                    <p className={cx('quickview-cart-item-option')}>{item.productDetailId.option[0]?.value}{item.productDetailId.option[1]? `/${item.productDetailId.option[1].value}` : null}</p>
                                    <p className={cx('quickview-cart-item-quantity')}>Số lượng: {item.quantity}</p>
                                    <p className={cx('quickview-cart-item-price')}>Giá/sp: {item.productDetailId.price.toLocaleString()}&#8363;</p>
                                </Col>
                            </Row>
                        </li>
                })}
                {product.map(item => {
                    return <li className={cx('quickview-cart-item')} key={item.productId._id}>
                            <CloseOutlined className={cx('quickview-cart-item-delete')} onClick={() => removeFromProduct(item.productId._id)}/>
                            <Row style={{width :'100%'}}>
                                <Col className={cx('quickview-cart-item-left')} span={8} style={{width :'100%'}}>
                                    <img src={item.productId.thump[0]} alt="" width={'100%'}/>
                                </Col>
                                <Col className={cx('quickview-cart-item-left')} span={16} style={{width :'100%'}}>
                                    <div className={cx('quickview-cart-item-name')}>{item.productId.productName}</div>
                                    <p className={cx('quickview-cart-item-quantity')}>Số lượng: {item.quantity}</p>
                                    <p className={cx('quickview-cart-item-price')}>Giá/sp: {item.productId.price.toLocaleString()}&#8363;</p>
                                </Col>
                            </Row>
                        </li>
                })}
            </ul>
            {totalCart ? <div className={cx('quickview-cart-total-provisional')}>Tạm tính: <span className={cx('quickview-cart-total-provisional-number')}>{provisional.toLocaleString()}&#8363;</span></div> : null}
            {totalCart ? <div className={cx('quickview-cart-actions')}>
                <button className={cx('quickview-cart-actions-button')}
                    onClick={() => {
                        nav('/cart')
                        addEventHide()
                    }}    
                >Xem giỏ hàng</button>
                <button className={cx('quickview-cart-actions-button')}
                    onClick={() => {
                        nav('/payment')
                        addEventHide()
                    }}
                >Thanh toán</button>
            </div> : null}
        </div>
    )
}

export default QuickViewCart