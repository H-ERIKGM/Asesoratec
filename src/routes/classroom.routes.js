import {Router} from 'express'
import {authRequired} from '../middlewares/validateToken.js'
import {
    getClassrooms, 
    getClassroom, 
    createClassroom, 
    updateClassroom, 
    deleteClassroom,
} from '../controllers/classroom.controller.js';
import {validateSchema} from "../middlewares/validator.middleware.js";
import {createClassroomSchema, updateClassroomSchema} from "../schemas/classroom.schema.js";

const router = Router();

router.get("/classrooms", authRequired, getClassrooms);

router.get("/classrooms/:id", authRequired, getClassroom);

router.post("/classrooms", authRequired, validateSchema(createClassroomSchema), createClassroom);

router.put("/classrooms/:id", authRequired, validateSchema(updateClassroomSchema), updateClassroom);

router.delete("/classrooms/:id", authRequired, deleteClassroom);

export default router