import {z} from 'zod'

export const createSubjectSchema = z.object({
    title: z.string({
        required_error: 'Title is required',
    }),
    hourStart: z.string({
        required_error: 'Start hour is required', 
    }).regex(/^\d{2}:\d{2}$/), // Valida formato HH:MM si lo deseas
    hourFinish: z.string({
        required_error: 'Finish hour is required',
    }).regex(/^\d{2}:\d{2}$/)
});

export const updateSubjectSchema = z.object({
    title: z.string({
        required_error: 'Title is required',
    }),
    hourStart: z.string({
        required_error: 'Start hour is required', 
    }).regex(/^\d{2}:\d{2}$/), // Valida formato HH:MM si lo deseas
    hourFinish: z.string({
        required_error: 'Finish hour is required',
    }).regex(/^\d{2}:\d{2}$/)
});