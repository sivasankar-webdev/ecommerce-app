import Cart from "../models/cart.model.js";

/* =========================
   GET CART
========================= */
export const getCart = async (req, res) => {
  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = await Cart.create({ user: req.user.id, items: [] });
  }

  res.json(cart.items);
};

/* =========================
   ADD TO CART
========================= */
export const addToCart = async (req, res) => {
  const { productId, name, price, image, qty } = req.body;

  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = await Cart.create({ user: req.user.id, items: [] });
  }

  const exist = cart.items.find(
    (item) => item.productId === productId
  );

  if (exist) {
    exist.qty += qty || 1;
  } else {
    cart.items.push({
      productId,
      name,
      price,
      image,
      qty: qty || 1,
    });
  }

  await cart.save();

  res.json(cart.items);
};

/* =========================
   REMOVE FROM CART
========================= */
export const removeFromCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id });

  if (!cart) return res.json([]);

  cart.items = cart.items.filter(
    (item) => item._id.toString() !== req.params.id
  );

  await cart.save();

  res.json(cart.items);
};