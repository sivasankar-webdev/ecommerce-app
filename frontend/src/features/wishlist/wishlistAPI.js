import API from "../../services/api";

export const fetchWishlistAPI = () => API.get("/wishlist");
export const removeWishlistAPI = (id) => API.delete(`/wishlist/${id}`);
export const updateQtyAPI = (id, qty) => API.put(`/wishlist/${id}`, { qty });
export const addToWishlistAPI = (data) => API.post("/wishlist", data);
export const clearWishlistAPI = () => API.delete("/wishlist");