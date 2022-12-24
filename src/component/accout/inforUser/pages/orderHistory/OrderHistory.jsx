import React from 'react'
import {
  Breadcrumb, Space, Table, Button, Input, Empty
} from "antd";
import { useEffect, createRef, useState } from "react";
import styles from "./OrderHistory.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {getCartId, getCartNumber, getListProduct, getProduct } from '../../../../../features/counter/cartSlice';

export default function OrderHistory() {
  const listProduct = useSelector((state) => state.cart.listProduct);
  const product = useSelector((state) => state.cart.product);
  const cartId = useSelector((state) => state.cart.cartId);
  let [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quantityInput = createRef();
  useEffect(() => {
    init();
    return () => { };
  }, []);


  async function init() {
    try {
      let res = await axios.get(
        `https://ecommerce.nodemy.vn/api/v1/cart/get-loged-in-cart`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      let listProduct = res.data.cart.listProduct;
      let product = res.data.cart.product;
      let totalListProduct = listProduct.reduce((total, data) => {
        return total + data?.productDetailId.price * data?.quantity;
      }, 0);
      let cartNumber = listProduct.reduce((total, product) => {
        return total + product.quantity;
      }, 0);
      dispatch(getCartId(res.data.cart._id));
      setTotal(totalListProduct);
      dispatch(getCartNumber(cartNumber));
      dispatch(getListProduct(listProduct));
      dispatch(getProduct(product));
    } catch (err) {
      console.log(err);
    }
  }

  const columns = [
    {
      title: "Thông tin chi tiết sản phẩm ",
      dataIndex: "image",
      key: "image",
      colSpan: 2,
      render: (_, { image }) => (
        <img
          style={{ width: "100px" }}
          src={`${image}`}
          alt="#"
        ></img>
      ),
    },
    {
      title: "name",
      colSpan: 0,
      dataIndex: "name",
      render: (_, { name, color, key }) => (
        <>
          <h3>{name}</h3>
          {color && <p>Phiên bản: {color}</p>}
          <Button style={{ color: "red" }} onClick={e => {
            color ?
              deleteFromListProduct(key)
              : deleteFromProduct(key)
          }}>Xóa</Button>
        </>
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "address",
      key: "address",
      render: (_, { price }) => <h4 className={styles.currency}>{price.toLocaleString()}đ</h4>,
    },
    {
      title: "Số lượng",
      key: "quantity",
      dataIndex: "tags",
      render: (_, { quantity, key, color }) => (
        <>
          <Input
            ref={quantityInput}
            style={{ width: "50px" }}
            type="number"
            defaultValue={
              quantity
            }
            min={1}
            onChange={(e) => {
              color ?
                updateCartListProduct(key, e.target.value)
                : updateCartProduct(key, e.target.value)
            }}
          ></Input>
        </>
      ),
    },
    {
      title: "Tổng giá",
      key: "total",
      render: (_, { total }) => <h4 size="middle" className={styles.currency}>{total.toLocaleString()}đ</h4>,
    },
  ];

  const listProductData = listProduct.map((data) => ({
    key: data?.productDetailId?._id,
    name: data?.productDetailId.productId.productName,
    color: data?.productDetailId.option[0].value,
    image: data?.productDetailId.productId.thump,
    price: data?.productDetailId.price,
    quantity: data?.quantity,
    total: data?.productDetailId.price * data?.quantity,
  }));

  let productData = product.map((data) => ({
    key: data?.productId?._id,
    name: data?.productId.productName,
    color: null,
    image: data?.productId.thump,
    price: data?.productId.price,
    quantity: data?.quantity,
    total: data?.productId.price * data?.quantity,
  }));

  const tableData = listProductData.concat(productData)
  function updateCartListProduct(key, value) {
    axios
      .patch(
        `https://ecommerce.nodemy.vn/api/v1/cart/update-cart-quantity/${cartId}`,
        {
          productDetailId: key,
          quantity: value,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        init();
      });
  }

  function updateCartProduct(key, value) {
    axios
      .patch(
        `https://ecommerce.nodemy.vn/api/v1/cart/update-cart-quantity/${cartId}`,
        {
          productId: key,
          quantity: value,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        init();
      });
  }

  function deleteFromListProduct(key) {
    axios
      .patch(
        `https://ecommerce.nodemy.vn/api/v1/cart/remove-from-cart/${cartId}`,
        {
          productDetailId: key,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        init();
      });
  }

  function deleteFromProduct(key) {
    axios
      .patch(
        `https://ecommerce.nodemy.vn/api/v1/cart/remove-from-cart/${cartId}`,
        {
          productId: key,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        init();
      });
  }
  return (
    <div style={{ backgroundColor: "#fafafa" }}>
      <div style={{ maxWidth: "1260px", margin: "auto", backgroundColor: "white" }}>
        <div className={styles.container}>
          <h2>GIỎ HÀNG</h2>
          {listProduct !== [] ? <Table pagination={false} columns={columns} dataSource={tableData} /> : <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 60,
            }}
            description={
              <span>
                Your cart is empty
              </span>
            }
          >
            <Button type="primary" style={{ backgroundColor: "#cd1818" }}>Shop Now</Button>
          </Empty>}
          <div className={styles.description}>
            <div className={styles.description_left}>
              <label htmlFor="CartSpecialInstructions">
                Chú thích cho chủ cửa hàng
              </label>
              <textarea
                name="note"
                className={styles.input}
                id="CartSpecialInstructions"
              ></textarea>
            </div>
            <div className={styles.description_right}>
              <div>
                <Space>
                  <span>Tổng tiền</span>
                  <span className={styles.currency}>{total.toLocaleString()}đ</span>
                </Space>
              </div>
              <br />
              <Space>
                <Button
                  type="primary"
                  style={{ backgroundColor: "#cd1818" }}
                  onClick={() => {
                    navigate("/payment");
                  }}
                >
                  Thanh toán
                </Button>
              </Space>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
