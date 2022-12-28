import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { Row, Col } from "antd";
import styles from "./ContainerPdCategory.module.scss";
import ProductError from "../product-Error/ProductError";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { openModal } from "../../../features/counter/ModalSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function ContainerPdCategory({ data }) {
  const nav = useNavigate();
  const cx = classNames.bind(styles);
  const dispatch = useDispatch();
  return (
    <>
      <div className={cx("products-container")}>
        <div className={cx("wrapper")}>
          <Row gutter={[10, 10]}>
            {data === null ? <p>Đang tải dữ liệu</p> : data.length !== 0 ? data.map((item, index) => {
              return (
                <Col xs={24} sm={12} md={8} lg={6} xl={4} key={item._id}>
                    <div className={cx("product")} >
                      <LazyLoadImage 
                      className={cx("product-img")}
                      src={item.thump[0]}
                      alt=""
                      effect="blur"
                      placeholderSrc="https://dummyimage.com/640x360/fff/aaa
                      "
                      onClick={()=>nav(`/detail/${item._id}`)}
                      />
                      <div>
                        <p className={cx("product-name")} onClick={()=>nav(`/detail/${item._id}`)}>{item.productName}</p>
                        <h4 className={cx("product-price")}>
                          {item.price && item.price.toLocaleString()}&nbsp;đ
                        </h4>
                        <button
                          className={cx("btn-buy")}
                          onClick={() => {
                            dispatch(openModal(item))
                          }}
                        >
                          <span>Mua</span>
                        </button>
                      </div>
                    </div>
                  </Col>
              );
              }) : <ProductError />
            } 
          </Row>
        </div>
      </div>
    </>
  );
}
