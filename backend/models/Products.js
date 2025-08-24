import mongoose from "mongoose";

const ProductsShema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLenth: 30,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    tags: {
      type: [String],
    },
    favoriteCount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("Products", ProductsShema);

export default Products;
