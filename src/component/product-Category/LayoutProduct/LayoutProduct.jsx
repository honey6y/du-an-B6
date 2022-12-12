import React from 'react'
import { Link } from 'react-router-dom'
import style from "./LayoutProduct.module.css"

export default function LayoutProduct() {
  return (
    <div className={style.layout_container}>
        <div className={style.layout_box}>
            <div className={style.layout_header}>
                <div className={style.layout_header_title}>
                    <Link to="/" className={style.change_home}>Trang chủ</Link>
                    <span className={style.layout_seperate}>/</span>
                    <span className={style.layout_nameLogin}>Iphone</span>
                </div>
            </div>
            <div className={style.layout_body}>
                <div className={style.layout_filter}>
                    <div className={style.price_product}>
                        <div className={style.filter_price_name}>
                            Khoảng Giá
                        </div>
                        <div className={style.price_filter_check}>
                            <div className={style.check_price_child}>
                                <input className={style.check_product_price} type="radio" name='price_product'/>
                                <span className={style.price_range}>Nhỏ hơn 1,000,000
                                </span>
                            </div>
                            <div className={style.check_price_child}>
                                <input className={style.check_product_price} type="radio" name='price_product'/>
                                <span className={style.price_range}>Từ 1,000,000 - 10,000,000</span>
                            </div>
                            <div className={style.check_price_child}>
                                <input className={style.check_product_price} type="radio" name='price_product'/>
                                <span className={style.price_range}>Từ 10,000,000 - 20,000,000</span>
                            </div>
                            <div className={style.check_price_child}>
                                <input className={style.check_product_price} type="radio" name='price_product'/>
                                <span className={style.price_range}>Từ 20,000,000 - 40,000,000</span>
                            </div>
                            <div className={style.check_price_child}>
                                <input className={style.check_product_price} type="radio" name='price_product'/>
                                <span className={style.price_range}>Từ 40,000,000 trở lên</span>
                            </div>
                        </div>
                    </div>
                    <div className={style.filter_box_product_others}>
                        <div className={style.filter_product_trademark}>
                            Thương hiệu
                        </div>
                        <div className={style.trademark_check}>
                            <div className={style.check_price_child}>
                                <input className={style.check_product_price} type="radio" name='a'/>
                                <span className={style.price_range}>Apple</span>
                            </div>
                            <div className={style.check_price_child}>
                                <input className={style.check_product_price} type="radio" name='a'/>
                                <span className={style.price_range}>Xiaomi</span>
                            </div>
                            <div className={style.check_price_child}>
                                <input className={style.check_product_price} type="radio" name='a'/>
                                <span className={style.price_range}>SamSung</span>
                            </div>
                            <div className={style.check_price_child}>
                                <input className={style.check_product_price} type="radio" name='a'/>
                                <span className={style.price_range}>AKKO</span>
                            </div>
                            <div className={style.check_price_child}>
                                <input className={style.check_product_price} type="radio" name='a'/>
                                <span className={style.price_range}>Asus</span>
                            </div>
                            <div className={style.check_price_child}>
                                <input className={style.check_product_price} type="radio" name='a'/>
                                <span className={style.price_range} >Dell</span>
                            </div>
                            <div className={style.check_price_child}>
                                <input className={style.check_product_price} type="radio" name='a'/>
                                <span className={style.price_range}>E-DRA</span>
                            </div>
                            <div className={style.check_price_child}>
                                <input className={style.check_product_price} type="radio" name='a'/>
                                <span className={style.price_range}>Công thái học</span>
                            </div>
                        </div>
                    </div>
                    <div className={style.filter_box_product_others}>
                        <div className={style.filter_product_others}>
                            Sản phẩm khác
                        </div>
                        <div className={style.others_check}>
                            <div>
                                <input type="radio" name='a'/>
                                <span>Điện Thoại</span>
                            </div>
                            <div>
                                <input type="radio" name='a'/>
                                <span>Laptop</span>
                            </div>
                            <div>
                                <input type="radio" name='a'/>
                                <span>Keyboard</span>
                            </div>
                            <div>
                                <input type="radio" name='a'/>
                                <span>Chuột</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.layout_product}>
                    <div className={style.layout_product_header}>
                        <div className={style.layout_product_name}>
                            Bao Da-Ốp Lưng Iphone
                        </div>
                    </div>
                    <div className={style.product_sort}>
                        Sắp Xếp
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
