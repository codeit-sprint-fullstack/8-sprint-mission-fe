import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import productsRouter from "./products.routes.js";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN?.split(",") || "*" }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_, res) => res.status(200).json({ ok: true }));
app.use("/api/products", productsRouter);

// 404
app.use((req, res) => res.status(404).json({ message: "Not Found" }));

// 에러 핸들러
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || "Internal Server Error" });
});

const { MONGODB_URI, PORT = 4000 } = process.env;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((e) => {
    console.error("MongoDB connection error", e);
    process.exit(1);
  });
