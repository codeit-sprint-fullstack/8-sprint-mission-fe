import mongoose from 'mongoose'
import data from './mock.js'
import Product from '../models/product.js'
import dotenv from 'dotenv'

dotenv.config()

const DATABASE_URL = process.env.DATABASE_URL

mongoose.connect(DATABASE_URL)

await Product.deleteMany({})
await Product.insertMany(data)

mongoose.connection.close()
