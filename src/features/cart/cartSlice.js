import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    addItem(state, action) {
      state.cart.push(action.payload)
    },
    removeItem(state, action) {
      state.cart = state.cart.filter(item => item.pizzaId !== action.payload)
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find(item => item.pizzaId === action.payload);

      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find(item => item.pizzaId === action.payload);

      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    clearCart(state) {
      state.cart = []
    }
  }
})

export default cartSlice.reducer;

export const {
  addItem,
  removeItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart
} = cartSlice.actions;