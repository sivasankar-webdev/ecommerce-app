import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
} from "../controllers/cart.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getCart);
router.post("/", protect, addToCart);
router.delete("/:id", protect, removeFromCart);

export default router;