import classNames from 'classnames/bind'
import React from 'react'
import {RiCloseLine} from 'react-icons/ri'
import { useState,useEffect} from 'react'
import styles from './Header.module.scss'
import { ImSearch } from 'react-icons/im'
import axios from 'axios'
import { Link } from 'react-router-dom'
import debounce from 'lodash/debounce'
import { useRef } from 'react'
export default function Header() {
    const cx = classNames.bind(styles)
    const [searchValue,setSearchValue] = useState("")
    const [active,setActive] = useState(null)

    const [activePopUp , setActivePopUp] = useState(false)
    const handleShow = () => setActivePopUp(!activePopUp);
    const handleClose = () => {
        console.log('click')
        setActivePopUp(false)
    }
   
    const [listData,setListData] = useState([])
    const updateActive = e=>{
        setActive(e?.target?.value)
        searchByName(e);
    }
    const debounceOnChange = debounce(updateActive,800)

    function searchByName(e){
        setSearchValue(e.target.value)
        axios({
            method:'get',
            url: `https://shope-b3.thaihm.site/api/product/find-products-by-name?productName=${searchValue}`,
            headers: { 
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzkyZTU5YWZjYTM3MmRiMzhiNTE5MjEiLCJ1c2VybmFtZSI6ImFuIiwiZW1haWwiOiJhbkBnbWFpbC5jb20iLCJhdmF0YXIiOiJodHRwczovL21lZGlhLmlzdG9ja3Bob3RvLmNvbS9waG90b3MvYnVzaW5lc3NtYW4tc2lsaG91ZXR0ZS1hcy1hdmF0YXItb3ItZGVmYXVsdC1wcm9maWxlLXBpY3R1cmUtcGljdHVyZS1pZDQ3NjA4NTE5OD9rPTIwJm09NDc2MDg1MTk4JnM9NjEyeDYxMiZ3PTAmaD04SjNWZ09aYWJfT2lZb0l1WmZpTUl2dWNGWUI4dldZbEtuU2pLdUtlWVFNPSIsInJvbGUiOiJ1c2VyIiwiY3JlYXRlZEF0IjoiMjAyMi0xMi0wOVQwNzozNjo1OC4wNzlaIiwidXBkYXRlZEF0IjoiMjAyMi0xMi0xMlQxMToxODowOS42OTFaIiwiX192IjowLCJpYXQiOjE2NzA4NDM5NTN9.WdAX0MEQzwjBMD5Tye6M6xk7e2rAt7jxHceiIp9smMo'
  }
        })
        .then((res)=>{
            console.log(res)
            setListData(res.data.products)
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    return (
        <>
            <div className={cx("header-desktop")}>
                <div className={cx("wrapper")}>
                    <div className={cx("inner")}>
                        <div className={cx("grid")}>
                            <div className={cx("grid__item-1 large--two-twelfths pd-left15 ")}>
                                <div className={cx("header-logo")}>
                                    <h1>
                                        <Link to={""}>
                                            <img className={cx('img-logo')} src="https://theme.hstatic.net/1000205427/1000509844/14/logo.png?v=56" alt="Phụ kiện Hay: Phụ Kiện Điện Thoại, Ốp, Bao Da, Cáp Sạc, Tai nghe, Loa" />
                                        </Link>
                                    </h1>
                                </div>
                            </div>
                            <div className={cx("grid__item-1 large--three-twelfths pd-left15")}>
                                <div className={cx("header-search")}>
                                    <div className={cx("search-form-wrapper")}>
                                        <form action="/seach" id={cx("seachauto")}>
                                            <div className={cx("wpo-search")}>
                                                <div className={cx("wpo-search-inner")}>
                                                    <select name="" id="" className={cx("select-collection")}>
                                                        <option value="">Tất cả</option>
                                                        <option value="">CÁP SẠC</option>
                                                        <option value="">Pin dự phòng</option>
                                                        <option value="">TAI NGHE</option>
                                                        <option value="">LOA DI DỘNG</option>
                                                        <option value="">KHUYẾN MẠI</option>
                                                    </select>
                                                    <div className={cx("input-group")}>
                                                        <input type="hidden" name="type" value="product" id="" />
                                                        <input id={cx("searchtext")} onChange={debounceOnChange} name="q" className={cx("form-control input-search")} type="text" size="20" placeholder="Tìm kiếm sản phẩm..." autoComplete="off" maxLength="40" />
                                                        <span className={cx("input-group-btn")} >
                                                            <button id={cx("searchsubmit")} type="submit">
                                                                <svg style={{marginTop:"10px", marginLeft:"10px", height: "15px"}} className={cx('svg-inline--fa fa-search fa-w-16')}>
                                                                    <ImSearch/>
                                                                </svg>
                                                            </button>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className={active ? cx('search-by-name-active'):cx('search-by-name')}>
                                                    {listData && listData.slice(0,5).map((item,index) => {
                                                      return(
                                                        <Link to={`/productsDetail`} className={cx("list-search")} >
                                                            <p key={item._id} className={cx('flex-productName')}>
                                                            <div className={cx('flex-produc-img')}>
                                                                <img className={cx('img-product')} src={`https://shope-b3.thaihm.site/${item.thumbnail}`} alt="" />
                                                                <p className={cx('products-Name')}>{item.productName}</p>
                                                            </div>
                                                            <h5 className={cx('products-Price')}>{item.price.toLocaleString()}đ</h5>
                                                        </p>
                                                        </Link>
                                                      )
                                                    })}
                                                </div>
                                                {/* <input type="hidden" value="(collectionid:product>=0)" className={cx("collection_id")} /> */}
                                                {/* <input type="hidden" value="all" className={cx("collection_handle")} /> */}
                                                {/* <input type="hidden" value="all" className={cx("collection_name")} /> */}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className={cx("grid__item-1 pd-left15 ")}>
                                <div className={cx("header-navbar")}>
                                    <ul className={cx("no-bullets")}>
                                        <li className={cx("dropdown")}>
                                            <Link to={`/collections/cap-sac`} className={cx("text-center")}>
                                                <div className={cx("hd-link-icon")}>
                                                    <img src="https://theme.hstatic.net/1000205427/1000509844/14/hd_mainmenu_icon1.png?v=56" alt="cáp" />
                                                </div>
                                                <div className={cx("hd-link-title")}>CÁP</div>
                                            </Link>
                                            <ul className={cx("dropdown-menu")}>
                                                <li><Link to={"/collections/cap-lightning"}>CÁP LIGHTNING</Link></li>
                                                <li><Link to={"/collections/cap-micro-usb"}>CÁP MICRO USB </Link></li>
                                                <li><Link to={"/collections/cap-type-c"}>CÁP TYPE C </Link></li>
                                                <li><Link to={"/collections/cap-PD"}>CÁP PD </Link></li>
                                                <li><Link to={"/collections/cap-audio"}>CÁP AUDIO </Link></li>
                                            </ul>
                                        </li>
                                        <li className={cx("dropdown")}>
                                            <Link to={"/collections/pin-du-phong"} className={cx("text-center")}>
                                                <div className={cx("hd-link-icon")}>
                                                    <img src="https://theme.hstatic.net/1000205427/1000509844/14/hd_mainmenu_icon2.png?v=56" alt="PIN SẠC" />
                                                </div>
                                                <div className={cx("hd-link-title")}>PIN SẠC</div>
                                            </Link>
                                            <ul className={cx("dropdown-menu")}>
                                                <li><Link to={"/collections/cu-sac"}>CỦ SẠC</Link></li>
                                                <li><Link to={"/collections/sac-khong-day"}>SẠC KHÔNG DÂY </Link></li>
                                                <li><Link to={"/collections/pin-du-phong"}>PIN DỰ PHÒNG </Link></li>
                                            </ul>
                                        </li>
                                        <li className={cx("dropdown")}>
                                            <Link to={"/collections/tai-nghe"} className={cx("text-center")}>
                                                <div className={cx("hd-link-icon")}>
                                                    <img src="https://theme.hstatic.net/1000205427/1000509844/14/hd_mainmenu_icon3.png?v=56" alt="TAI NGHE" />
                                                </div>
                                                <div className={cx("hd-link-title")}>TAI NGHE</div>
                                            </Link>
                                            <ul className={cx("dropdown-menu")}>
                                                <li><Link to={"/collections/tai-nghe"}>TAI NGHE CÓ DÂY</Link></li>
                                                <li><Link to={"/collections/tai-nghe-bluetooth"}>BLUETOOTH</Link></li>
                                                <li><Link to={"/collections/tai-nghe-true-wireless"}>TRUE WIRELESS </Link></li>
                                            </ul>
                                        </li>
                                        <li className={cx("dropdown")}>
                                            <Link to={"/collections/loa-di-dong"} className={cx("text-center")}>
                                                <div className={cx("hd-link-icon")}>
                                                    <img src="https://theme.hstatic.net/1000205427/1000509844/14/hd_mainmenu_icon4.png?v=56" alt="LOA" />
                                                </div>
                                                <div className={cx("hd-link-title")}>LOA</div>
                                            </Link>
                                        </li>
                                        <li className={cx("dropdown")}>
                                            <Link to={"/collections/khuyen-mai"} className={cx("text-center")}>
                                                <div className={cx("hd-link-icon")}>
                                                    <img src="https://theme.hstatic.net/1000205427/1000509844/14/hd_mainmenu_icon5.png?v=56" alt="KHUYẾN MẠI" />
                                                </div>
                                                <div className={cx("hd-link-title")}>KHUYẾN MẠI</div>
                                            </Link>
                                        </li>
                                        <li className={cx("dropdown")}>
                                            <Link to={"#"} className={cx("text-center")}>
                                                <div className={cx("hd-link-icon")}>
                                                    <img src="https://theme.hstatic.net/1000205427/1000509844/14/hd_mainmenu_icon_user.png?v=56" alt="TÀI KHOẢN" />
                                                </div>
                                                <div className={cx("hd-link-title")}>TÀI KHOẢN</div>
                                            </Link>
                                            <ul className={cx("dropdown-menu")}>
                                                <li><Link to={"/login"}>Đăng nhập</Link></li>
                                                <li><Link to={"/register"}>Đăng kí</Link></li>
                                            </ul>
                                        </li>
                                        <li className={cx("dropdown")} onClick={handleShow} >
                                            <div className={cx("text-center")}>
                                                <div className={cx("hd-link-icon")}>
                                                    <img src="https://theme.hstatic.net/1000205427/1000509844/14/hd_mainmenu_icon_cart.png?v=56" alt="giỏ hàng" />
                                                    {/* <span className={cx("hd-cart-count">0</span> */}
                                                </div>
                                                <div className={cx("hd-link-title")}>GIỎ HÀNG</div>
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
                                            </div>
                                            <div className={cx("quickview-cart")}>
                                                <h3>
                                                    <span className={cx("btnCloseQVCart")}></span>
                                                </h3>
                                                {/* <ul className={cx("no-bullets">
                                                    <li>Bạn chưa có sản phẩm nào trong giỏ hàng!</li>
                                                </ul> */}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx("header-mobile hide")}></div>
        </>
    )
}