import axios from "axios";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from './PreviewCart.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { getCart, getCartNumber } from "../../features/counter/cartSlice";
const cx = classNames.bind(styles);
function PreviewCart() {
    const [product,setProduct] = useState([])
    const [listProduct,setListProduct] = useState([])
    const dispatch = useDispatch()
    const totalCart = useSelector(state=>state.cart.cartNumber)
    useEffect(()=>{
        axios.get(
            `${process.env.REACT_APP_PORT_API}cart/get-loged-in-cart`,
            {
                headers: {
                  Authorization: `${localStorage.getItem("token")}`,
                },
            }
        )
        .then((res)=>{
            let totalCart = res.cart.listProduct.length + res.cart.product.length
            dispatch(getCartNumber(totalCart))

        })
    },[])
    
    return (
        <div className={activePopUp ? cx('quickview-cart-product-active') :cx('quickview-cart-product')}>
            <h3 className={cx('view-product-cart')}>GIỎ HÀNG CỦA TÔI {`(3 SẢN PHẨM)`}
                <span  className={cx('btnCloseQVCart')} >
                    <RiCloseLine onClick={handleClose} className={cx('btn-close-viewProduct')}/>
                </span>
            </h3>
            <ul className={cx('cart-item')}>
                <li className={cx('cart-item-detail')}>
                    <a href=""></a>
                    <div className={cx('cart-container')}>
                        <div></div>
                        <div></div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default PreviewCart