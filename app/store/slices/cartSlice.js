import { createSlice } from '@reduxjs/toolkit';

// load cart from local storage
const loadCartFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }
  return [];
};

const initialState = {
  items: loadCartFromLocalStorage(),
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingItem = state.items.find(
        (item) => item.idMeal === action.payload.idMeal
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      // Save cart to local storage
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(
        (item) => item.idMeal !== action.payload
      );
      // Save cart to local storage
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    updateQuantity(state, action) {
      const { idMeal, quantity } = action.payload;
      const item = state.items.find((item) => item.idMeal === idMeal);
      if (item) {
        item.quantity = quantity;
        // Save cart to local storage
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },
    clearCart(state) {
      state.items = [];
      // Save cart to local storage
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
