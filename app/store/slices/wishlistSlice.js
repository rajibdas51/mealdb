import { createSlice } from '@reduxjs/toolkit';

// load wishlist from local storage
const loadWishlistFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const wishlist = localStorage.getItem('wishlist');
    return wishlist ? JSON.parse(wishlist) : [];
  }
  return [];
};

const initialState = {
  items: loadWishlistFromLocalStorage(),
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist(state, action) {
      const existingItem = state.items.find(
        (item) => item.idMeal === action.payload.idMeal
      );
      if (!existingItem) {
        state.items.push(action.payload);
      }
      // Save wishlist to local storage
      localStorage.setItem('wishlist', JSON.stringify(state.items));
    },
    removeFromWishlist(state, action) {
      state.items = state.items.filter(
        (item) => item.idMeal !== action.payload
      );
      // Save wishlist to local storage
      localStorage.setItem('wishlist', JSON.stringify(state.items));
    },
    clearWishlist: (state) => {
      state.items = [];
      // Save wishlist to local storage
      localStorage.setItem('wishlist', JSON.stringify(state.items));
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
