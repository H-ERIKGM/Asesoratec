import {Router} from "express";
import {login, register, logout, profile, getUsers, getUser, createUsers, updateUser, deleteUser, verifyToken} from '../controllers/auth.controller.js';
import {authRequired} from "../middlewares/validateToken.js";
import {validateSchema} from "../middlewares/validator.middleware.js";
import {registerSchema, loginSchema, updateUserSchema, UsersSchema} from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);

router.post("/login", validateSchema(loginSchema), login);

router.post("/logout", logout);

router.get("/verify", verifyToken);

router.get("/profile", authRequired, profile);

router.get("/users", authRequired, getUsers);

router.post("/users", authRequired, validateSchema(UsersSchema), createUsers);

router.get("/users/:id", authRequired, getUser); // Devuelve un usuario específico

router.put("/users/:id", authRequired, validateSchema(updateUserSchema), updateUser);

router.delete("/users/:id", authRequired, deleteUser);

export default router;