import classNames from "classnames/bind";
import { useRef, useState } from "react";
import styles from "./DetailInfoProduct.module.scss";

const cx = classNames.bind(styles);

function DetailInfoProduct() {
    
    const [produInfo, setProductInfo] = useState(1)
    function changeDisplayProductInfo() {
    }
    return <div className={cx('wrapper')}>
        <div className={cx('product-detail-info')}>
            <div className={cx('select-product-info')}>
                <button className={cx('product-info-btn-select')} onClick={() => {
                    setProductInfo(1)
                }}>mô tả sản phẩm</button>
                <button className={cx('product-info-btn-select')} onClick={() => {
                    setProductInfo(2)
                }}>thông số kỹ thuật</button>
                <button className={cx('product-info-btn-select')} onClick={() => {
                    setProductInfo(3)
                }}>điều kiện đổi trả</button>
                <button className={cx('product-info-btn-select')} onClick={() => {
                    setProductInfo(4)
                }}>đánh giá</button>
            </div>
            <div className={cx('product-detail-info-display')}>
                {produInfo === 1? <div className={cx('product-detail-info-display-element', 'info-active')}>
                    <div className={cx('product-main-feature')}>Giữ năng lượng cho thiết bị của bạn </div>
                    <div className={cx('product-feature-element')}>
                        <div className={cx('product-feature-element-image')}>
                            <img src="https://shope-b3.thaihm.site/publics/uploads/products/thumbnail-1664440388237-971647644.jpg" alt="" />
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
                        <div className={cx('product-feature-element-image')}>
                            <img src="https://shope-b3.thaihm.site/publics/uploads/productDetails/thumbs-1670491583294-686267847.jpeg" alt="" />
                        </div>
                        <div className={cx('product-feature-element-description')}>
                            <p className={cx('product-feature-element-description-title')}>
                                Đủ năng lượng cho cả tuần làm việc
                            </p>
                            <p className={cx('product-feature-element-description-para')}>
                                Sạc được cho iPhone 6S đến 7 lần, Samsung S6 5 lần, iPad Mini Retina 2 lần.
                            </p>
                        </div>
                    </div>
                    <div className={cx('product-feature-element')}>
                        <div className={cx('product-feature-element-image')}>
                            <img src="https://shope-b3.thaihm.site/publics/uploads/productDetails/thumbs-1670491688007-781122669.jpeg" alt="" />
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
                        <div className={cx('product-feature-element-image')}>
                            <img src="https://shope-b3.thaihm.site/publics/uploads/productDetails/thumbs-1664870904115-954353902.jpg" alt="" />
                        </div>
                        <div className={cx('product-feature-element-description')}>
                            <p className={cx('product-feature-element-description-title')}>
                                Bền Bỉ.
                            </p>
                            <p className={cx('product-feature-element-description-para')}>
                            Mỗi sản phẩm bán ra đều được Anker kiểm nghiệm nghiêm ngặt, vì vậy chúng tôi tin tưởng chất lượng sản phẩm của mình. Đó cũng là lý do tại sao sản phẩm Anker được bảo hành dài, cùng chế độ hỗ trợ nhiệt tình.
                            </p>
                        </div>
                    </div>
                    <div className={cx('product-feature-element')}>
                        <div className={cx('product-feature-element-image')}>
                            <img src="https://shope-b3.thaihm.site/publics/uploads/productDetails/thumbs-1664870945899-16020084.jpg" alt="" />
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
                        <div className={cx('product-feature-element-description')}>
                            <p className={cx('product-feature-element-description-title')}>
                                Để Tối Ưu Sử Dụng :
                            </p>
                            <div className={cx('product-feature-element-description-para')}>
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
                    <div className={cx('product-specifications-header')}>Thông số kỹ thuật:</div>
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
                    <div className={cx('product-return-conditions-header')}>Điều kiện đổi trả:</div>
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
                </div> : null}
                {produInfo === 4 ? <div className={cx('product-detail-info-display-element')}></div> : null}
            </div>
        </div>
        <div className={cx('same-product')}>
            <h2 className={cx('same-product-heading')}>sản phẩm tương tự</h2>
        </div>
    </div>;
}

export default DetailInfoProduct;