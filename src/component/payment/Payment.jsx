import styles from './Payment.module.scss';
import classNames from 'classnames/bind';
import { RightOutlined } from '@ant-design/icons';
import {useState} from 'react'

function Payment () {
    const [hoTenDisplay, setHoTenDisplay] = useState(false)
    const cx = classNames.bind(styles)
    return (
        <div className={cx('page')}>
            <div className={cx('payment')}>
                <p className={cx('title')}>Phụ Kiện Hay</p>
                <div className={cx('nav')}>
                    <div>Giỏ hàng</div>
                    <div><RightOutlined style={{fontSize: '12px', color: 'gray', verticalAlign: 'middle'}}/></div>
                    <div>Thông tin vận chuyển</div>
                    <div><RightOutlined style={{fontSize: '12px', color: 'gray', verticalAlign: 'middle'}}/></div>
                    <div>Phương thức thanh toán</div>
                </div>
                <p className={cx('infor')}>Thông tin thanh toán</p>
                <span>Bạn đã có tài khoản?</span> <span className={cx('login')}>Đăng nhập</span>
                <div className={cx('menu')}>
                    <div className={cx('inputHoTen')}>
                        <input type="text" placeholder='Họ tên' className={cx('name')}  
                            onChange={(e)=>{
                                if(e.target.value){
                                    setHoTenDisplay(true)
                                }else{
                                    setHoTenDisplay(false)
                                }
                                
                        }}/>
                        <div className={cx('hoTen')}>
                            <span className={hoTenDisplay ? cx('show') : cx('hide')}>Họ tên</span>
                        </div>
                    </div>
                    <div>
                        <input type="email" name="" id="" placeholder='Email' className={cx('email')}/>
                        <input type="number" name="" id="" placeholder='Số điện thoại' className={cx('number')}/>
                    </div>
                    <input type="text" placeholder='Địa chỉ' className={cx('name')}/>
                    <div>
                        <select name="" id="" placeholder='Tỉnh'>
                            <option value="">Chọn tỉnh thành</option>
                            <option value="">Hà Nội</option>
                        </select>
                        <select name="" id="" placeholder='Quận/Huyện'>
                            <option value="">Chọn Quận/Huyện</option>
                            <option value="">Hoàng Mai</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className={cx('product')}>
                <div className={cx('product-item1')}>
                    <div className={cx('img-box')}>
                        <img src="https://product.hstatic.net/1000205427/product/10650848828_20612872_2994b2008d9943c095e6965da6f7a1b6_master_b0cd0171b732483b898da134cab5f4d5_small.jpg" alt="" />
                        <div className={cx('image')}>3</div>
                    </div>
                    <div className={cx('product-text')}>
                        <p>Máy Đuổi Muỗi Thông Minh DSG</p>
                        <span>12 tháng</span>
                    </div>
                    <div className={cx('product-price')}>
                        840,000đ
                    </div>
                </div>
                <div className={cx('product-item2')}>
                    <input type="text" placeholder='Mã giảm giá'/>
                    <button>Sử dụng</button>
                </div>
                <div className={cx('product-item3')}>
                    <div className={cx('ship')}>
                        <p>Tạm tính</p>
                        <span>Phí ship</span>
                    </div>
                    <div className={cx('money')}>
                        <div>840,000</div>
                        <div className={cx('phiShip')}>__</div>
                    </div>
                </div>
                <div className={cx('product-item4')}>
                    <div>
                        Tổng tiền
                    </div>
                    <div>840,000</div>
                </div>
            </div>
        </div>
    )
}

export default Payment

