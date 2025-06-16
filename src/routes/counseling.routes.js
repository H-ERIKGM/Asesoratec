import {Router} from 'express'
import {authRequired} from '../middlewares/validateToken.js'
import {
    getCounselings, 
    getCounseling, 
    createCounseling, 
    updateCounseling, 
    deleteCounseling,
    getTeachers
} from '../controllers/counseling.controller.js';
import {validateSchema} from "../middlewares/validator.middleware.js";
import {createCounselingSchema, updateCounselingSchema} from "../schemas/counseling.schema.js";

const router = Router();

router.get("/counselings", authRequired, getCounselings);

router.get("/counselings/:id", authRequired, getCounseling);

router.post("/counselings", authRequired, validateSchema(createCounselingSchema), createCounseling);

router.put("/counselings/:id", authRequired, validateSchema(updateCounselingSchema), updateCounseling);

router.delete("/counselings/:id", authRequired, deleteCounseling);

router.get('/teachers', authRequired, getTeachers);

export default router