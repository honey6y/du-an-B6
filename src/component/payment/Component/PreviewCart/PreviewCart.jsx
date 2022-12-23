import React, { memo, useEffect, useState } from 'react'
import styles from './PreviewCart.module.scss'
import classNames from 'classnames/bind'
import axios from 'axios'

function PreviewCart() {
    
    const [listProductDetailId , setListProductDetailId] = useState([])
    const [listProductId , setListProductId] = useState([])
    const [totalPrice , setTotalPrice] = useState(0)
    useEffect(()=>{
        console.log('callAPI')
        axios({
            method: 'get',
            url: 'https://ecommerce.nodemy.vn/api/v1/cart/get-loged-in-cart',
            headers: { 
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOWMzYWU3NDZjYTIyZWM4NGM2NDk1MSIsImF2YXRhciI6Imh0dHBzOi8vc3QzLmRlcG9zaXRwaG90b3MuY29tLzE3Njc2ODcvMTY2MDcvdi80NTAvZGVwb3NpdHBob3Rvc18xNjYwNzQ0MjItc3RvY2staWxsdXN0cmF0aW9uLWRlZmF1bHQtYXZhdGFyLXByb2ZpbGUtaWNvbi1ncmV5LmpwZyIsImVtYWlsIjoiYmFieTRldmVyMTFAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJjYXJ0Ijp7Il9pZCI6IjYzOWMzYWU3NDZjYTIyZWM4NGM2NDk1MyIsInVzZXJJZCI6IjYzOWMzYWU3NDZjYTIyZWM4NGM2NDk1MSIsImxpc3RQcm9kdWN0IjpbeyJwcm9kdWN0RGV0YWlsSWQiOiI2MzJjMGUyYTEyNjJiOGNkOWQxNzRlNDIiLCJxdWFudGl0eSI6Miwic2VsZWN0ZWQiOmZhbHNlLCJfaWQiOiI2M2E1MWE5NDAzY2U1YTNlZTVmZGYzMDkifSx7InByb2R1Y3REZXRhaWxJZCI6IjYzMmMwZDNlMTI2MmI4Y2Q5ZDE3NGQ5YSIsInF1YW50aXR5IjoxLCJzZWxlY3RlZCI6ZmFsc2UsIl9pZCI6IjYzYTUxYWQ1MDNjZTVhM2VlNWZkZjM4ZSJ9XSwicHJvZHVjdCI6W3sicHJvZHVjdElkIjoiNjJlZTIzOTk5NzYxOGNmODQwM2Q0NjRmIiwicXVhbnRpdHkiOjEsInNlbGVjdGVkIjpmYWxzZSwiX2lkIjoiNjNhNTFhNmEwM2NlNWEzZWU1ZmRmMmJiIn0seyJwcm9kdWN0SWQiOiI2MzA4YTFhMWRkM2IxNmQzZTM1YTljNGIiLCJxdWFudGl0eSI6MSwic2VsZWN0ZWQiOmZhbHNlLCJfaWQiOiI2M2E1MWFjZjAzY2U1YTNlZTVmZGYzOGIifV0sImNyZWF0ZWRBdCI6IjIwMjItMTItMTZUMDk6MzE6MTkuMjE2WiIsInVwZGF0ZWRBdCI6IjIwMjItMTItMjNUMDQ6MjE6MjUuOTY4WiIsIl9fdiI6MH0sIm5hdGlvbmFsaXR5IjoiVmlldCBOYW0iLCJpYXQiOjE2NzE3NzAyOTYsImV4cCI6MTY3MTg1NjY5Nn0.WPx67CQhPRM-ZiZclgdJ_E2c1VodKx9tjwzfJ6-ehmg'
            }
        }).then((res)=>{
            console.log(res, 19)
            setListProductDetailId(res.data.cart.listProduct)
            let total = []
            res.data.cart.listProduct.forEach((item,index)=>{
                    total.push( (item.quantity * item.productDetailId.price)) 
            })
            res.data.cart.product.forEach((item,index)=>{
                console.log(26,item)
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