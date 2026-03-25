import Wishlist from "../models/wishlist.model.js";

// GET wishlist
export const getWishlist = async (req, res) => {
  let wishlist = await Wishlist.findOne({ user: req.user.id });

  if (!wishlist) {
    wishlist = await Wishlist.create({ user: req.user.id, items: [] });
  }

  res.json(wishlist.items);
};

// ADD item
export const addToWishlist = async (req, res) => {
  const { productId, name, price, image, sku } = req.body;

  let wishlist = await Wishlist.findOne({ user: req.user.id });

  if (!wishlist) {
    wishlist = await Wishlist.create({ user: req.user.id, items: [] });
  }

  const existing = wishlist.items.find(i => i.productId == productId);

  if (existing) {
    existing.qty += 1;
  } else {
    wishlist.items.push({ productId, name, price, image, sku, qty: 1 });
  }

  await wishlist.save();

  res.json(wishlist.items);
};

// REMOVE item
export const removeFromWishlist = async (req, res) => {
  const { id } = req.params;

  const wishlist = await Wishlist.findOne({ user: req.user.id });

  wishlist.items = wishlist.items.filter(i => i._id != id);

  await wishlist.save();

  res.json(wishlist.items);
};

// UPDATE qty
export const updateWishlistQty = async (req, res) => {
  const { id } = req.params;
  const { qty } = req.body;

  const wishlist = await Wishlist.findOne({ user: req.user.id });

  const item = wishlist.items.find(i => i._id == id);

  if (item) item.qty = qty;

  await wishlist.save();

  res.json(wishlist.items);
};

export const clearWishlist = async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user.id });

  if (wishlist) {
    wishlist.items = [];
    await wishlist.save();
  }

  res.json([]);   // return empty array — same shape as other endpoints
};