
import React, { useState } from 'react'
import classNames from "classnames/bind";
import { Row, Col, Modal } from "antd";
import styles from "./ContainerPdCategory.module.scss";
import ProductError from '../product-Error/ProductError';

export default function ContainerPdCategory({data}) {
  const cx = classNames.bind(styles);
  const [detail, setDetail] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [control, setControl] = useState(0)
  const showModal = (item) => {
    setDetail(item);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleDecrease = () => {
      setControl((pre)=>{
        pre = pre < 1 ? pre = 0 : pre -= 1
        return pre  
      })
  }
  const handleIncrease = () =>{
    setControl((pre)=>{
      return pre += 1
    })
  }
  return (
    <div className={cx("products-container")}>
      <div className={cx("wrapper")}>
        <Row gutter={[15, 15]}>
          { data === null ? 
            <div className={cx("Skeletion")} /> 
              : data.length !== 0 ? data.map((item,_) => {
                  return (
                    <Col span={6} key={item._id}>
                      <div className={cx("product")}>
                        <img
                          className={cx("product-img")}
                          src={`https://shope-b3.thaihm.site/${item.thumbnail}`}
                          alt=""
                        />
                        <div>
                          <p className={cx("product-name")}>{item.productName}</p>
                          <h4 className={cx("product-price")}>
                            {item.price.toLocaleString()}&nbsp;đ
                          </h4>
                          <button
                            className={cx("btn-buy")}
                            onClick={() => {
                              showModal(item);
                            }}
                          >
                            <span>Buy now</span>
                          </button>
                        </div>
                      </div>
                    </Col>
                  );
                }) : (
                  <ProductError />
                ) 
          }
        </Row>
      </div>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        footer={null}
      >
        <div>
          <Row gutter={[10, 10]}>
            <Col span={12}>
              <div className={cx("product-bigimg-popup")}>
                <img
                  src={`https://shope-b3.thaihm.site/${detail.thumbnail}`}
                  alt=""
                  width="100%"
                />
              </div>
              <div className={cx('product-smallimg-popup')}>
                {detail.listDtail ? detail.listDtail.map((element, index) => {
                  return <img
                    src={`https://shope-b3.thaihm.site/${element.listImg[0]}`}
                    alt=""
                    width='30%'

                  />
                }) : null}
              </div>
            </Col>
            <Col span={12}>
              <div className={cx('product-info-popup')}>
                <h2 className={cx('product-name-popup')}>Tên sản phẩm :{detail.productName}</h2>
                <p className={cx('product-brand-popup')}>Hãng : {detail.brand}</p>
                <p className={cx('product-price-popup')}>Giá :{detail.price}</p>
                <div className={cx('product-color-box-popup')}>
                  Màu sắc : {detail.listDtail ? detail.listDtail.map((color, index) => {
                    return <div className={cx('product-color')}>
                      {color.color}
                    </div>
                  }) : null}
                </div>
                <p className={cx('quantity-box')}>Số lượng</p>
                <div className={cx('control-box')}>
                  <div className={cx('btn-decrease')} onClick={handleDecrease}>-
                  </div>
                  <input className={cx('display-control')} value={control} />
                  <div className={cx('btn-increase')} onClick={handleIncrease}>+
                  </div>
                </div>
                <button className={cx('btn-add')}>Thêm vào giỏ</button>
                {/* <a className={cx('link-product')} href="#">Hoặc xem chi tiết</a> */}
              </div>
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  )
}
