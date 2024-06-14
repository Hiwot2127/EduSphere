import mongoose from "mongoose";
import configs from "./config/config.js";
import app from "./app.js";
import User from "./models/userModel.js";
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Course from "./models/courseModel.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, './data/courses.json');
mongoose.set('strictQuery', false)
mongoose
  .connect(configs.MONGO_URI)
  .then(async() => {
    console.log("Connected to mongodb...");

    await User.findOneAndDelete({email:configs.ADMIN_EMAIL});
    await User.create({name:configs.ADMIN_NAME,email:configs.ADMIN_EMAIL,password:configs.ADMIN_PASSWORD,role:configs.ADMIN_ROLE})
    app.listen(configs.PORT, () => {
      return console.log(
        `Express is listening at http://localhost:${configs.PORT}`
      );
    });
  })
  .catch((err) => console.log("Error occurred while connecting", err));