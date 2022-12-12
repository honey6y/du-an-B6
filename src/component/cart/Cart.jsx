import React from "react";
import { Breadcrumb, Space, Table, Button, Input } from "antd";
import { useEffect, createRef, useState } from "react";
import styles from "./Cart.module.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCart, getCartNumber } from "../../cartSlice";
function Cart() {
  const cartData = useSelector((state) => state.cart.Carts);
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
        `https://shope-b3.thaihm.site/api/cart/get-loged-in-cart`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      let data = res.data.cart.listProduct;
      let total = data.reduce((total, data) => {
        return total + data?.productDetailId.price * data?.quantity;
      }, 0);
      let cartNumber = data.reduce((total, product) => {
        return total + product.quantity;
      }, 0);
      setTotal(total);
      dispatch(getCartNumber(cartNumber));
      dispatch(getCart(data));
    } catch (err) {
      console.log(err);
    }
  }

  const columns = [
    {
      title: "Thong tin chi tiet san pham ",
      dataIndex: "image",
      key: "image",
      colSpan: 2,
      render: (_, { image }) => (
        <img
          style={{ width: "100px" }}
          src={`https://shope-b3.thaihm.site/${image}`}
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
          <p>Phiên bản: {color}</p>
          <Button style={{ color: "red" }} onClick={e => {
            deleteFromCart(key)
          }}>Xóa</Button>
        </>
      ),
    },
    {
      title: "Don gia",
      dataIndex: "address",
      key: "address",
      render: (_, { price }) => <h4 className={styles.currency}>{price}đ</h4>,
    },
    {
      title: "So luong",
      key: "quantity",
      dataIndex: "tags",
      render: (_, { quantity, key }) => (
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
              updateCart(key, e.target.value)
            }}
          ></Input>
        </>
      ),
    },
    {
      title: "Tong gia",
      key: "total",
      render: (_, { total }) => <h4 size="middle" className={styles.currency}>{total}đ</h4>,
    },
  ];

  const data = cartData.map((data) => ({
    key: data?.productDetailId._id,
    name: data?.productDetailId.productId.productName,
    color: data?.productDetailId.color,
    image: data?.productDetailId.productId.thumbnail,
    price: data?.productDetailId.price,
    quantity: data?.quantity,
    total: data?.productDetailId.price * data?.quantity,
  }));

  function updateCart(key, value) {
    axios
      .patch(
        "https://shope-b3.thaihm.site/api/cart/update-cart-quantity",
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

  function deleteFromCart(key) {
    axios
      .patch(
        "https://shope-b3.thaihm.site/api/cart/remove-from-cart",
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
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item style={{ color: "red" }}>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="/cart">Cart</a>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className={styles.container}>
        <h2>GIỎ HÀNG</h2>
        <Table pagination={false} columns={columns} dataSource={data} />
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
                <span className={styles.currency}>{total}đ</span>
              </Space>
            </div>
            <br />
            <Space>
              <Button
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
    </>
  );
}

export default Cart;
