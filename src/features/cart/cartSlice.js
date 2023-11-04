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


export const totalQuantity = state =>
  state.cart.cart.reduce((sum, item) => {
    return sum + item.quantity
  }, 0)

export const totalPrice = state =>
  state.cart.cart.reduce((sum, item) => {
    return sum + item.totalPrice
  }, 0)


export const getCart = state => state.cart.cart;
export const getUserName = state => state.user.userName;

export const getItemQuantity = function (id) {
  return function (state) {
    return state.cart.cart.find(item => item.pizzaId === id)?.quantity ?? 0
  }
}