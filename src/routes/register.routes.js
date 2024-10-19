import {Router} from 'express'
import {authRequired} from '../middlewares/validateToken.js'
import {
    getRegisters, 
    getRegister, 
    createRegister, 
    updateRegister, 
    deleteRegister,
} from '../controllers/register.controller.js';

import {validateSchema} from "../middlewares/validator.middleware.js";
import {createRegisterSchema, updateRegisterSchema} from "../schemas/register.schema.js";

const router = Router();

router.get('/registers', authRequired, getRegisters);

router.get('/registers/:id', authRequired, getRegister);

router.post('/registers', authRequired, validateSchema(createRegisterSchema), createRegister);

router.delete('/registers/:id', authRequired, deleteRegister);

router.put('/registers/:id', authRequired, validateSchema(updateRegisterSchema), updateRegister);

export default router