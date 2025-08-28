import express from 'express';
import createError from 'http-errors';
import mongoose from 'mongoose';
import { z } from 'zod';
import Product from '../models/Product.js';

const router = express.Router();

const isValidId = (id) => mongoose.isValidObjectId(id);

const toRegex = (token) =>
    new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');

// Validation check
const tagsCoerce = z.preprocess(
    (val) => {
        if (Array.isArray(val)) return val;
        if (typeof val === 'string') {
            if (val.trim() === '') return [];
            return val
                .split(',')
                .map((t) => t.trim())
                .filter(Boolean);
        }
        return val;
    },
    z.array(z.string().trim().min(1)).optional().default([]),
);

const createBodySchema = z.object({
    name: z.string().trim().min(1).max(200),
    description: z.string().trim().min(1).max(5000),
    price: z.preprocess(
        (v) => (typeof v === 'string' ? Number(v) : v),
        z.number().min(0),
    ),
    tags: tagsCoerce,
});

const updateBodySchema = createBodySchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
        message: 'At least one field must be provided',
    });

const listQuerySchema = z.object({
    offset: z
        .preprocess(
            (v) => (v === undefined ? 0 : Number(v)),
            z.number().int().min(0),
        )
        .default(0),
    limit: z
        .preprocess(
            (v) => (v === undefined ? 10 : Number(v)),
            z.number().int().min(1).max(100),
        )
        .default(10),
    sort: z.enum(['recent']).optional().default('recent'),
    q: z.string().trim().min(1).optional(),
});

// Create
router.post('/', async (req, res, next) => {
    try {
        const body = createBodySchema.parse(req.body);
        const product = await Product.create(body);
        return res.status(201).json(product);
    } catch (err) {
        if (err instanceof z.ZodError)
            return next(
                createError(400, {
                    message: 'Validation failed',
                    issues: err.issues,
                }),
            );
        return next(err);
    }
});

// Get Product List
router.get('/', async (req, res, next) => {
    try {
        const { offset, limit, sort, q } = listQuerySchema.parse(req.query);

        const filter = {};
        if (q) {
            const tokens = q.split(/\s+/).filter(Boolean);
            if (tokens.length) {
                filter.$and = tokens.map((t) => ({
                    $or: [
                        { name: { $regex: toRegex(t) } },
                        { description: { $regex: toRegex(t) } },
                    ],
                }));
            }
        }

        const sortOption =
            sort === 'recent' ? { createdAt: -1 } : { createdAt: -1 };

        const [total, items] = await Promise.all([
            Product.countDocuments(filter),
            Product.find(filter)
                .sort(sortOption)
                .skip(offset)
                .limit(limit)
                .select('name price createdAt') // id virtual will be present
                .lean({ virtuals: true }),
        ]);

        return res.json({
            meta: { total, offset, limit },
            items,
        });
    } catch (err) {
        if (err instanceof z.ZodError)
            return next(
                createError(400, {
                    message: 'Validation failed',
                    issues: err.issues,
                }),
            );
        return next(err);
    }
});

// Get Product Detail
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidId(id)) return next(createError(400, 'Invalid id'));

        const product = await Product.findById(id)
            .select('name description price tags createdAt')
            .lean({ virtuals: true });
        if (!product) return next(createError(404, 'Product not found'));
        return res.json(product);
    } catch (err) {
        return next(err);
    }
});

// Update Product
router.patch('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidId(id)) return next(createError(400, 'Invalid id'));
        const body = updateBodySchema.parse(req.body);

        const updated = await Product.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        }).lean({ virtuals: true });

        if (!updated) return next(createError(404, 'Product not found'));
        return res.json(updated);
    } catch (err) {
        if (err instanceof z.ZodError)
            return next(
                createError(400, {
                    message: 'Validation failed',
                    issues: err.issues,
                }),
            );
        return next(err);
    }
});

// Delete Product
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidId(id)) return next(createError(400, 'Invalid id'));
        const deleted = await Product.findByIdAndDelete(id);
        if (!deleted) return next(createError(404, 'Product not found'));
        return res.status(204).send();
    } catch (err) {
        return next(err);
    }
});

export default router;
