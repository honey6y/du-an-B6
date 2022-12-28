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
        
      })
        .then((res) => {
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


