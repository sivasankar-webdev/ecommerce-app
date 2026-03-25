import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../../features/auth/authSlice";
import cartReducer from "../../features/cart/cartSlice";
import wishlistReducer from "../../features/wishlist/wishlistSlice";
//import productReducer from "../features/product/productSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    //product: productReducer,
  },
});

export default store;