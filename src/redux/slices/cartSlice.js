import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    totalPrice: 0,
    items: [],
  },
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = [...state.items].reduce((acc, obj) => {
        return acc + obj.price * obj.count;
      }, 0);
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.count--;
        state.totalPrice -= findItem.price;
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = [...state.items].reduce((acc, obj) => {
        return acc + obj.price * obj.count;
      }, 0);
    },
    clearItem(state, action) {
      state.totalPrice = 0;
      state.items = [];
    },
  },
});

export const selectCart = (state) => state.cart;
export const selectCartItemById = (id) => (state) => state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, clearItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
