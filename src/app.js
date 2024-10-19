import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from 'cors'

import authRoutes from "./routes/auth.routes.js"
import subjectRoutes from './routes/subject.routes.js'
import counselingRoutes from './routes/counseling.routes.js'
import classroomRoutes from './routes/classroom.routes.js'
import registerRoutes from './routes/register.routes.js'

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", subjectRoutes);
app.use("/api", counselingRoutes);
app.use("/api", classroomRoutes);
app.use("/api", registerRoutes);

export default app;