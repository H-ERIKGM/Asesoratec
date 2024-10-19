import {z} from 'zod'

export const createCounselingSchema = z.object({
    hour: z.number({
        required_error: 'hour is required',
    }).max(15, {
        message: "Hour must be before 15",
    }).min(7, {
        message: "Hour must be after 7",
    }),
    day: z.number({
        required_error: 'day is required'
    }).max(7, {
        message: "Day must be between 1 - 7",
    }).min(1, {
        message: "Day must be between 1 - 7",
    }),
    user: z.string({
        required_error: 'User is required', 
    }),
    subject: z.string({
        required_error: 'Subject is required',
    })
});

export const updateCounselingSchema = z.object({
    hour: z.number({
        required_error: 'hour is required',
    }).max(15, {
        message: "Hour must be before 15",
    }).min(7, {
        message: "Hour must be after 7",
    }),
    day: z.number({
        required_error: 'day is required'
    }).max(7, {
        message: "Day must be between 1 - 7",
    }).min(1, {
        message: "Day must be between 1 - 7",
    }),
    user: z.string({
        required_error: 'User is required', 
    }),
    subject: z.string({
        required_error: 'Subject is required',
    })
})