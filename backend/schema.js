import mongoose from 'mongoose';
import { v4 as uuidv4 } from "uuid";

const ProductSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            default: uuidv4(),
        },
        name: {
            type: String,
            required: true,
            maxLength: 50,
        },
        description: {
            type: String,
            required: true,
            maxLength: 500,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        tags: {
            type: [String],
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        }
    }
);

const Product = mongoose.model('Product', ProductSchema);
export default Product;