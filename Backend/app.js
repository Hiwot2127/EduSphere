import express from "express";
import cors from "cors";
import path from "path";
const app = express();
import routes from "./routes/index.js";
import morgan from "morgan";
import { fileURLToPath } from 'url';

import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorhandler.js";
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());


app.use("/api/v1/join", routes.userAuth);
app.use("/api/v1/stripe", routes.stripe);
app.use("/api/v1/upload", routes.upload);
app.use("/api/v1/courses", routes.courses);
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
app.use('/outputs', express.static(path.join(__dirname, './middlewares/uploads')));
app.use(errorHandler)

export default app;