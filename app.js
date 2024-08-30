import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import healthcheckRouter from "./src/routes/healthcheck.routes.js";
import productRouter from "./src/routes/product.routes.js";

app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/products", productRouter);

export { app };
