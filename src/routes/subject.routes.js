import {Router} from 'express'
import {authRequired} from '../middlewares/validateToken.js'
import {
    getSubjects, 
    getSubject, 
    createSubject, 
    updateSubject, 
    deleteSubject,
} from '../controllers/subjects.controller.js';

import {validateSchema} from "../middlewares/validator.middleware.js";
import {createSubjectSchema, updateSubjectSchema} from "../schemas/subject.schema.js";

const router = Router();

router.get('/subjects', authRequired, getSubjects);

router.get('/subjects/:id', authRequired, getSubject);

router.post('/subjects', authRequired, validateSchema(createSubjectSchema), createSubject);

router.delete('/subjects/:id', authRequired, deleteSubject);

router.put('/subjects/:id', authRequired, validateSchema(updateSubjectSchema), updateSubject);

export default router