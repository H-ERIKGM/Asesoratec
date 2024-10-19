import {z} from 'zod'

export const createSubjectSchema = z.object({
    title: z.string({
        required_error: 'Title is required',
    }),
    hourStart: z.number({
        required_error: 'Start hour is required', 
    }),
    hourFinish: z.number({
        required_error: 'Finish hour is required',
    }),
    classroom: z.string({
        required_error: 'Classroom is required'
    })
});

export const updateSubjectSchema = z.object({
    title: z.string({
        required_error: 'Title is required',
    }),
    hourStart: z.number({
        required_error: 'Start hour is required', 
    }),
    hourFinish: z.number({
        required_error: 'Finish hour is required',
    }),
    classroom: z.string({
        required_error: 'Classroom is required'
    })
})