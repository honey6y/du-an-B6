import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/counter/cartSlice";
import ModalSlice from "./features/counter/ModalSlice";

export default configureStore({
  reducer: {
    cart: cartSlice,
    modal : ModalSlice,
  },
});
