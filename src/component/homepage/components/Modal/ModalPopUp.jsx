import style from "./Modal.module.scss";
import classNames from "classnames/bind";
import { Modal, Row, Col } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../../features/counter/ModalSlice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function ModalPopUp() {
    const dispatch = useDispatch()
    const modalState = useSelector((state)=>state.modal)
    const cx = classNames.bind(style)
    const [control, setControl] = useState(1)
    const [viewPopupImgSrc , setViewPopupImgSrc] = useState('')
    const [currentColor, setCurrentColor] = useState('')
    const [dataRender, setDataRender] = useState([])
    const [currentOption , setCurrentOption] = useState({})
    const [newDataFormat , setNewDataFormat] = useState({})
    const [currentListSize , setCurrentListSize] = useState([])
    const [detailImg, setDetailImg]= useState([])
    const [listKeyOption , setListKeyOption] = useState([])
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOWMzYWU3NDZjYTIyZWM4NGM2NDk1MSIsImF2YXRhciI6Imh0dHBzOi8vc3QzLmRlcG9zaXRwaG90b3MuY29tLzE3Njc2ODcvMTY2MDcvdi80NTAvZGVwb3NpdHBob3Rvc18xNjYwNzQ0MjItc3RvY2staWxsdXN0cmF0aW9uLWRlZmF1bHQtYXZhdGFyLXByb2ZpbGUtaWNvbi1ncmV5LmpwZyIsImVtYWlsIjoiYmFieTRldmVyMTFAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJjYXJ0Ijp7Il9pZCI6IjYzOWMzYWU3NDZjYTIyZWM4NGM2NDk1MyIsInVzZXJJZCI6IjYzOWMzYWU3NDZjYTIyZWM4NGM2NDk1MSIsImxpc3RQcm9kdWN0IjpbXSwicHJvZHVjdCI6W3sicHJvZHVjdElkIjoiNjMwOGExYTFkZDNiMTZkM2UzNWE5YzRiIiwicXVhbnRpdHkiOjEsInNlbGVjdGVkIjpmYWxzZSwiX2lkIjoiNjNhNTFhY2YwM2NlNWEzZWU1ZmRmMzhiIn1dLCJjcmVhdGVkQXQiOiIyMDIyLTEyLTE2VDA5OjMxOjE5LjIxNloiLCJ1cGRhdGVkQXQiOiIyMDIyLTEyLTIzVDA0OjQ1OjM0Ljc3MloiLCJfX3YiOjB9LCJuYXRpb25hbGl0eSI6IlZpZXQgTmFtIiwiaWF0IjoxNjcxNzcyODg0LCJleHAiOjE2NzE4NTkyODR9.LRK9_EsT7ZumVKdDd_IXNfxzjQpDWCCy1LsPv_bhmMI`
   
    useEffect(()=>{
      let newData = modalState.productItem.productDetailId?.map(item => {
        let newDataItem = {};
        newDataItem.color = item.option[0]?.value
        newDataItem.size = item.option[1]?.value
        newDataItem.id = item._id
        newDataItem.price = item.price
        return newDataItem;
      });
      console.log('newData',newData)
      setNewDataFormat(newData)
      if(modalState.productItem.productDetailId){
        let totayKeyOption = []
        modalState.productItem.productDetailId[0]?.option.map(item => {
          totayKeyOption.push(item.optionName)
        })
        console.log('totalkey', totayKeyOption)
        setListKeyOption(totayKeyOption)
      }
      setCurrentOption(newData ? newData[0] : {})
      let dataRenderBuffer = {};
      let productDetailId = modalState.productItem.productDetailId ? modalState.productItem.productDetailId : []
      productDetailId.forEach(item => {
        if (!dataRenderBuffer[item.option[0].value]) {
          dataRenderBuffer[item.option[0].value] = {}
          dataRenderBuffer[item.option[0].value].listImg = item.listImg
          dataRenderBuffer[item.option[0].value].listSize = [item.option[1]?.value]
        } else {
          dataRenderBuffer[item.option[0].value].listSize.push(item.option[1].value)
        }
      })
      console.log('dataBuffer',dataRenderBuffer)
      let resultRender = Object.entries(dataRenderBuffer)
      console.log( 'dataRender',resultRender)
      setDataRender(resultRender)
      console.log( 49, resultRender[0] ? resultRender[0][1].listSize : null)
      setCurrentListSize(resultRender[0] ? resultRender[0][1].listSize : null)
      setCurrentColor(resultRender[0] ?  resultRender[0][0] : null)
      // setCurrentSize(resultRender[0] ? resultRender[0][1].listSize : null)
      console.log(modalState.productItem.productDetailId, 55)
    },[modalState.value])
    const handleCancel = () => {
      dispatch(closeModal())
      setViewPopupImgSrc(null)
      setControl(1)
      setDetailImg([])
    };
  function findCurrentOption(currentColor , currentSize) {
      let currentOption = newDataFormat.filter((item,index)=>{
        return item.color === currentColor && item.size === currentSize
        })
        setCurrentOption(currentOption[0])
    }
   const handleColorProduct = (item) => {
    console.log(item,71)
    setCurrentColor(item[0])
    setCurrentListSize(item[1].listSize)
    setDetailImg(item[1].listImg)
    setViewPopupImgSrc(item[1].listImg[0])
    findCurrentOption(item[0],item[1].listSize[0])
    console.log(76 ,currentOption)
    console.log(77, item[0], currentOption.name)
   };
   console.log(currentOption)
   const handleSizeProduct = (item) => {
    findCurrentOption(currentColor, item)
   };

  const handleAddToCart = () => {
    if (currentOption) {
      axios({
        method: 'patch',
        url: 'https://ecommerce.nodemy.vn/api/v1/cart/add-to-cart/639c3ae746ca22ec84c64953',
        headers: { 
          'Authorization': token, 
          'Content-Type': 'application/json'
        },
      })
        .then((res) => {
          handleCancel();
          toast.success("Thêm vào giỏ hàng thành công !!!", {
            icon: "🚀",
            autoClose: 5000,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios({
        method: 'patch',
        url: 'https://ecommerce.nodemy.vn/api/v1/cart/add-to-cart/639c3ae746ca22ec84c64953',
        headers: { 
          'Authorization': token, 
          'Content-Type': 'application/json'
        },
      })
        .then((res) => {
          handleCancel();
          toast.success("Thêm vào giỏ hàng thành công ", {
            icon: "🚀",
            autoClose: 5000,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handleDecrease = () => {
    setControl((pre) => {
      pre = pre < 2 ? (pre = 1) : (pre -= 1);
      return pre;
    });
  };
  const handleIncrease = () => {
    setControl((pre) => {
      return (pre += 1);
    });
  };
  return (
    <>
      <ToastContainer />
      <Modal
        open={modalState.value}
        onCancel={handleCancel}
        width={800}
        bodyStyle={{ height: "600px" }}
        footer={null}>
        <div>
          <Row gutter={[10, 10]}>
            <Col span={12}>
              <div className={cx("product-bigimg-popup")}>
                <img
                  src={viewPopupImgSrc || (modalState.productItem.thump ? modalState.productItem.thump[0] : null)}
                  alt=""
                  width="100%"
                />
              </div>
              <div className={cx("product-smallimg-popup")}>
                {detailImg.map((item, index) => {
                  return (
                    <img
                      src={item}
                      alt=""
                      width="30%"
                      key={index}
                      onClick={() => setViewPopupImgSrc(item)}
                    />
                  );
                })}
              </div>
            </Col>
            <Col span={12}>
              <div className={cx("product-info-popup")}>
                <h2 className={cx("product-name-popup")}>
                  Tên sản phẩm :{modalState.productItem.productName}
                </h2>
                <p className={cx("product-brand-popup")}>
                  Hãng :{" "}
                  {modalState.productItem.brandId
                    ? modalState.productItem.brandId.brandName
                    : null}{" "}
                </p>
                {listKeyOption[0] ?
                <div className={cx('product-color-box-popup')}>
                  <p className={cx('product-color-name')}>{listKeyOption[0]}</p>
                    <div className={cx('products-color-box')}>
                        {dataRender.map((item,index)=>{
                        return <div key={index} className={item[0] === currentOption.color ?  cx('product-color-active') : cx('product-color')} onClick={()=>handleColorProduct(item)}>
                        <img className={cx('img-product-color')} src={item[1].listImg[0]} alt="" height='100%' width="50%"/>
                        <img className={item[0] === currentOption.color ? cx('img-active-color') :cx('img-not-active-color')} src="https://theme.hstatic.net/1000205427/1000509844/14/select-pro.png?v=56" alt="" />
                        <p className={cx('name-color-product')}>{item[0]}</p>
                     </div>
                  })}
                  </div>
               </div> : null }
               {listKeyOption[1] ? 
               <div className={cx('product-size-box-popup')}>
                   <p className={cx('product-size-name')}>{listKeyOption[1]}</p>
                   <div className={cx('product-size-box')}>
                     {currentListSize ? currentListSize.map((item,index)=>{
                      return<div key={Math.random()} className={item === currentOption.size ? cx('product-size-active') : cx('product-size')} onClick={()=>handleSizeProduct(item)}>
                      <img className={item === currentOption.size ? cx('img-active-size') :cx('img-not-active-size')} src="https://theme.hstatic.net/1000205427/1000509844/14/select-pro.png?v=56" alt="" />
                      <p>{item}</p>
                   </div>
                 }) : null}
                   </div>
               </div> : null }
                <p className={cx('quantity-box')}>Số lượng</p>
                <div className={cx('control-box')}>
                  <div className={cx('btn-decrease')} onClick={handleDecrease}>-
                  </div>
                </div>
                <button
                  className={cx("btn-add")}
                  onClick={() => handleAddToCart()}>
                  Thêm vào giỏ
                </button>
                <Link
                  className={cx("link-product")}
                  to={`/detail/${modalState.productItem._id}`}>
                  Hoặc xem chi tiết
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
}
export default ModalPopUp;
