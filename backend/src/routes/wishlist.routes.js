import express from "express";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  updateWishlistQty,
  clearWishlist
} from "../controllers/wishlist.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getWishlist);
router.post("/", protect, addToWishlist);
router.delete("/:id", protect, removeFromWishlist);
router.put("/:id", protect, updateWishlistQty);
router.delete("/", protect, clearWishlist);

export default router;