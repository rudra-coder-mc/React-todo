import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import session from "express-session";
import { createServer } from "http";

const app = express();

const httpServer = createServer(app);

// global middlewares
app.use(
  cors({
    origin:
      process.env.CORS_ORIGIN === "*"
        ? "*" // This might give CORS error for some origins due to credentials set to true
        : process.env.CORS_ORIGIN?.split(","), // For multiple cors origin for production. Refer https://github.com/hiteshchoudhary/apihub/blob/a846abd7a0795054f48c7eb3e71f3af36478fa96/.env.sample#L12C1-L12C12
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public")); // configure static file to save images locally
app.use(cookieParser());

// required for passport
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
); // session secret

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
