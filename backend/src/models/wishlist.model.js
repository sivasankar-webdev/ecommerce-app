import mongoose from "mongoose";
 
const wishlistItemSchema = new mongoose.Schema({
  productId: {
    type: String,       // ← was: mongoose.Schema.Types.ObjectId, ref: "Product"
    required: true,
  },
  name:  { type: String },
  sku:   { type: String },
  price: { type: Number },
  image: { type: String },
  qty: {
    type: Number,
    default: 1,
  },
});
 
const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [wishlistItemSchema],
  },
  { timestamps: true }
);
 
export default mongoose.model("Wishlist", wishlistSchema);