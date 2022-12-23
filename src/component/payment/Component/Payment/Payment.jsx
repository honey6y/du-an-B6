import styles from './Payment.module.scss';
import classNames from 'classnames/bind';
import { RightOutlined } from '@ant-design/icons';
import {useEffect, useState} from 'react'
import axios from 'axios';
import PreviewCart from '../PreviewCart/PreviewCart';

function Payment () {
    const [listProvince, setListProvince] = useState([])
    const [province, setProvince] = useState(null)
    useEffect(() => {
        axios({
            method: 'get',
            url: 'https://provinces.open-api.vn/api/?depth=3',
            header: {}
        })
        .then((res) => {
            setListProvince(res.data)
        })
        .catch((err) => {
            console.log(err);
        })
    },[])

    const handleChange = (e) => {
        const result = listProvince.filter((item) => {
            return item.name === e.target.value
        })
        setProvince(result)
    }
    const [hoTenDisplay, setHoTenDisplay] = useState(false)
    const [emailDisplay, setEmailDisplay] = useState(false)
    const [numberDisplay, setNumberDisplay] = useState(false)
    const [addressDisplay, setAddressDisplay] = useState(false)
    const [displayPayment , setDisplayPayment] = useState(true)

    const cx = classNames.bind(styles)
    return (
        <>
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

              {displayPayment ? <>
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
                    <div className={cx('inputChild')}>
                        <div className={cx('inputEmail')}>
                            <input type="email" name="" id="" placeholder='Email' className={cx('email')}
                                onChange={(e) => {
                                    if(e.target.value) {
                                        setEmailDisplay(true)
                                    } else {
                                        setEmailDisplay(false)
                                    }
                                }}/>
                            <div className={cx('Email')}>
                                <span className={emailDisplay ? cx('show') : cx('hide')}>Email</span>
                            </div>
                        </div>
                        <div className={cx('inputNumber')}>
                            <input type="text" name="" id="" placeholder='Số điện thoại' className={cx('number')}
                                onChange={(e) => {
                                    if(e.target.value) {
                                        setNumberDisplay(true)
                                    } else{
                                        setNumberDisplay(false)
                                    }
                                }}/>
                            <div className={cx('Number')}>
                                <span className={numberDisplay ? cx('show') : cx('hide')}>Số điện thoại</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('inputAddress')}>
                        <input type="text" placeholder='Địa chỉ' className={cx('name')}
                            onChange={(e) => {
                                if(e.target.value) {
                                    setAddressDisplay(true)
                                } else{
                                    setAddressDisplay(false)
                                }
                            }}/>
                        <div className={cx('diaChi')}>
                            <span className={addressDisplay ? cx('show') : cx('hide')}>Địa chỉ</span>
                        </div>
                    </div>
                    <div>
                        <select name="" id="" placeholder='Tỉnh' onChange={handleChange}>
                            <option value="" className={cx('gray')}>Chọn tỉnh thành</option>
                            {listProvince.map((item, index) => {
                                return (
                                    <option key ={index}>
                                        {item.name}
                                    </option>
                                )
                            })}
                        </select>
                        <select name="" id="" placeholder='Quận/Huyện'>
                            <option value="" className={cx('gray')} style={{"color" : "gray"}}>Chọn Quận/Huyện</option>
                            {province ? province[0].districts.map((item, index) => {
                                return (
                                    <option key={index}>
                                        {item.name}
                                    </option>
                                )
                            }) : null}
                        </select>
                    </div>
                </div>
                <div className={cx('footer')}>
                    <div className={cx('login')}>Giỏ hàng</div>
                    <div>
                        <button className={cx('phuongThuc')} onClick={()=>setDisplayPayment(false)}>Phương thức thanh toán</button>
                    </div>
                </div>
                </> : <div className={cx('methods')}>
                <div className={cx('infor')}>
                    Phương thức vận chuyển
                </div>
                <div className={cx('input1')}>
                    <input type="radio" checked="checked"/>
                    <span className={cx('gray')}>Giao hàng tận nơi</span>
                    <div className={cx('price')}>
                        <span>30,000</span>
                    </div>
                </div>
                <div className={cx('infor')}>
                    Phương thức thanh toán
                </div>
                <div className={cx('input2')}>
                    <input type="radio" checked="checked"/>
                    <img src="https://hstatic.net/0/0/global/design/seller/image/payment/cod.svg?v=4" alt="" />
                    <span className={cx('gray')}>Thanh toán khi giao hàng (COD)</span>
                </div>
                <div className={cx('footer2')}>
                    <div className={cx('login')}>Giỏ hàng</div>
                    <div>
                        <button className={cx('datHang')}>Đặt hàng</button>
                    </div>
                </div>
            </div>}
            </div>
           <PreviewCart />
        </div>
            
            </>
    )
}

export default Payment

