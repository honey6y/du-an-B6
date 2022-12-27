import styles from './Payment.module.scss';
import classNames from 'classnames/bind';
import { RightOutlined } from '@ant-design/icons';
import {useEffect, useState} from 'react'
import axios from 'axios';
import PreviewCart from '../PreviewCart/PreviewCart';
import {useForm} from 'react-hook-form'
import { rules } from '../../../Others/Rules';
import {useSearchParams ,Link, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';


function Payment () {
    const nav = useNavigate()
    const [listProvince, setListProvince] = useState([])
    const [province, setProvince] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [displayPayment , setDisplayPayment] = useState(1)
    const cx = classNames.bind(styles)
    const params = searchParams.get('step')
    
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
       setDisplayPayment(params ? params : 1)
    },[params])

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
      } = useForm();

    const handleChange = (e) => {
        const result = listProvince.filter((item) => {
            return item.name === e.target.value
        })
        setProvince(result)
    }
   
    const onSubmit100 = handleSubmit((data) => {
        console.log(data.email)
        setSearchParams({step : 2})
    });
    const handleOrder = () => {
        toast('dat hang thanh cong')
        setTimeout(()=>{
            nav('/')
        }, 2000)
    }
    return (
        <>
        <div className={cx('page')}>
            <div className={cx('payment')}>
                <p className={cx('title')}>Phụ Kiện Hay</p>
                <div className={cx('nav')}>
                    <Link to={'/cart'} style={{textDecoration : 'none'}}>Giỏ hàng</Link>
                    <div><RightOutlined style={{fontSize: '12px', color: 'gray', verticalAlign: 'middle'}}/></div>
                    <div className={params == 2 ? cx('vanChuyen-active') : cx('vanChuyen')} onClick={()=>setSearchParams({step : 1})}>Thông tin vận chuyển</div>
                    <div><RightOutlined style={{fontSize: '12px', color: 'gray', verticalAlign: 'middle'}}/></div>
                    <div>Phương thức thanh toán</div>
                </div>

              {displayPayment == 1 ? <>
                <p className={cx('infor')}>Thông tin thanh toán</p>
                <span>Bạn đã có tài khoản?</span>
                <span className={cx('login')}>Đăng nhập</span>
                <form className={cx('menu')} onSubmit={onSubmit100}>
                    <div className={cx('inputHoTen')}>
                        <input type="text" placeholder='Họ tên' className={cx('name')} name='name' {...register('name', rules.name ) }
                        />
                        <div className={cx('inputErrors')}>{errors.name?.message}</div>
                    </div>
                    <div className={cx('inputChild')}>
                        <div className={cx('inputEmail')}>
                            <input type="email" name="email" id="" placeholder='Email' className={cx('email')} {...register('email' , rules.email )}
                                />
                            <div className={cx('inputErrors')}>{errors.email?.message}</div>
                        </div>
                        <div className={cx('inputNumber')}>
                            <input type="text" name="phone" id="" placeholder='Số điện thoại' className={cx('number')} {...register('phone' , rules.phone )}
                            />
                            <div className={cx('inputErrors')}>{errors.phone?.message}</div>
                        </div>
                    </div>
                    <div className={cx('inputAddress')}>
                        <input name='address' type="text" placeholder='Địa chỉ' className={cx('name')} {...register('address', rules.nationality)}
                        />
                        <div className={cx('inputErrors')}>{errors.address?.message}</div>
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
                    <div className={cx('footer')}>
                        <div className={cx('login')}>Giỏ hàng</div>
                        <div>
                            <button type='submit' className={cx('phuongThuc')} onClick={onSubmit100}>Phương thức thanh toán</button>
                        </div>
                        
                     </div>
                </form>
              
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
                        <button className={cx('datHang')} onClick={handleOrder}>Đặt hàng</button>
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

