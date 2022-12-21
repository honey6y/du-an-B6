import styles from "./ProductContent.module.scss";
import classNames from "classnames/bind";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Row, Col, Modal } from "antd";
import { useNavigate } from "react-router-dom";

function ProductContent() {
  const nav = useNavigate()
  const cx = classNames.bind(styles);
  const [list, setList] = useState([]);
  const [detail, setDetail] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [control, setControl] = useState(0)

  useEffect(() => {
    axios({
      method: "get",
      url: "https://shope-b3.thaihm.site/api/product/get-all-products",
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzkyZTYxNmZjYTM3MmRiMzhiNTE5MzgiLCJ1c2VybmFtZSI6ImJhYnk0ZXZlcjEiLCJlbWFpbCI6ImJhYnk0ZXZlcjFAZ21haWwuY29tIiwiYXZhdGFyIjoiaHR0cHM6Ly9tZWRpYS5pc3RvY2twaG90by5jb20vcGhvdG9zL2J1c2luZXNzbWFuLXNpbGhvdWV0dGUtYXMtYXZhdGFyLW9yLWRlZmF1bHQtcHJvZmlsZS1waWN0dXJlLXBpY3R1cmUtaWQ0NzYwODUxOTg_az0yMCZtPTQ3NjA4NTE5OCZzPTYxMng2MTImdz0wJmg9OEozVmdPWmFiX09pWW9JdVpmaU1JdnVjRllCOHZXWWxLblNqS3VLZVlRTT0iLCJyb2xlIjoidXNlciIsImNyZWF0ZWRBdCI6IjIwMjItMTItMDlUMDc6Mzk6MDIuNjg1WiIsInVwZGF0ZWRBdCI6IjIwMjItMTItMDlUMDc6Mzk6MDIuNjg1WiIsIl9fdiI6MCwiaWF0IjoxNjcwNTcxNjc0fQ.yXvH8dEvfswAZeyICPmJhWr4IWg-d7kysTtwNoP-jnc",
      },
    })
      .then((res) => {
        setList(res.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const showModal = (item) => {
    console.log(item)

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
          {list.map((item, index) => {
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
          })}
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
                <a className={cx('link-product')} href="#">Hoặc xem chi tiết</a>
              </div>
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  );
}

export default ProductContent;

// (
//   <div className={cx("wrapper")}>
//     ProductContent
//     {list.map((item, index) => (
//       <div className={cx("brand")} key={index}>
//         <div className={cx("brand-name")}>{item[0]}</div>
//         <div className={cx("brand-items")}>
//           {item[1].map((Element, index) => {
//             return (
//               <div className={cx("brand-item")} key={Element._id}>
//                 <img
//                   src={`https://shope-b3.thaihm.site/${Element.thumbnail}`}
//                   alt=""
//                   width="100%"
//                 />
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     ))}
//   </div>
// );
