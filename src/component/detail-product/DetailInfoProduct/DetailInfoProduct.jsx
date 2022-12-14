import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./DetailInfoProduct.module.scss";
import { Col, Row } from 'antd';

const cx = classNames.bind(styles);

function DetailInfoProduct() {

    let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOWMyMGUwNWZlNjMyMDQ1ODQ3M2NmNiIsImF2YXRhciI6Imh0dHBzOi8vc3QzLmRlcG9zaXRwaG90b3MuY29tLzE3Njc2ODcvMTY2MDcvdi80NTAvZGVwb3NpdHBob3Rvc18xNjYwNzQ0MjItc3RvY2staWxsdXN0cmF0aW9uLWRlZmF1bHQtYXZhdGFyLXByb2ZpbGUtaWNvbi1ncmV5LmpwZyIsInVzZXJuYW1lIjoidGVzdDEyMzEyMyIsImVtYWlsIjoiZGVtby1hbkBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImNhcnQiOnsiX2lkIjoiNjM5YzIwZTE1ZmU2MzIwNDU4NDczY2Y4IiwidXNlcklkIjoiNjM5YzIwZTA1ZmU2MzIwNDU4NDczY2Y2IiwibGlzdFByb2R1Y3QiOlt7InByb2R1Y3REZXRhaWxJZCI6IjYyZWNjYTczMmQ2OGQxYTYwZDM0MTZlMSIsInF1YW50aXR5Ijo1LCJzZWxlY3RlZCI6ZmFsc2UsIl9pZCI6IjYzOWMyZmMxNDZjYTIyZWM4NGM2NDkzMCJ9LHsicHJvZHVjdERldGFpbElkIjoiNjMyYzA0MDkxMjYyYjhjZDlkMTc0OGQ1IiwicXVhbnRpdHkiOjYsInNlbGVjdGVkIjpmYWxzZSwiX2lkIjoiNjNhMDRiNjM2ZDhiNTJmMGNlNDI5MmVlIn1dLCJwcm9kdWN0IjpbXSwiY3JlYXRlZEF0IjoiMjAyMi0xMi0xNlQwNzo0MDoxNy4wNDBaIiwidXBkYXRlZEF0IjoiMjAyMi0xMi0yMFQwOTowMjo1Ni4zOTRaIiwiX192IjowfSwiZnVsbG5hbWUiOiJ0ZXN0MTIzIiwiZGF0ZU9mQmlydGgiOiIyMDAwLTEwLTIwVDAwOjAwOjAwLjAwMFoiLCJzZXgiOiJtYWxlIiwibmF0aW9uYWxpdHkiOiJWaWV0IE5hbSIsImlhdCI6MTY3MTUyNzEzOSwiZXhwIjoxNjcxNjEzNTM5fQ.fAt_2iI_0pMTWVTkAq08NFc6U1QR4E-mCUIYTkgA7KM`;
    const [produInfo, setProductInfo] = useState(1)
    const [sameProduct, setSameProduct] = useState([])
    useEffect(() => {
        axios({
            url: `${process.env.REACT_APP_PORT_API}product/find-product-by-name?productName=iphone`,
            method: "GET",
            headers: {
                authorization: token,
            },
        })
        .then(res => {
            console.log(res)
            let sameProBuffer = res.data.product.slice(0, 4)
            setSameProduct(sameProBuffer)
        })
    },[])
    
    return (
    <div className={cx('wrapper')}>
        <Row gutter={10}>
            <Col md={16} sm={24} xs={24}>
                <div className={cx('product-detail-info-container')}>
                    <div className={cx('product-detail-info')}>
                        <div className={cx('select-product-info')}>
                            <button className={produInfo === 1 ? cx('product-info-btn-select', 'btn-active') : cx('product-info-btn-select')} onClick={() => {
                                setProductInfo(1)
                            }}>m?? t??? s???n ph???m</button>
                            <button className={produInfo === 2 ? cx('product-info-btn-select', 'btn-active') : cx('product-info-btn-select')} onClick={() => {
                                setProductInfo(2)
                            }}>th??ng s??? k??? thu???t</button>
                            <button className={produInfo === 3 ? cx('product-info-btn-select', 'btn-active') : cx('product-info-btn-select')} onClick={() => {
                                setProductInfo(3)
                            }}>??i???u ki???n ?????i tr???</button>
                            <button className={produInfo === 4 ? cx('product-info-btn-select', 'btn-active') : cx('product-info-btn-select')} onClick={() => {
                                setProductInfo(4)
                            }}>????nh gi??</button>
                        </div>
                        <div className={cx('product-detail-info-display')}>
                            {produInfo === 1? <div className={cx('product-detail-info-display-element')}>
                                <div className={cx('product-main-feature')}>Gi??? n??ng l?????ng cho thi???t b??? c???a b???n </div>
                                <div className={cx('product-feature-element')}>
                                    <div className={cx('product-feature-element-image-container')}>
                                        <img src="https://shope-b3.thaihm.site/publics/uploads/products/thumbnail-1664440388237-971647644.jpg" alt="" className={cx('product-feature-element-image')}/>
                                    </div>
                                    <div className={cx('product-feature-element-description')}>
                                        <p className={cx('product-feature-element-description-title')}>
                                            C??ng Ngh??? S???c Nhanh
                                        </p>
                                        <p className={cx('product-feature-element-description-para')}>
                                            C??ng ngh??? ?????c quy???n PowerIQ v?? VoltageBoost ?????m b???o cho t???c ????? s???c nhanh nh???t. T???c ????? s???c c?? th??? l??n ?????n 4.8A. ?????ng th???i c?? th??? s???c c??ng l??c 2 chi???c iPad m?? v???n ?????t ???????c t???c ????? ?????y ?????.
                                        </p>
                                        <p className={cx('product-feature-element-description-para')}>
                                            Kh??ng h??? tr??? Qualcomm Quick Charge 2.0. ?????i v???i s???c QC2.0, vui l??ng ch???n Anker PowerCore+.
                                        </p>
                                    </div>
                                </div>
                                <div className={cx('product-feature-element')}>
                                    
                                    <div className={cx('product-feature-element-description')}>
                                        <p className={cx('product-feature-element-description-title')}>
                                            ????? n??ng l?????ng cho c??? tu???n l??m vi???c
                                        </p>
                                        <p className={cx('product-feature-element-description-para')}>
                                            S???c ???????c cho iPhone 6S ?????n 7 l???n, Samsung S6 5 l???n, iPad Mini Retina 2 l???n.
                                        </p>
                                    </div>
                                    <div className={cx('product-feature-element-image-container')}>
                                        <img src="https://shope-b3.thaihm.site/publics/uploads/productDetails/thumbs-1670491583294-686267847.jpeg" alt="" className={cx('product-feature-element-image')}/>
                                    </div>
                                </div>
                                <div className={cx('product-feature-element')}>
                                    <div className={cx('product-feature-element-image-container')}>
                                        <img src="https://shope-b3.thaihm.site/publics/uploads/productDetails/thumbs-1670491688007-781122669.jpeg" alt="" className={cx('product-feature-element-image')}/>
                                    </div>
                                    <div className={cx('product-feature-element-description')}>
                                        <p className={cx('product-feature-element-description-title')}>
                                            H??? th???ng an to??n MultiProtect
                                        </p>
                                        <p className={cx('product-feature-element-description-para')}>
                                        T??ng c?????ng th??m l???p b???o v???, ki???m so??t nhi???t ????? v?? c??c t??nh n??ng an to??n ti??n ti???n h??n gi??? cho b???n v?? c??c thi???t b??? c???a b???n kh???i s???c qu?? d??ng, r?? r??? ??i???n.
                                        </p>
                                    </div>
                                </div>
                                <div className={cx('product-feature-element')}>
                                    
                                    <div className={cx('product-feature-element-description')}>
                                        <p className={cx('product-feature-element-description-title')}>
                                            B???n B???.
                                        </p>
                                        <p className={cx('product-feature-element-description-para')}>
                                        M???i s???n ph???m b??n ra ?????u ???????c Anker ki???m nghi???m nghi??m ng???t, v?? v???y ch??ng t??i tin t?????ng ch???t l?????ng s???n ph???m c???a m??nh. ???? c??ng l?? l?? do t???i sao s???n ph???m Anker ???????c b???o h??nh d??i, c??ng ch??? ????? h??? tr??? nhi???t t??nh.
                                        </p>
                                    </div>
                                    <div className={cx('product-feature-element-image-container')}>
                                        <img src="https://shope-b3.thaihm.site/publics/uploads/productDetails/thumbs-1664870904115-954353902.jpg" alt="" className={cx('product-feature-element-image')}/>
                                    </div>
                                </div>
                                <div className={cx('product-feature-element')}>
                                    <div className={cx('product-feature-element-image-container')}>
                                        <img src="https://shope-b3.thaihm.site/publics/uploads/productDetails/thumbs-1664870945899-16020084.jpg" alt="" className={cx('product-feature-element-image')}/>
                                    </div>
                                    <div className={cx('product-feature-element-description')}>
                                        <p className={cx('product-feature-element-description-title')}>
                                            Nh??? G???n
                                        </p>
                                        <p className={cx('product-feature-element-description-para')}>
                                        Pin dung l?????ng cao nh??ng c?? thi???t k??? nh??? g???n, d??? mang theo b??n m??nh. L???p v??? ???????c l??m m???, nh??m d??? d??ng cho vi???c c???m n???m v?? kh??ng ????? l???i v???t ???, d???u v??n tay.
                                        </p>
                                    </div>
                                </div>
                                <div className={cx('product-feature-element')}>
                                    <div className={cx('product-feature-element-user-manual')}>
                                        <p className={cx('product-feature-element-user-manual-title')}>
                                            ????? T???i ??u S??? D???ng :
                                        </p>
                                        <div className={cx('product-feature-element-user-manual-desc')}>
                                            <ul>
                                                <li>H??y s??? d???ng d??y c??p ch??nh h??ng ho???c ???? ???????c ch???ng nh???n b???i m???t b??n th??? ba (nh?? MFI).</li>
                                                <li>T????ng th??ch v???i Macbook 12 inch 2015, iPad, iPhone v?? ??i???n tho???i, m??y t??nh b???ng h??? ??i???u h??nh android (bao g???m c??? nexus 7) v?? c??c thi???t b??? c?? c???ng s???c USB kh??c.</li>
                                                <li>Kh??ng t????ng th??ch v???i iPod Nano, iPod classic, HP TouchPad, Dell Venue 11 Pro, m??y t??nh b???ng Asus v?? m???t s??? thi???t b??? GPS, Bluetooth.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div> : null}
                            {produInfo === 2 ? <div className={cx('product-detail-info-display-element')}>
                                <div className={cx('product-specifications-head-title')}>Th??ng s??? k??? thu???t:</div>
                                <table className={cx('product-specifications-table')}>
                                    <tbody>
                                        <tr>
                                            <td className={cx('product-specifications-title')}>Kh???i l?????ng</td>
                                            <td className={cx('product-specifications-detail')}>356g</td>
                                        </tr>
                                        <tr>
                                            <td className={cx('product-specifications-title')}>Th???i h???n b???o h??nh</td>
                                            <td className={cx('product-specifications-detail')}>15th??ng</td>
                                        </tr>
                                        <tr>
                                            <td className={cx('product-specifications-title')}>Dung l?????ng pin</td>
                                            <td className={cx('product-specifications-detail')}>20100mAh</td>
                                        </tr>
                                        <tr>
                                            <td className={cx('product-specifications-title')}>C???ng v??o</td>
                                            <td className={cx('product-specifications-detail')}>5V/2A</td>
                                        </tr>
                                        <tr>
                                            <td className={cx('product-specifications-title')}>C???ng ra</td>
                                            <td className={cx('product-specifications-detail')}>5V/4.8A</td>
                                        </tr>
                                        <tr>
                                            <td className={cx('product-specifications-title')}>T????ng th??ch</td>
                                            <td className={cx('product-specifications-detail')}>T????ng th??ch v???i Macbook 12 inch 2015, iPad, iPhone v?? ??i???n tho???i/m??y t??nh b???ng h??? ??i???u h??nh Android (bao g???m c??? Nexus 7) v?? c??c thi???t b??? c?? c???ng s???c USB kh??c</td>
                                        </tr>
                                        <tr>
                                            <td className={cx('product-specifications-title')}>Model</td>
                                            <td className={cx('product-specifications-detail')}>A1271</td>
                                        </tr>
                                        <tr>
                                            <td className={cx('product-specifications-title')}>Ngu???n g???c</td>
                                            <td className={cx('product-specifications-detail')}>Ch??nh h??ng</td>
                                        </tr>
                                        <tr>
                                            <td className={cx('product-specifications-title')}>Th??ng s??? n???i b???t</td>
                                            <td className={cx('product-specifications-detail')}>Kh??ng t????ng th??ch v???i iPod Nano, iPod classic, HP TouchPad, Dell Venue 11 Pro, m??y t??nh b???ng Asus v?? m???t s??? thi???t b??? GPS, Bluetooth</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div> : null}
                            {produInfo === 3 ? <div className={cx('product-detail-info-display-element')}>
                                <div className={cx('product-return-conditions-title')}>??i???u ki???n ?????i tr???:</div>
                                <div className={cx('product-return-conditions-description')}>
                                    <p className={cx('product-return-conditions-para')}>C??n ?????y ????? h???p s???n ph???m (m???t h???p thu ph?? 2%).</p>
                                    <p className={cx('product-return-conditions-para')}>
                                    Trong tr?????ng h???p m??y kh??ng l??n ngu???n ho???c kh??ng x??c ?????nh ???????c l???i, ph???i chuy???n Trung T??m B???o H??nh c???a H??ng th???m ?????nh tr?????c khi ra quy???t ?????nh nh???p ?????i, nh???p tr???.
                                    </p>
                                    <p className={cx('product-return-conditions-para')}>
                                    C??n ?????y ????? phi???u b???o h??nh (n???u c??) v?? ph??? ki???n ??i k??m (m???t thu ph?? theo qui ?????nh v?? l???n nh???t l?? 5% tr??n gi?? ho?? ????n).
                                    </p>
                                    <p className={cx('product-return-conditions-para')}>
                                    Qu?? khuy???n m??i: thu ph?? theo gi?? ho??n l???i do Ph??? Ki???n Hay c??ng b??? khi b??n s???n ph???m. N???u kh??ng c??ng b??? gi?? tr??? khuy???n m??i th?? s??? thu ph?? kh??ng l???n h??n 5% gi?? tr??? cho m???i m??n qu?? khuy???n m??i .
                                    </p>
                                </div>
                            </div> : null}
                            {produInfo === 4 ? <div className={cx('product-detail-info-display-element')}></div> : null}
                        </div>
                    </div>
                    <div className={cx('comment-facebook')}>
                        <div
                            className="fb-comments"
                            data-href="https://phukienhay.vn/products/op-lung-anker-karapax-breeze-cho-iphone-7-plus-8-plus-a9015"
                            data-width=""
                            data-numposts="5"
                        ></div>
                    </div>
                </div>
            </Col>
            <Col md={8} sm={24} xs={24}>
                <div className={cx('related-information')}>
                    <div className={cx('same-product')}>
                        <h2 className={cx('same-product-heading')}>s???n ph???m t????ng t???</h2>
                        <div className={cx('same-product-wrapper')}>
                            {sameProduct.map(item => {
                                return (
                                    <div
                                        key={item._id}
                                        className={cx('same-product-item')}
                                    >
                                        <div className={cx('same-product-item-img-container')}>
                                            <Link to={`/detail/${item._id}`}>
                                                <img
                                                    src={item.thump[0]}
                                                    alt=""
                                                    className={cx('same-product-item-img')}
                                                />
                                            </Link>
                                        </div>
                                        <div className={cx('same-product-item-info')}>
                                            <div className={cx('same-product-item-info-title')}>
                                                <Link to={`/detail/${item._id}`} className={cx('same-product-item-info-title-link')}>{item.productName}</Link>
                                            </div>
                                            <div className={cx('same-product-item-info-price')}>{item.price.toLocaleString()}&#8363;</div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className={cx('related-news')}>
                        <h2 className={cx('same-product-heading')}>tin t???c li??n quan</h2>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
    )
}

export default DetailInfoProduct;

/* 
s???n ph???m t????ng t???: call api all product ra r???i nh??t v??o, css
s???n ph???m ???? xem: call api all product ra r???i nh??t v??o, css
*/