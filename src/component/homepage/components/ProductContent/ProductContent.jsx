import styles from "./ProductContent.module.scss";
import classNames from "classnames/bind";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Row, Col } from "antd";
import {LazyLoadImage} from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useDispatch , useSelector } from "react-redux";
import { openModal } from "../../../../features/counter/ModalSlice"; 
import GalleryCarousel from "../GalleryCarousel/GalleryCarousel";
import { useNavigate } from "react-router-dom";

function ProductContent() {
  const nav = useNavigate()
  const cx = classNames.bind(styles);
  const dispatch = useDispatch()
  const [list, setList] = useState([]);
  const [dataSlider , setDataSlider] = useState([])
  const [loadMoreData , setLoadMoreData] = useState(12)
    useEffect(() => {
      axios({
        method: "get",
        url: `https://ecommerce.nodemy.vn/api/v1/product/get-page-products?page=1&size=${loadMoreData}`,
        headers: {
          Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOWMzYWU3NDZjYTIyZWM4NGM2NDk1MSIsImF2YXRhciI6Imh0dHBzOi8vc3QzLmRlcG9zaXRwaG90b3MuY29tLzE3Njc2ODcvMTY2MDcvdi80NTAvZGVwb3NpdHBob3Rvc18xNjYwNzQ0MjItc3RvY2staWxsdXN0cmF0aW9uLWRlZmF1bHQtYXZhdGFyLXByb2ZpbGUtaWNvbi1ncmV5LmpwZyIsImVtYWlsIjoiYmFieTRldmVyMTFAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJjYXJ0Ijp7Il9pZCI6IjYzOWMzYWU3NDZjYTIyZWM4NGM2NDk1MyIsInVzZXJJZCI6IjYzOWMzYWU3NDZjYTIyZWM4NGM2NDk1MSIsImxpc3RQcm9kdWN0IjpbXSwicHJvZHVjdCI6W10sImNyZWF0ZWRBdCI6IjIwMjItMTItMTZUMDk6MzE6MTkuMjE2WiIsInVwZGF0ZWRBdCI6IjIwMjItMTItMjBUMTU6MDQ6NTMuNjA2WiIsIl9fdiI6MH0sIm5hdGlvbmFsaXR5IjoiVmlldCBOYW0iLCJpYXQiOjE2NzE1NDg3MDMsImV4cCI6MTY3MTYzNTEwM30.aJ4KmaOtT2DSTNeN8gVf_M3YHzA35bCblukceAsAcBI',
        },
      })
        .then((res) => {
          console.log(res)
          const listProductRender = res.data.listPageProduct
          listProductRender.forEach((item)=>{
            if(!item.thump[0]?.includes('http')){
                item.thump[0] = `${process.env.REACT_APP_SRC_IMG}${item.thump[0]}`
            }
          })
          setList(listProductRender);
          setDataSlider(listProductRender)
        })
        .catch((error) => {
          console.log(error);
        });
    }, [loadMoreData]);
    
  return (
    <>
      <GalleryCarousel dataProps={dataSlider} title={'Flash Sale'} isSale={true} />
      <div className={cx("products-container")}>
        <div className={cx("wrapper")}>
            <Row gutter={[10, 10]}>
              {list.map((item, index) => {
                return (
                  <Col span={4} key={item._id}>
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
              })}
            </Row>
            <button className={cx('btn-load-data')} onClick={()=>setLoadMoreData((old)=>old += 12)}>
            Xem thêm
            </button>
        </div>
      </div>
    </>
  );
}

export default ProductContent;


