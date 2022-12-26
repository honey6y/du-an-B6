import classNames from 'classnames/bind'
import React, { useContext } from 'react'
import {RiCloseLine} from 'react-icons/ri'
import { useState,useEffect} from 'react'
import styles from './Header.module.scss'
import { ImSearch } from 'react-icons/im'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import debounce from 'lodash/debounce'
import { useSelector, useDispatch } from 'react-redux'
import { useRef } from 'react'
import { Badge, Space } from 'antd';
import { AppContext } from '../../../privateRouter/PrivateRouter'
import { useQuery } from '@tanstack/react-query'
import { getAvatarUrl, userApi } from '../../Others/QueryApi'
import QuickViewCart from '../PreviewCart/QuickViewCart'
export default function Header() {
    const {checkPrivate} = useContext(AppContext)
    const nav = useNavigate()
    const inputSearch = useRef()
    const totalCart = useSelector(state =>state.cart.cartNumber)
    const cx = classNames.bind(styles)
    const [searchValue,setSearchValue] = useState([])
    const [active,setActive] = useState([])
    const {data: dataUser} = useQuery({
        queryKey: ['/auth/me'],
        queryFn: userApi.getProfile
    })
    const profile = dataUser?.data
    const [activePopUp , setActivePopUp] = useState(false)
    const handleShow = () => setActivePopUp(true);
    
    const [listData,setListData] = useState([])
    const debounceOnChange = debounce(SearchByName,2000)
    function SearchByName(e){
        axios({
            method:'get',
            url: `https://ecommerce.nodemy.vn/api/v1/product/find-product-by-name?productName=${e.target.value}`,
            headers: { 
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTMxZThhMDNjZTVhM2VlNWZkYzUzZiIsImF2YXRhciI6Imh0dHBzOi8vc3QzLmRlcG9zaXRwaG90b3MuY29tLzE3Njc2ODcvMTY2MDcvdi80NTAvZGVwb3NpdHBob3Rvc18xNjYwNzQ0MjItc3RvY2staWxsdXN0cmF0aW9uLWRlZmF1bHQtYXZhdGFyLXByb2ZpbGUtaWNvbi1ncmV5LmpwZyIsImVtYWlsIjoiZGF0MTk5OUBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImNhcnQiOnsiX2lkIjoiNjNhMzFlOGEwM2NlNWEzZWU1ZmRjNTQxIiwidXNlcklkIjoiNjNhMzFlOGEwM2NlNWEzZWU1ZmRjNTNmIiwibGlzdFByb2R1Y3QiOltdLCJwcm9kdWN0IjpbXSwiY3JlYXRlZEF0IjoiMjAyMi0xMi0yMVQxNDo1NjoxMC45NDNaIiwidXBkYXRlZEF0IjoiMjAyMi0xMi0yMVQxNDo1NjoxMC45NDNaIiwiX192IjowfSwibmF0aW9uYWxpdHkiOiJWaWV0IE5hbSIsImlhdCI6MTY3MTYzNDYxOCwiZXhwIjoxNjcxNzIxMDE4fQ.fmVWjkiuadt4faGyDW2XuDWyNo8fiTzmMglc0ryhh30'
            }
        })
        .then((res)=>{
            console.log(res)
            setListData(res.data.product)
            setActive(e.target.value)
            })
            .catch((error)=>{
                console.log(error)
            })
    }
    function handleSubmit(e) {
        nav(`/category?productName=${inputSearch.current.value}`)
        inputSearch.current.value = ''
        setActive(false)
    }
    function handleEnter(e) {
        if (e.key === 'Enter') {
            nav(`/category?productName=${inputSearch.current.value}`)
            inputSearch.current.value = ''
            setActive(false)
        }
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
                                        <div id={cx("seachauto")} >
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
                                                        <input ref={inputSearch} id={cx("searchtext")}
                                                            onChange={debounceOnChange} name="q" className={cx("form-control input-search")}
                                                            type="text" size="20" placeholder="Tìm kiếm sản phẩm..." autoComplete="off" maxLength="40"
                                                            onKeyDown={handleEnter}
                                                        />
                                                        <span className={cx("input-group-btn")} >
                                                            <button id={cx("searchsubmit")} type="submit" onClick={handleSubmit}>
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
                                                        <Link to={`/detail/${item._id}`} className={cx("list-search")} onClick={()=>{
                                                                    inputSearch.current.value = ""
                                                                    setActive(false)
                                                                }
                                                            }
                                                        >
                                                            <p key={item._id} className={cx('flex-productName')}>
                                                                <div className={cx('flex-produc-img')}>
                                                                    <img className={cx('img-product')} src={`${item.thump[0]}`} alt="" />
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx("grid__item-1 pd-left15 ")}>
                                <div className={cx("header-navbar")}>
                                    <ul className={cx("no-bullets")}>
                                        <li className={cx("dropdown")}>
                                            <Link to={`/category?productName=iphone`} className={cx("text-center")}>
                                                <div className={cx("hd-link-icon")}>
                                                    <img src="https://theme.hstatic.net/1000205427/1000509844/14/hd_mainmenu_icon1.png?v=56" alt="cáp" />
                                                </div>
                                                <div className={cx("hd-link-title")}>IPHONE</div>
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
                                            <Link to={`/category?productName=xiaomi`} className={cx("text-center")}>
                                                <div className={cx("hd-link-icon")}>
                                                    <img src="https://theme.hstatic.net/1000205427/1000509844/14/hd_mainmenu_icon2.png?v=56" alt="PIN SẠC" />
                                                </div>
                                                <div className={cx("hd-link-title")}>XIAOMI</div>
                                            </Link>
                                            <ul className={cx("dropdown-menu")}>
                                                <li><Link to={"/collections/cu-sac"}>CỦ SẠC</Link></li>
                                                <li><Link to={"/collections/sac-khong-day"}>SẠC KHÔNG DÂY </Link></li>
                                                <li><Link to={"/collections/pin-du-phong"}>PIN DỰ PHÒNG </Link></li>
                                            </ul>
                                        </li>
                                        <li className={cx("dropdown")}>
                                            <Link to={`/category?productName=samsung`} className={cx("text-center")}>
                                                <div className={cx("hd-link-icon")}>
                                                    <img src="https://theme.hstatic.net/1000205427/1000509844/14/hd_mainmenu_icon3.png?v=56" alt="TAI NGHE" />
                                                </div>
                                                <div className={cx("hd-link-title")}>SAM SUNG</div>
                                            </Link>
                                            <ul className={cx("dropdown-menu")}>
                                                <li><Link to={"/collections/tai-nghe"}>TAI NGHE CÓ DÂY</Link></li>
                                                <li><Link to={"/collections/tai-nghe-bluetooth"}>BLUETOOTH</Link></li>
                                                <li><Link to={"/collections/tai-nghe-true-wireless"}>TRUE WIRELESS </Link></li>
                                            </ul>
                                        </li>
                                        <li className={cx("dropdown")}>
                                            <Link to={`/category?productName=dolce`} className={cx("text-center")}>
                                                <div className={cx("hd-link-icon")}>
                                                    <img src="https://theme.hstatic.net/1000205427/1000509844/14/hd_mainmenu_icon4.png?v=56" alt="LOA" />
                                                </div>
                                                <div className={cx("hd-link-title")}>D&G</div>
                                            </Link>
                                        </li>
                                        <li className={cx("dropdown")}>
                                            <Link to={`/category?productName=gubag`} className={cx("text-center")}>
                                                <div className={cx("hd-link-icon")}>
                                                    <img src="https://theme.hstatic.net/1000205427/1000509844/14/hd_mainmenu_icon5.png?v=56" alt="KHUYẾN MẠI" />
                                                </div>
                                                <div className={cx("hd-link-title")}>GU BAG</div>
                                            </Link>
                                        </li>
                                        
                                        <li className={cx("dropdown")}>
                                            { checkPrivate ? (
                                                <Link to={"user/profile"} className={cx("text-center")}>
                                                    <div className={cx("box-img")}>
                                                        <img src={getAvatarUrl(profile?.avatar)} alt="TÀI KHOẢN" className={cx('img-user')}/>
                                                    </div>
                                                </Link>
                                            ) : (
                                                <Link to={"/login"} className={cx("text-center")}>
                                                    <div className={cx("hd-link-icon")}>
                                                        <img src="https://theme.hstatic.net/1000205427/1000509844/14/hd_mainmenu_icon_user.png?v=56" alt="TÀI KHOẢN" />
                                                    </div>
                                                    <div className={cx("hd-link-title")}>TÀI KHOẢN</div>
                                                </Link>
                                            )}
                                            <ul className={cx("dropdown-menu")}>
                                                <li>
                                                    {checkPrivate ? (
                                                        <li><Link to={"/user/profile"}>Xin chào, {profile?.username}</Link></li>
                                                    ) : (
                                                        <li><Link to={"/login"}>Đăng nhập</Link></li>
                                                    )}
                                                </li>
                                                <li>
                                                    {!checkPrivate ? (
                                                        <li><Link to={"/register"}>Đăng ký</Link></li>
                                                    ) : (
                                                        <Link to={"/register"}>Đăng xuất</Link>
                                                    )}
                                                </li>
                                            </ul>
                                        </li>
                                        <li className={cx("dropdown")} >
                                            <div className={cx("text-center")} onClick={handleShow}>
                                            <Badge color='black' size='small' count={totalCart}>
                                                <div className={cx("hd-link-icon")}>
                                                    <img src="https://theme.hstatic.net/1000205427/1000509844/14/hd_mainmenu_icon_cart.png?v=56" alt="giỏ hàng" />
                                                    {/* <span className={cx("hd-cart-count">0</span> */}
                                                </div>
                                            </Badge>
                                                <div className={cx("hd-link-title")}>GIỎ HÀNG</div>
                                            </div>
                                            <QuickViewCart activePopUp={activePopUp} setActivePopUp={setActivePopUp}/>
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