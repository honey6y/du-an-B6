import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value : false,
  productItem : {}
}
export const ModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state,action) => {
     state.value = true
     state.productItem = action.payload
    },
    closeModal: (state,action) => {
      state.value = false
    },
  },
})


export const {openModal ,closeModal  } = ModalSlice.actions

export default ModalSlice.reducer