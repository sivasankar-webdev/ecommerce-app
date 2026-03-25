import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWishlistAPI, removeWishlistAPI, updateQtyAPI, addToWishlistAPI, clearWishlistAPI } from "./wishlistAPI";

export const addItem = createAsyncThunk("wishlist/addItem", async (data) => {
    const res = await addToWishlistAPI(data);
    return res.data;
  }
);


export const fetchWishlist = createAsyncThunk("wishlist/fetch", async () => {
    const res = await fetchWishlistAPI();
    return res.data;
  }
);

export const removeItem = createAsyncThunk("wishlist/remove", async (id) => {
    const res = await removeWishlistAPI(id);
    return res.data;
  }
);

export const updateQty = createAsyncThunk("wishlist/updateQty", async ({ id, qty }) => {
    const res = await updateQtyAPI(id, qty);
    return res.data;
  }
);

export const clearWishlist = createAsyncThunk("wishlist/clear", async () => {
  const res = await clearWishlistAPI();
  return res.data; 
});

const slice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(updateQty.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(clearWishlist.fulfilled,  (state, action) => { 
        state.loading = false; state.items = action.payload; 
      });
  },
});

export default slice.reducer;