import cors from "cors";
import express from "express";

import { createServer } from "http";

const app = express();

const httpServer = createServer(app);

// global middlewares
app.use(
  cors({
    origin: "http://localhost:5173", // allow your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // include PATCH in allowed methods
    credentials: true,
  }),
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public")); // configure static file to save images locally

// api routes
import { errorHandler } from "./middlewares/error.middlewares.js";

// * App routes

import todoRouter from "./routes/todo.routes.js";

// * App apis

app.use("/api/v1/todos", todoRouter);

// * Seeding

// common error handling middleware
app.use(errorHandler);

export { httpServer };
