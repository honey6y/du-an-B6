import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //id cart
  cartNumber: 0,
  cartId:'',
  listProduct: [],
  product:[]
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getListProduct: (state, actions) => {
      state.listProduct = actions.payload;
      // console.log(state.Carts);
    },
    getProduct: (state, actions) => {
      state.product = actions.payload;
      // console.log(state.Carts);
    },
    getCartNumber: (state, actions) => {
      state.cartNumber = actions.payload;
      // console.log(state.cartNumber);
    },
    addToCart: (state, actions)=>{
      state.cartNumber += actions.payload;
    },
    getCartId: (state, actions)=>{
      state.cartId = actions.payload;
    }
  },
});

export const { getListProduct, getProduct, getCartNumber, getCartId } = cartSlice.actions;

export default cartSlice.reducer;
