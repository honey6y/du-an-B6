import React, { memo, useEffect, useState } from 'react'
import styles from './PreviewCart.module.scss'
import classNames from 'classnames/bind'
import axios from 'axios'

function PreviewCart() {
    const [listProductDetailId , setListProductDetailId] = useState([])
    const [listProductId , setListProductId] = useState([])
    const [totalPrice , setTotalPrice] = useState(0)
    const token = localStorage.getItem('token')
    useEffect(()=>{
        axios({
            method: 'get',
            url: 'https://ecommerce.nodemy.vn/api/v1/cart/get-loged-in-cart',
            headers: { 
                'Authorization': token
            }
        }).then((res)=>{
            setListProductDetailId(res.data.cart.listProduct)
            let total = []
            res.data.cart.listProduct.forEach((item,index)=>{
                    total.push( (item.quantity * item.productDetailId.price)) 
            })
            res.data.cart.product.forEach((item,index)=>{
                total.push((item.quantity * item.productId.price) )
            })
            const totalPrice =total.reduce((tong, value , index)=>{
                return tong += value
            },0)
            setTotalPrice(totalPrice)
            setListProductId(res.data.cart.product)
        }).catch((error)=>{
            console.log(error)
        })

  },[])
  const cx = classNames.bind(styles)
  return (
    <div className={cx('product')}>
         {listProductDetailId.map((item,index)=>{
            return(
                <div className={cx('product-item1')} key={index}>
                    <div className={cx('img-box')}>
                        <img className={cx('image-SP')} src={item.productDetailId.listImg[0]} alt="" />
                        <div className={cx('image-number')}>{item.quantity}</div>
                    </div>
                    <div className={cx('product-text')}>
                        <p>{item.productDetailId.productId.productName}</p>
                        {item.productDetailId.option.map((value,index)=>{
                            return <span style={{marginRight : '10px'}}>
                                {value.value}
                            </span>
                        })}
                    </div>
                    <div className={cx('product-price')}>
                       {(item.productDetailId.productId.price * item.quantity).toLocaleString()}
                    </div>
                </div>
            )
         })}
         {listProductId.map((item,index)=>{
            return(
                <div className={cx('product-item1')} key={index}>
                    <div className={cx('img-box')}>
                        <img className={cx('image-SP')} src={item.productId.thump[0]} alt="" />
                        <div className={cx('image-number')}>{item.quantity}</div>
                    </div>
                    <div className={cx('product-text')}>
                        <p>{item.productId.productName}</p>
                    </div>
                    <div className={cx('product-price')}>
                       {(item.productId.price * item.quantity).toLocaleString()}
                    </div>
                </div>
            )
         })}
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
                  <div>{totalPrice.toLocaleString()}</div>
                  <div className={cx('phiShip')}>__</div>
              </div>
          </div>
          <div className={cx('product-item4')}>
              <div>
                  Tổng tiền
              </div>
              <div>{totalPrice.toLocaleString()}</div>
          </div>
    </div>
  )
}

export default memo(PreviewCart)