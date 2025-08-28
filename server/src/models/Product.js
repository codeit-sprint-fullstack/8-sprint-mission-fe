import mongoose from 'mongoose';

// Product Schema
const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, maxlength: 200 },
        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: 5000,
        },
        price: { type: Number, required: true, min: 0 },
        tags: { type: [String], default: [] },
        status: {
            type: String,
            enum: ['ACTIVE', 'RESERVED', 'SOLD'],
            default: 'ACTIVE',
        },
    },
    { timestamps: true },
);

// Id field
ProductSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

ProductSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
        delete ret._id;
    },
});

// Text index search for name and descript
ProductSchema.index({ name: 'text', description: 'text' });

export default mongoose.models.Product ||
    mongoose.model('Product', ProductSchema);
