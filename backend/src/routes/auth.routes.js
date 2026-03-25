import express from "express";
import {
  registerUser,
  loginUser,
  getProfile
} from "../controllers/auth.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register user
 */
router.post("/register", registerUser);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 */
router.post("/login", loginUser);

/**
 * @route   GET /api/auth/profile
 * @desc    Get user profile (Protected)
 */
router.get("/profile", protect, getProfile);

export default router;