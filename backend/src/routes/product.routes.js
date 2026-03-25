import express from "express";
import {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @route   GET /api/products
 * @desc    Get all products
 */
router.get("/", getProducts);

/**
 * @route   GET /api/products/:id
 * @desc    Get single product
 */
router.get("/:id", getSingleProduct);

/**
 * @route   POST /api/products
 * @desc    Create product (Protected)
 */
router.post("/", protect, createProduct);

/**
 * @route   PUT /api/products/:id
 * @desc    Update product (Protected)
 */
router.put("/:id", protect, updateProduct);

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete product (Protected)
 */
router.delete("/:id", protect, deleteProduct);

export default router;