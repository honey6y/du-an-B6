import styles from './Footer.module.scss'
import classNames from 'classnames/bind'
import {MdLocationOn} from 'react-icons/md'
import {FaPhone} from 'react-icons/fa'
import {FaFacebookF} from 'react-icons/fa'
import {FaYoutube} from 'react-icons/fa'
import {AiOutlineInstagram} from 'react-icons/ai'
import {MdEmail} from 'react-icons/md'
import {FaTelegramPlane} from 'react-icons/fa'
import {IoMdArrowDropright} from 'react-icons/io'
export default function Footer() {
    const cx = classNames.bind(styles)
    return (
        <footer id={cx('footer')}>
            <div className={cx("footer-content")}>
                <div className={cx("wrapper")}>
                    <div className={cx("inner")}>
                        <div className={cx("grid-uniform")}>
                            <div className={cx("grid__item")} >
                                <div className={cx("ft-contact")}>
                                    <h3 className={cx('ft-title')}>THÔNG TIN LIÊN HỆ</h3>
                                    <div className={cx('ft-contact-desc')}>Công ty TNHH Thương mại và dịch vụ Tech Power MST: 0108089652</div>
                                    <div className={cx("ft-contact-address")}>
                                        <span className={cx('ft-contact-icon')}> <MdLocationOn/></span>
                                        <div className={cx("ft-contact-detail")}>
                                            {"Địa chỉ 1: 241 Giáp Nhất, P. Nhân Chính, Q. Thanh Xuân, TP. Hà Nội"}
                                        </div>
                                    </div>
                                    <div className={cx("ft-contact-address")}>
                                        <span className={cx('ft-contact-icon')}><MdLocationOn/></span>
                                        <div className={cx("ft-contact-detail")}>Địa chỉ 2: SỐ 2B Ao Sen, P. Mộ Lao, Q. Hà Đông, TP. Hà Nội</div>

                                    </div>
                                    <div className={cx("ft-contact-tel")}>
                                        <span className={cx('ft-contact-icon')}><FaPhone/></span>
                                        <div className={cx('ft-contact-detail')}>
                                            {"Số điện thoại: "}
                                            <a href="tel:0888.136.633">0888.136.633</a>
                                        </div>
                                    </div>
                                    <div className={cx("ft-contact-email")}>
                                        <span className={cx('ft-contact-icon')}><MdEmail/></span>
                                        <div className={cx('ft-contact-detail')}>
                                            {"Email: "}  
                                            <a href="mailto:phukienhay.vn@gmail.com">phukienhay.vn@gmail.com</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx("grid__item")}>
                                <div className={cx("ft-nav")}>
                                    <h3 className={cx('ft-title')}>LIÊN KẾT NHANH WEBSITE</h3>
                                    <ul className={cx('no-bullets')}></ul>
                                </div>
                            </div>
                            <div className={cx("grid__item")} >
                                <div className={cx("ft-nav")}>
                                    <h3>CHÍNH SÁCH MUA HÀNG</h3>
                                    <ul className={cx('no-bullet')}>
                                        <li className={cx('chinh-sach-1')}><a href="pages/chinh-sach-mua-hang" className={cx('chinh-sach')}><IoMdArrowDropright/>Chính sách thanh toán</a></li>
                                        <li className={cx('chinh-sach-1')}><a href="pages/chinh-sach-bao-mat" className={cx('chinh-sach')}><IoMdArrowDropright/>Chính sách bảo mật</a></li>
                                        <li className={cx('chinh-sach-1')}><a href="pages/chinh-sach-su-dung" className={cx('chinh-sach')}><IoMdArrowDropright/>Chính sách sử dụng</a></li>
                                        <li className={cx('chinh-sach-1')}><a href="pages/chinh-sach-doi-tra-hang" className={cx('chinh-sach')}><IoMdArrowDropright/>Chính sách bảo hành, đổi trả</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className={cx("grid__item")}>
                                <div className={cx("ft-subscribe")}>
                                    <h3 className={cx('ft-title')}>ĐĂNG KÍ NHẬN TIN</h3>
                                    <div className={cx('ft-subscribe-desc')}>Mỗi tháng chúng tôi đều có những đợt giảm giá dịch vụ và sản phẩm nhằm chi ân khách hàng. Để có thể cập nhật kịp thời những đợt giảm giá này, vui lòng nhập địa chỉ email của bạn vào ô dưới đây.</div>
                                    <div className={cx('ft-sub-wrapper')}>
                                        <form action="/account/contact">
                                            <input type="email" name="" id={cx("Email")} placeholder='Nhập địa chỉ email của bạn...' required/>
                                            <button type='submit' name='subscribe' className={cx("submit-tele")} value="Gửi"><FaTelegramPlane/></button>
                                        </form>
                                    </div>
                                </div>
                                <div className={cx("ft-social")}>
                                    <span className={cx('item-footer-face')}><FaFacebookF/></span>
                                    <span className={cx('item-footer-youtube')}><FaYoutube/></span>
                                    <span className={cx('item-footer-instagram')}><AiOutlineInstagram/></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx("footer-copyrights")}></div>
        </footer>
    )
}