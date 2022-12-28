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
                            }}>mô tả sản phẩm</button>
                            <button className={produInfo === 2 ? cx('product-info-btn-select', 'btn-active') : cx('product-info-btn-select')} onClick={() => {
                                setProductInfo(2)
                            }}>thông số kỹ thuật</button>
                            <button className={produInfo === 3 ? cx('product-info-btn-select', 'btn-active') : cx('product-info-btn-select')} onClick={() => {
                                setProductInfo(3)
                            }}>điều kiện đổi trả</button>
                            <button className={produInfo === 4 ? cx('product-info-btn-select', 'btn-active') : cx('product-info-btn-select')} onClick={() => {
                                setProductInfo(4)
                            }}>đánh giá</button>
                        </div>
                        <div className={cx('product-detail-info-display')}>
                            {produInfo === 1? <div className={cx('product-detail-info-display-element')}>
                                <div className={cx('product-main-feature')}>Giữ năng lượng cho thiết bị của bạn </div>
                                <div className={cx('product-feature-element')}>
                                    <div className={cx('product-feature-element-image-container')}>
                                        <img src="https://shope-b3.thaihm.site/publics/uploads/products/thumbnail-1664440388237-971647644.jpg" alt="" className={cx('product-feature-element-image')}/>
                                    </div>
                                    <div className={cx('product-feature-element-description')}>
                                        <p className={cx('product-feature-element-description-title')}>
                                            Công Nghệ Sạc Nhanh
                                        </p>
                                        <p className={cx('product-feature-element-description-para')}>
                                            Công nghệ độc quyền PowerIQ và VoltageBoost đảm bảo cho tốc độ sạc nhanh nhất. Tốc độ sạc có thể lên đến 4.8A. Đồng thời có thể sạc cùng lúc 2 chiếc iPad mà vẫn đạt được tốc độ đầy đủ.
                                        </p>
                                        <p className={cx('product-feature-element-description-para')}>
                                            Không hỗ trợ Qualcomm Quick Charge 2.0. Đối với sạc QC2.0, vui lòng chọn Anker PowerCore+.
                                        </p>
                                    </div>
                                </div>
                                <div className={cx('product-feature-element')}>
                                    
                                    <div className={cx('product-feature-element-description')}>
                                        <p className={cx('product-feature-element-description-title')}>
                                            Đủ năng lượng cho cả tuần làm việc
                                        </p>
                                        <p className={cx('product-feature-element-description-para')}>
                                            Sạc được cho iPhone 6S đến 7 lần, Samsung S6 5 lần, iPad Mini Retina 2 lần.
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
                                            Hệ thống an toàn MultiProtect
                                        </p>
                                        <p className={cx('product-feature-element-description-para')}>
                                        Tăng cường thêm lớp bảo vệ, kiểm soát nhiệt độ và các tính năng an toàn tiên tiến hơn giữ cho bạn và các thiết bị của bạn khỏi sạc quá dòng, rò rỉ điện.
                                        </p>
                                    </div>
                                </div>
                                <div className={cx('product-feature-element')}>
                                    
                                    <div className={cx('product-feature-element-description')}>
                                        <p className={cx('product-feature-element-description-title')}>
                                            Bền Bỉ.
                                        </p>
                                        <p className={cx('product-feature-element-description-para')}>
                                        Mỗi sản phẩm bán ra đều được Anker kiểm nghiệm nghiêm ngặt, vì vậy chúng tôi tin tưởng chất lượng sản phẩm của mình. Đó cũng là lý do tại sao sản phẩm Anker được bảo hành dài, cùng chế độ hỗ trợ nhiệt tình.
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
                                            Nhỏ Gọn
                                        </p>
                                        <p className={cx('product-feature-element-description-para')}>
                                        Pin dung lượng cao nhưng có thiết kế nhỏ gọn, dễ mang theo bên mình. Lớp vỏ được làm mờ, nhám dễ dàng cho việc cầm nắm và không để lại vết ố, dấu vân tay.
                                        </p>
                                    </div>
                                </div>
                                <div className={cx('product-feature-element')}>
                                    <div className={cx('product-feature-element-user-manual')}>
                                        <p className={cx('product-feature-element-user-manual-title')}>
                                            Để Tối Ưu Sử Dụng :
                                        </p>
                                        <div className={cx('product-feature-element-user-manual-desc')}>
                                            <ul>
                                                <li>Hãy sử dụng dây cáp chính hãng hoặc đã được chứng nhận bởi một bên thứ ba (như MFI).</li>
                                                <li>Tương thích với Macbook 12 inch 2015, iPad, iPhone và điện thoại, máy tính bảng hệ điều hành android (bao gồm cả nexus 7) và các thiết bị có cổng sạc USB khác.</li>
                                                <li>Không tương thích với iPod Nano, iPod classic, HP TouchPad, Dell Venue 11 Pro, máy tính bảng Asus và một số thiết bị GPS, Bluetooth.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div> : null}
                            {produInfo === 2 ? <div className={cx('product-detail-info-display-element')}>
                                <div className={cx('product-specifications-head-title')}>Thông số kỹ thuật:</div>
                                <table className={cx('product-specifications-table')}>
                                    <tbody>
                                        <tr>
                                            <td className={cx('product-specifications-title')}>Khối lượng</td>
                                            <td className={cx('product-specifications-detail')}>356g</td>
                                        </tr>
                                        <tr>
                                            <td className={cx('product-specifications-title')}>Thời hạn bảo hành</td>
                                            <td className={cx('product-specifications-detail')}>15tháng</td>
                                        </tr>
                                        <tr>
                                            <td className={cx('product-specifications-title')}>Dung lượng pin</td>
                                            <td className={cx('product-specifications-detail')}>20100mAh</td>
                                        </tr>
                                        <tr>
                                            <td className={cx('product-specifications-title')}>Cổng vào</td>
                                            <td className={cx('product-specifications-detail')}>5V/2A</td>
                                        </tr>
                                        <tr>
                                            <td className={cx('product-specifications-title')}>Cổng ra</td>
                                            <td className={cx('product-specifications-detail')}>5V/4.8A</td>
                                        </tr>
                                        <tr>
                                            <td className={cx('product-specifications-title')}>Tương thích</td>
                                            <td className={cx('product-specifications-detail')}>Tương thích với Macbook 12 inch 2015, iPad, iPhone và điện thoại/máy tính bảng hệ điều hành Android (bao gồm cả Nexus 7) và các thiết bị có cổng sạc USB khác</td>
                                        </tr>
                                        <tr>
                                            <td className={cx('product-specifications-title')}>Model</td>
                                            <td className={cx('product-specifications-detail')}>A1271</td>
                                        </tr>
                                        <tr>
                                            <td className={cx('product-specifications-title')}>Nguồn gốc</td>
                                            <td className={cx('product-specifications-detail')}>Chính hãng</td>
                                        </tr>
                                        <tr>
                                            <td className={cx('product-specifications-title')}>Thông số nổi bật</td>
                                            <td className={cx('product-specifications-detail')}>Không tương thích với iPod Nano, iPod classic, HP TouchPad, Dell Venue 11 Pro, máy tính bảng Asus và một số thiết bị GPS, Bluetooth</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div> : null}
                            {produInfo === 3 ? <div className={cx('product-detail-info-display-element')}>
                                <div className={cx('product-return-conditions-title')}>Điều kiện đổi trả:</div>
                                <div className={cx('product-return-conditions-description')}>
                                    <p className={cx('product-return-conditions-para')}>Còn đầy đủ hộp sản phẩm (mất hộp thu phí 2%).</p>
                                    <p className={cx('product-return-conditions-para')}>
                                    Trong trường hợp máy không lên nguồn hoặc không xác định được lỗi, phải chuyển Trung Tâm Bảo Hành của Hãng thẩm định trước khi ra quyết định nhập đổi, nhập trả.
                                    </p>
                                    <p className={cx('product-return-conditions-para')}>
                                    Còn đầy đủ phiếu bảo hành (nếu có) và phụ kiện đi kèm (mất thu phí theo qui định và lớn nhất là 5% trên giá hoá đơn).
                                    </p>
                                    <p className={cx('product-return-conditions-para')}>
                                    Quà khuyến mãi: thu phí theo giá hoàn lại do Phụ Kiện Hay công bố khi bán sản phẩm. Nếu không công bố giá trị khuyến mãi thì sẽ thu phí không lớn hơn 5% giá trị cho mỗi món quà khuyến mãi .
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
                        <h2 className={cx('same-product-heading')}>sản phẩm tương tự</h2>
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
                        <h2 className={cx('same-product-heading')}>tin tức liên quan</h2>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
    )
}

export default DetailInfoProduct;

/* 
sản phẩm tương tự: call api all product ra rồi nhét vào, css
sản phẩm đã xem: call api all product ra rồi nhét vào, css
*/