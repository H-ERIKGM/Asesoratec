import {Router} from "express";
import {login, register, logout, profile, getUsers, updateUser, verifyToken} from '../controllers/auth.controller.js';
import {authRequired} from "../middlewares/validateToken.js";
import {validateSchema} from "../middlewares/validator.middleware.js";
import {registerSchema, loginSchema, updateUserSchema} from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);

router.post("/login", validateSchema(loginSchema), login);

router.post("/logout", logout);

router.get("/verify", verifyToken);

router.get("/profile", authRequired, profile);

router.get("/users", authRequired, getUsers);

router.put("/users", authRequired, validateSchema(updateUserSchema), updateUser);

export default router;