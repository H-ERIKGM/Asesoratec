import dotenv from 'dotenv'
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from 'cors'

import authRoutes from "./routes/auth.routes.js"
import subjectRoutes from './routes/subject.routes.js'

import counselingRoutes from './routes/counseling.routes.js'
import classroomRoutes from './routes/classroom.routes.js'
import registerRoutes from './routes/register.routes.js'

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.use(cors({
    origin: ['http://asesoratec.s3-website.us-east-2.amazonaws.com', 'http://localhost:5173'],
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client', 'dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", subjectRoutes);
app.use("/api", counselingRoutes);
app.use("/api", classroomRoutes);
app.use("/api", registerRoutes);

export default app;