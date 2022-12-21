import classNames from 'classnames/bind'
import styles from './Header.module.scss'
import { ImSearch } from 'react-icons/im'
import { Link } from 'react-router-dom'
export default function Header() {
    const cx = classNames.bind(styles)
    return (
        <>
            <div className={cx("header-desktop")}>
                <div className={cx("wrapper")}>
                    <div className={cx("inner")}>
                        <div className={cx("grid")}>
                            <div className={cx("grid__item-1 large--two-twelfths pd-left15 ")}>
                                <div className={cx("header-logo")}>
                                    <h1>
                                        <Link to='/'>
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
                                                        <input id={cx("searchtext")} name="q" className={cx("form-control input-search")} type="text" size="20" placeholder="Tìm kiếm sản phẩm..." autoComplete="off" maxLength="40" />
                                                        <span className={cx("input-group-btn")} >
                                                            <button id={cx("searchsubmit")} type="submit">
                                                                <svg style={{marginTop:"10px", marginLeft:"10px", height: "15px"}} className={cx('svg-inline--fa fa-search fa-w-16')}>
                                                                    <ImSearch/>
                                                                </svg>
                                                            </button>
                                                        </span>
                                                    </div>
                                                </div>
                                                <input type="hidden" value="(collectionid:product>=0)" className={cx("collection_id")} />
                                                <input type="hidden" value="all" className={cx("collection_handle")} />
                                                <input type="hidden" value="all" className={cx("collection_name")} />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className={cx("grid__item-1 pd-left15 ")}>
                                <div className={cx("header-navbar")}>
                                    <ul className={cx("no-bullets")}>
                                        <li className={cx("dropdown")}>
                                            <a href="/collections/cap-sac" className={cx("text-center")}>
                                                <div className={cx("hd-link-icon")}>
                                                    <img src="https://theme.hstatic.net/1000205427/1000509844/14/hd_mainmenu_icon1.png?v=56" alt="cáp" />
                                                </div>
                                                <div className={cx("hd-link-title")}>CÁP</div>
                                            </a>
                                            <ul className={cx("dropdown-menu")}>
                                                <li><a href="/collections/cap-lightning">CÁP LIGHTNING</a></li>
                                                <li><a href="/collections/cap-micro-usb">CÁP MICRO USB </a></li>
                                                <li><a href="/collections/cap-type-c">CÁP TYPE C </a></li>
                                                <li><a href="/collections/cap-PD">CÁP PD </a></li>
                                                <li><a href="/collections/cap-audio">CÁP AUDIO </a></li>
                                            </ul>
                                        </li>
                                        <li className={cx("dropdown")}>
                                            <a href="/collections/pin-du-phong" className={cx("text-center")}>
                                                <div className={cx("hd-link-icon")}>
                                                    <img src="https://theme.hstatic.net/1000205427/1000509844/14/hd_mainmenu_icon2.png?v=56" alt="PIN SẠC" />
                                                </div>
                                                <div className={cx("hd-link-title")}>PIN SẠC</div>
                                            </a>
                                            <ul className={cx("dropdown-menu")}>
                                                <li><a href="/collections/cu-sac">CỦ SẠC</a></li>
                                                <li><a href="/collections/sac-khong-day">SẠC KHÔNG DÂY </a></li>
                                                <li><a href="/collections/pin-du-phong">PIN DỰ PHÒNG </a></li>
                                            </ul>
                                        </li>
                                        <li className={cx("dropdown")}>
                                            <a href="/collections/tai-nghe" className={cx("text-center")}>
                                                <div className={cx("hd-link-icon")}>
                                                    <img src="https://theme.hstatic.net/1000205427/1000509844/14/hd_mainmenu_icon3.png?v=56" alt="TAI NGHE" />
                                                </div>
                                                <div className={cx("hd-link-title")}>TAI NGHE</div>
                                            </a>
                                            <ul className={cx("dropdown-menu")}>
                                                <li><a href="/collections/tai-nghe">TAI NGHE CÓ DÂY</a></li>
                                                <li><a href="/collections/tai-nghe-bluetooth">BLUETOOTH</a></li>
                                                <li><a href="/collections/tai-nghe-true-wireless">TRUE WIRELESS </a></li>
                                            </ul>
                                        </li>
                                        <li className={cx("dropdown")}>
                                            <a href="/collections/loa-di-dong" className={cx("text-center")}>
                                                <div className={cx("hd-link-icon")}>
                                                    <img src="https://theme.hstatic.net/1000205427/1000509844/14/hd_mainmenu_icon4.png?v=56" alt="LOA" />
                                                </div>
                                                <div className={cx("hd-link-title")}>LOA</div>
                                            </a>
                                        </li>
                                        <li className={cx("dropdown")}>
                                            <a href="/collections/khuyen-mai" className={cx("text-center")}>
                                                <div className={cx("hd-link-icon")}>
                                                    <img src="https://theme.hstatic.net/1000205427/1000509844/14/hd_mainmenu_icon5.png?v=56" alt="KHUYẾN MẠI" />
                                                </div>
                                                <div className={cx("hd-link-title")}>KHUYẾN MẠI</div>
                                            </a>
                                        </li>
                                        <li className={cx("dropdown")}>
                                            <a href="#" className={cx("text-center")}>
                                                <div className={cx("hd-link-icon")}>
                                                    <img src="https://theme.hstatic.net/1000205427/1000509844/14/hd_mainmenu_icon_user.png?v=56" alt="TÀI KHOẢN" />
                                                </div>
                                                <div className={cx("hd-link-title")}>TÀI KHOẢN</div>
                                            </a>
                                            <ul className={cx("dropdown-menu")}>
                                                <li><Link to="/login">Đăng nhập</Link></li>
                                                <li><Link to="/register">Đăng kí</Link></li>
                                            </ul>
                                        </li>
                                        <li className={cx("dropdown")} >
                                            <a href="" className={cx("text-center")}>
                                                <div className={cx("hd-link-icon")}>
                                                    <img src="https://theme.hstatic.net/1000205427/1000509844/14/hd_mainmenu_icon_cart.png?v=56" alt="giỏ hàng" />
                                                    {/* <span className={cx("hd-cart-count">0</span> */}
                                                </div>
                                                <div className={cx("hd-link-title")}>GIỎ HÀNG</div>
                                            </a>
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