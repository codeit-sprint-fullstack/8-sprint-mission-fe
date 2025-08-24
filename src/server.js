import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import Product from './models/product.js'

dotenv.config()
const app = express()
const DATABASE_URL = process.env.DATABASE_URL

app.use(express.json())
app.use(cors())

function asyncHandler(handler) {
  return async (req, res) => {
    try {
      await handler(req, res)
    } catch (e) {
      if (e.name === 'ValidationError') {
        res.status(400).send({ message: e.message })
      } else if (e.name === 'CastError') {
        res.status(400).send({ message: 'Invalid ID format' })
      } else {
        res.status(500).send({ message: e.message })
      }
    }
  }
}

app.get(
  '/items',
  asyncHandler(async (req, res) => {
    const { offset = 0, limit = 10, q = '', sort = 'recent' } = req.query

    const query = q
      ? { $or: [{ title: new RegExp(q, 'i') }, { description: new RegExp(q, 'i') }] }
      : {}

    const totalCount = await Product.countDocuments(query)

    const products = await Product.find(query)
      .sort({ createdAt: sort === 'recent' ? -1 : 1 })
      .skip(Number(offset))
      .limit(Number(limit))

    res.json({ items: products, totalCount })
  })
)

app.post(
  '/items',
  asyncHandler(async (req, res) => {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  })
)

app.get(
  '/items/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Not Found' })
    res.json(product)
  })
)

app.patch(
  '/items/:id',
  asyncHandler(async (req, res) => {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updated) return res.status(404).json({ message: 'Not Found' })
    res.json(updated)
  })
)

app.delete(
  '/items/:id',
  asyncHandler(async (req, res) => {
    const deleted = await Product.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ message: 'Not Found' })
    res.status(204).end()
  })
)

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log('Connected to DB')
    app.listen(3000, () => console.log('Server started on port 3000'))
  })
  .catch((err) => console.error('DB connection error:', err))
