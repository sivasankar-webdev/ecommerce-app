import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCartAPI, addToCartAPI, removeFromCartAPI, updateCartQtyAPI, clearCartAPI, applyCouponAPI } from "./cartAPI";

/* ── Thunks ── */
export const fetchCart = createAsyncThunk("cart/fetch", async () => {
  const res = await fetchCartAPI();
  return res.data;
});

export const addItem = createAsyncThunk("cart/addItem", async (data) => {
  const res = await addToCartAPI(data);
  return res.data;
});

export const removeItem = createAsyncThunk("cart/remove", async (id) => {
  const res = await removeFromCartAPI(id);
  return res.data;
});

export const updateQty = createAsyncThunk("cart/updateQty", async ({ id, qty }) => {
  const res = await updateCartQtyAPI(id, qty);
  return res.data;
});

export const clearCart = createAsyncThunk("cart/clear", async () => {
  const res = await clearCartAPI();
  return res.data;
});

export const applyCoupon = createAsyncThunk("cart/applyCoupon", async (code, { rejectWithValue }) => {
  try {
    const res = await applyCouponAPI(code);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || { message: "Invalid coupon." });
  }
});

/* ── Slice ── */
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    coupon: null,   // { code, discount }
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    /* loading states */
    builder
      .addCase(fetchCart.pending,   (state) => { state.loading = true; })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items  = action.payload.items  ?? action.payload;
        state.coupon = action.payload.coupon ?? null;
      })
      .addCase(fetchCart.rejected,  (state) => { state.loading = false; })

      /* all mutating actions — backend returns updated items array */
      .addCase(addItem.fulfilled, (state, action) => { state.items = action.payload; })
      .addCase(removeItem.fulfilled, (state, action) => { state.items = action.payload; })
      .addCase(updateQty.fulfilled, (state, action) => { state.items = action.payload; })
      .addCase(clearCart.fulfilled, (state) => { state.items = []; state.coupon = null; })
      .addCase(applyCoupon.fulfilled, (state, action) => { state.coupon = action.payload; });
  },
});

export default cartSlice.reducer;
