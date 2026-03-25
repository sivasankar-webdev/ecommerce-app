import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    productId: String,
    name: String,
    price: Number,
    image: String,
    qty: {
      type: Number,
      default: 1,
    },
  },
  { _id: true }
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);