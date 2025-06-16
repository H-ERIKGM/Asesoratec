import {z} from 'zod'

export const createRegisterSchema = z.object({
    status: z.boolean().refine((val) => typeof val === "boolean", {
        message: "El campo 'status' debe ser un valor booleano.",
    }),
    counseling: z.string().regex(/^[a-f\d]{24}$/i, "El campo 'counseling' debe ser un ID válido.")
});

export const updateRegisterSchema = z.object({
    status: z.boolean().refine((val) => typeof val === "boolean", {
        message: "El campo 'status' debe ser un valor booleano.",
    }),
    counseling: z.string().regex(/^[a-f\d]{24}$/i, "El campo 'counseling' debe ser un ID válido.")
})