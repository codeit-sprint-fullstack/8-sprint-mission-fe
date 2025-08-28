import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import createError from 'http-errors';

import productsRouter from './routes/products.js';

dotenv.config();

const app = express();

app.use(helmet());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

const parseOrigins = () => {
    const raw = process.env.CORS_ORIGIN?.trim();
    if (!raw || raw === '*') return '*';
    return raw
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
};

app.use(
    cors({
        origin: parseOrigins(),
        credentials: true,
    }),
);

// Body parser
app.use(express.json({ limit: '1mb' }));

// Routes
app.use('/api/products', productsRouter);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Error handler
app.use((req, res, next) => {
    next(createError(404, 'Not Found'));
});
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const isProd = process.env.NODE_ENV === 'production';
    res.status(status).json({
        error: {
            message: err.message || 'Internal Server Error',
            ...(isProd
                ? {}
                : { stack: err.stack, details: err?.errors || err?.issues }),
        },
    });
});

const PORT = process.env.PORT || 4000;
const MONGODB_URI =
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/panda_market';

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`API server listening on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect MongoDB:', err);
        process.exit(1);
    });
