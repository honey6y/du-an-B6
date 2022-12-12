import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartNumber: 0,
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
  },
});

export const { getCart, getCartNumber } = cartSlice.actions;

export default cartSlice.reducer;