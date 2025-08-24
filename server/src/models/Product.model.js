import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    tags: { type: [String], default: [] },
  },
  { timestamps: true } // createdAt, updatedAt 자동
);

// _id -> id 로 변환
ProductSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
  },
});

export default mongoose.model("Product", ProductSchema);
