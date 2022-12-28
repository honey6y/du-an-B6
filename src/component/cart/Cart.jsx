import React from "react";
import {
  Breadcrumb, Space, Table, Button, Input, Empty, Row, Col
} from "antd";
import { useEffect, createRef, useState } from "react";
import styles from "./Cart.module.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getListProduct, getProduct, getCartId, getCartNumber } from "../../features/counter/cartSlice";
function Cart() {
  const listProduct = useSelector((state) => state.cart.listProduct);
  const product = useSelector((state) => state.cart.product);
  const cartId = useSelector((state) => state.cart.cartId);
  const totalCart = useSelector((state) => state.cart.cartNumber);
  let [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quantityInput = createRef();
  useEffect(() => {
    init();
    return () => { };
  }, [totalCart]);

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
      let totalProduct = product.reduce((total, data) => {
        return total + data?.productId.price * data?.quantity;
      }, 0);
      let productNumber = product.reduce((total, data) => {
        return total + data?.quantity;
      }, 0);
      let listProductNumber = listProduct.reduce((total, data) => {
        return total + data?.quantity;
      }, 0);
      dispatch(getCartId(res.data.cart._id))
      dispatch(getCartNumber(productNumber + listProductNumber))
      setTotal(totalListProduct + totalProduct);
      dispatch(getListProduct(listProduct));
      dispatch(getProduct(product));
    } catch (err) {
      console.log(err);
    }
  }

  const columns = [
    {
      dataIndex: "responsiveData",
      key: "responsiveData",
      render: (_, { key, name, price, quantity, image, color }) =>
        <Row span={24}>
          <Col span={4}>
            <img
              style={{ width: "100%", padding: "10px", marginTop: "50%" }}
              src={`${image}`}
              alt="#"
            ></img>
          </Col>
          <Col span={20}>
            <h3>{name}</h3>
            {color && <p>Phiên bản: {color}</p>}
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
            <p style={{ color: "red", fontSize: "13px", paddingLeft: "3px", margin: "0px", cursor: "pointer" }} onClick={e => {
              color ?
                deleteFromListProduct(key)
                : deleteFromProduct(key)
            }}>Xóa</p>
            <h4 className={styles.currency}>
              {price.toLocaleString()}đ
            </h4>
          </Col>
        </Row>,
      responsive: ['xs'],
    },
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
      responsive: ['sm'],
    },
    {
      title: "name",
      colSpan: 0,
      dataIndex: "name",
      render: (_, { name, color, key }) => (
        <>
          <h3 style={{ fontSize: "" }}>{name}</h3>
          {color && <p>Phiên bản: {color}</p>}
          <Button style={{ color: "red" }} onClick={e => {
            color ?
              deleteFromListProduct(key)
              : deleteFromProduct(key)
          }}>Xóa</Button>
        </>
      ),
      responsive: ['sm'],
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (_, { price }) => <h4 className={styles.currency}>{price.toLocaleString()}đ</h4>,
      responsive: ['sm'],
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
      responsive: ['sm'],
    },
    {
      title: "Tổng giá",
      key: "total",
      render: (_, { total }) => <h4 size="middle" className={styles.currency}>{total.toLocaleString()}đ</h4>,
      responsive: ['md'],
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
        <div style={{ backgroundColor: "#fafafa" }}>
          <Breadcrumb>
            <Breadcrumb.Item >
              <a href="/" style={{ color: "red", textDecoration: "none" }}>Home</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/cart" style={{ textDecoration: "none" }}>Cart</a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className={styles.container}>
          <h2>GIỎ HÀNG</h2>
          {tableData.length !== 0 ? <Table pagination={false} columns={columns} dataSource={tableData} /> : <Empty
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
            <Button type="primary" style={{ backgroundColor: "#cd1818" }} onClick={() => { navigate(`/`) }}>Shop Now</Button>
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
  );
}

export default Cart;
