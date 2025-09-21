import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import express, { ErrorRequestHandler, RequestHandler } from "express";
import sequelize from "./db";
import todosRouter from "./routes/todos";
import categoriesRouter from "./routes/categories";
import { Category, Todo } from "../models";

dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

const app = express();

// Basic security headers
app.use(helmet());

// CORS
const corsConf = cors({
  origin: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
});
app.use(corsConf);

// Request logging
if (NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

// Rate limiting (basic)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: Number(process.env.RATE_LIMIT_MAX) || 100, // limit each IP
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Performance
app.use(compression());

// Body parsing
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Mounting
app.use("/api/todos", todosRouter);
app.use("/api/categories", categoriesRouter);

// 404 handler
const notFound: RequestHandler = (req, res, next) => {
  const err = new Error("Not Found") as any;
  err.status = 404;
  next(err);
};
app.use(notFound);

// Centralized error handler
const centralizedError: ErrorRequestHandler = (err, _req, res, _next) => {
  const status = err.status || 500;

  const isOperational = err.isOperational || status < 500;
  if (!isOperational) console.error(err);

  const payload = {
    status,
    message:
      err.message || (status === 500 ? "Internal Server Error" : "Error"),
    ...(NODE_ENV !== "production" ? { stack: err.stack } : {}),
  };

  res.status(status).json(payload);
};
app.use(centralizedError);

// Start server after DB connection
async function start() {
  try {
    await sequelize.authenticate();
    console.info("Database connection established.");

    // Synchronizing models
    console.info("Synchronizing models...");

    // Doesn't do sequelize.sync(), since the synchronization needs to be in specific order.
    await Category.sync();
    await Todo.sync();
    console.info("Synchronizing models done successfully.");

    app.listen(PORT, () => {
      console.info(`Server running on port ${PORT} (${NODE_ENV})`);
    });
  } catch (err) {
    console.error("Failed to start:", err);
    process.exit(1);
  }
}

start();

export default app;
