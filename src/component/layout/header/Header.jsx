import classNames from 'classnames/bind'
import React, { useCallback, useContext } from 'react'
import {RiCloseLine} from 'react-icons/ri'
import { useState,useEffect} from 'react'
import styles from './Header.module.scss'
import { ImSearch } from 'react-icons/im'
import {AiOutlineMenu} from 'react-icons/ai'
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
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {IoMdAdd} from 'react-icons/io'
import {RiSubtractFill} from 'react-icons/ri'

export default function Header() {
    const {profile} = useContext(AppContext)
    const nav = useNavigate()
    const inputSearch = useRef()
    const totalCart = useSelector(state =>state.cart.cartNumber)
    const cx = classNames.bind(styles)
    const [searchValue,setSearchValue] = useState([])
    const [active,setActive] = useState([])

    const [activePopUp , setActivePopUp] = useState(false)
    const handleShowPopUp = useCallback((e) => {
        setActivePopUp(true)
    }, [])
    const handleHidePopUp = useCallback((e) => {
        setActivePopUp(false)
    }, [])
    function addEventShow(e) {
        window.addEventListener('click', handleShowPopUp )
        window.removeEventListener('click', handleHidePopUp )
    }
    function addEventHide(e) {
        window.removeEventListener('click', handleShowPopUp )
        window.addEventListener('click', handleHidePopUp )
    }
    const [listData,setListData] = useState([])
    const debounceOnChange = debounce(SearchByName,2000)
    const user = useSelector(state => state.cart.userInfor)
    const [check, setCheck] = useState(false)
    const [openIphoneMobile,setOpenIphoneMobile] = useState(false)
    const [openXiaomiMobile,setOpenXiaomiMobile] = useState(false)
    const [openSamsungMobile,setOpenSamsungMobile] = useState(false)
    useEffect( () => {
        if(user.avatar){
            setCheck(true)
        }
        if(profile.avatar){
            setCheck(true)
        }
      
    },[user.avatar, profile.avatar])
    const [openMenuMobile,setOpenMenuMobile] = useState(false)
    function logout() {
        localStorage.clear('token');
        window.location.assign("http://localhost:3000/");
    }
        const [show, setShow] = useState(false);
      
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        const style = {
            backgroundColor : '#cd1818',
            border : 'none',
            display :'flex',
            alignItems : 'center'
        }
    function SearchByName(e){
        axios({
            method:'get',
            url: `https://ecommerce.nodemy.vn/api/v1/product/find-product-by-name?productName=${e.target.value}`,
            headers: { 
                'Authorization': `${localStorage.getItem("token")}`
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
                            <div className={cx("grid__item-1 large--two-twelfths pd-left15 nav__pc")}>
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
                                                                <svg style={{marginTop:"10px", marginLeft:"10px", width:"15px", height: "15px"}} className={cx('svg-inline--fa fa-search fa-w-16')}>
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
                                        
                                        <li className={cx("cart-mobile")}>
                                            { check ? (
                                                <Link to={"user/profile"} className={cx("text-center")}>
                                                    <div className={cx("box-img")}>
                                                        <img src={getAvatarUrl(user.avatar || profile.avatar)} alt="TÀI KHOẢN" className={cx('img-user')}/>
                                                    </div>
                                                </Link>
                                            ) : (
                                                <div to={""} className={cx("text-center")}>
                                                    <div className={cx("hd-link-icon")}>
                                                        <img src="https://theme.hstatic.net/1000205427/1000509844/14/hd_mainmenu_icon_user.png?v=56" alt="TÀI KHOẢN" />
                                                    </div>
                                                    <div className={cx("hd-link-title")}>TÀI KHOẢN</div>
                                                </div>
                                            )}
                                            <ul className={cx("dropdown-menu")}>
                                                <li>
                                                    {check ? (
                                                        <div>
                                                            <li><Link to={"/user/profile"}>Xin chào, {user?.username || user?.email || profile?.username || profile?.email}</Link></li>
                                                            <div className={cx('log-out')} onClick={logout} >Đăng xuất</div>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                           <li><Link to={"/login"}>Đăng nhập</Link></li> 
                                                           <li><Link to={"/register"}>Đăng ký</Link></li> 
                                                        </div>
                                                    )}
                                                </li>
                                            </ul>
                                        </li>
                                        <li className={cx("cart-mobile")} >
                                            <div className={cx("text-center")}
                                                // onClick={handleShowPopUp}
                                                onMouseEnter={addEventShow}
                                                onMouseLeave={addEventHide}
                                            >
                                            <Badge color='black' size='small' count={totalCart}>
                                                <div className={cx("hd-link-icon")}>
                                                    <img src="https://theme.hstatic.net/1000205427/1000509844/14/hd_mainmenu_icon_cart.png?v=56" alt="giỏ hàng" />
                                                    {/* <span className={cx("hd-cart-count">0</span> */}
                                                </div>
                                            </Badge>
                                                <div className={cx("hd-link-title")}>GIỎ HÀNG</div>
                                            </div>
                                            <QuickViewCart activePopUp={activePopUp} handleShowPopUp={handleShowPopUp} handleHidePopUp={handleHidePopUp}/>
                                        </li>
                                        <li className={cx("menu-mobile")} onClick={()=>{setOpenMenuMobile(true)}}>
                                                <div>
                                                <Button style={style} onClick={handleShow} className="me-2 ">
                                                    <AiOutlineMenu className={cx("menu-mobile")}/>
                                                </Button>
                                                <Offcanvas style={{width:'300px',background:'white', color:'black'}} show={show} onHide={handleClose} placement={'end'}>
                                                <Offcanvas.Header closeButton style={{color:'white', borderBottom:'1px solid rgba(255, 255, 255, 0.3)'}}>
                                                    <Offcanvas.Title style={{color:'black',margin:'0',fontSize:'22px'}}><b>MENU</b></Offcanvas.Title>
                                                </Offcanvas.Header>
                                                <Offcanvas.Body style={{padding:'0',background:'black'}}>
                                                    <ul className={cx("")}>
                                                        <li className={cx("mobile-content")}>
                                                            <div className={cx("nav-mobile-right")}>
                                                                <Link onClick={()=>handleClose()} to={`/category?productName=iphone`} className={cx("mobile-content")}>
                                                                    <p>IPHONE</p>
                                                                </Link>
                                                                <div>
                                                                    {!openIphoneMobile ?<span><IoMdAdd onClick={()=>setOpenIphoneMobile(true)}/></span>:<span><RiSubtractFill onClick={()=>setOpenIphoneMobile(false)}/></span>}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                {openIphoneMobile ?
                                                                <ul className={cx('dropdown-Iphone')}>
                                                                    <li className={cx('padding-dropdown')}><Link className={cx("dropdownMobile-Iphone")} to={"/collections/cap-lightning"}>CÁP LIGHTNING</Link></li>
                                                                    <li className={cx('padding-dropdown')}><Link className={cx("dropdownMobile-Iphone")} to={"/collections/cap-micro-usb"}>CÁP MICRO USB </Link></li>
                                                                    <li className={cx('padding-dropdown')}><Link className={cx("dropdownMobile-Iphone")} to={"/collections/cap-type-c"}>CÁP TYPE C </Link></li>
                                                                    <li className={cx('padding-dropdown')}><Link className={cx("dropdownMobile-Iphone")} to={"/collections/cap-PD"}>CÁP PD </Link></li>
                                                                    <li className={cx('padding-dropdown')}><Link className={cx("dropdownMobile-Iphone")} to={"/collections/cap-audio"}>CÁP AUDIO </Link></li>
                                                                </ul>
                                                                :""
                                                            }
                                                            </div>
                                                        </li>
                                                        <li className={cx("mobile-content")}>
                                                            <div className={cx("nav-mobile-right")}>
                                                                <Link onClick={()=>handleClose()} to={`/category?productName=xiaomi`} className={cx("mobile-content")}>
                                                                    <p>XIAOMI</p>
                                                                </Link>
                                                                <div>
                                                                    {!openXiaomiMobile ?<span><IoMdAdd onClick={()=>setOpenXiaomiMobile(true)}/></span>:<span><RiSubtractFill onClick={()=>setOpenXiaomiMobile(false)}/></span>}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                {
                                                                    openXiaomiMobile ?
                                                                    <ul className={cx("dropdown-Iphone")}>
                                                                        <li className={cx('padding-dropdown')}><Link className={cx("dropdownMobile-Iphone")} to={"/collections/cu-sac"}>CỦ SẠC</Link></li>
                                                                        <li className={cx('padding-dropdown')}><Link className={cx("dropdownMobile-Iphone")} to={"/collections/sac-khong-day"}>SẠC KHÔNG DÂY </Link></li>
                                                                        <li className={cx('padding-dropdown')}><Link className={cx("dropdownMobile-Iphone")} to={"/collections/pin-du-phong"}>PIN DỰ PHÒNG </Link></li>
                                                                    </ul>
                                                                    :""
                                                                }
                                                            </div>
                                                            
                                                        </li>
                                                        <li className={cx("mobile-content")}>
                                                            <div className={cx("nav-mobile-right")}>
                                                                <Link onClick={()=>handleClose()} to={`/category?productName=samsung`} className={cx("mobile-content")}>
                                                                    <p>SAMSUNG</p>
                                                                </Link>
                                                                <div>
                                                                    {!openSamsungMobile ?<span><IoMdAdd onClick={()=>setOpenSamsungMobile(true)}/></span>:<span><RiSubtractFill onClick={()=>setOpenSamsungMobile(false)}/></span>}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                {
                                                                    openSamsungMobile ?
                                                                    <ul className={cx("dropdown-Iphone")}>
                                                                        <li className={cx('padding-dropdown')}><Link Link className={cx("dropdownMobile-Iphone")} to={"/collections/tai-nghe"}>TAI NGHE CÓ DÂY</Link></li>
                                                                        <li className={cx('padding-dropdown')}><Link Link className={cx("dropdownMobile-Iphone")} to={"/collections/tai-nghe-bluetooth"}>BLUETOOTH</Link></li>
                                                                        <li className={cx('padding-dropdown')}><Link Link className={cx("dropdownMobile-Iphone")} to={"/collections/tai-nghe-true-wireless"}>TRUE WIRELESS </Link></li>
                                                                    </ul>
                                                                    :""
                                                                }
                                                            </div>
                                                        </li>
                                                        <li className={cx("mobile-content")}>
                                                            <div className={cx("nav-mobile-right")}>
                                                                <Link onClick={()=>handleClose()} to={`/category?productName=dolce`} className={cx("mobile-content")}>
                                                                    <p>D&G</p>
                                                                </Link>
                                                            </div>
                                                        </li>
                                                        <li className={cx("mobile-content")}>
                                                            <div className={cx("nav-mobile-right")}>
                                                                <Link onClick={()=>handleClose()} to={`/category?productName=gubag`} className={cx("mobile-content")}>
                                                                    <p>GU BAG</p>
                                                                </Link>
                                                            </div>
                                                        </li>
                                                        { check ?  (
                                                            <div>
                                                                <li className={cx("mobile-content")}>
                                                                    <div className={cx("nav-mobile-right")}>
                                                                        <Link style={{color:'white',textDecoration:'none'}} to={"user/change-password"} onClick={()=>handleClose()}>
                                                                            <p>ĐỔI MẬT KHẨU</p>
                                                                        </Link>
                                                                    </div>
                                                                </li>
                                                                <li className={cx("mobile-content")}>
                                                                    <div className={cx("nav-mobile-right")}>
                                                                        <Link style={{color:'white',textDecoration:'none'}} to={"cart"} onClick={()=>handleClose()}    >
                                                                            <p>ĐƠN HÀNG</p>
                                                                        </Link>
                                                                    </div>
                                                                </li>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <li className={cx("mobile-content")}>
                                                                    <div className={cx("nav-mobile-right")}>
                                                                        <Link style={{color:'white',textDecoration:'none'}} to={"/login"} onClick={()=>handleClose()}>
                                                                            <p>ĐĂNG NHẬP</p>
                                                                        </Link>
                                                                    </div>
                                                                </li>
                                                                <li className={cx("mobile-content")}>
                                                                    <div className={cx("nav-mobile-right")}>
                                                                        <Link style={{color:'white',textDecoration:'none'}} to={"/register"} onClick={()=>handleClose()}    >
                                                                            <p>ĐĂNG KÍ</p>
                                                                        </Link>
                                                                        </div>
                                                                </li>
                                                            </div>
                                                        )}
                                                    </ul>
                                                </Offcanvas.Body>
                                            </Offcanvas>
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