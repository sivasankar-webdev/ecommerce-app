import API from "../../services/api";

export const fetchCartAPI = () => API.get("/cart");
export const addToCartAPI = (data) => API.post("/cart", data);
export const removeFromCartAPI = (id) => API.delete(`/cart/${id}`);
export const updateCartQtyAPI = (id, qty) => API.put(`/cart/${id}`, { qty });
export const clearCartAPI = () => API.delete("/cart");
export const applyCouponAPI = (code) => API.post("/cart/coupon", { code });
