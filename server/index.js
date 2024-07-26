import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import employeeRoutes from "./routes/employee.js"



/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extented: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
app.use(cors(
    {
        origin: [`http://localhost:3000`],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    }
))


/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/employee", employeeRoutes);



/* MONGOOSE SETUP*/
const PORT = process.env.PORT || 8000;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB connected successfully!");
}).catch((error) => console.log(`${error} did not connect`))
app.listen(PORT, () => console.log(`Server Port: ${PORT}`));