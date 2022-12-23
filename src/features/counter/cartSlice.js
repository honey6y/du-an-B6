import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //id cart
  cartNumber: 0,
  cartId:'',
  Carts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getCart: (state, actions) => {
      state.Carts = actions.payload;
      // console.log(state.Carts);
    },
    getCartNumber: (state, actions) => {
      state.cartNumber = actions.payload;
      // console.log(state.cartNumber);
    },
    addToCart: (state, actions)=>{
      state.cartNumber += actions.payload;
    }
    // getIdCart: (){}
  },
});

export const { getCart, getCartNumber } = cartSlice.actions;

export default cartSlice.reducer;
