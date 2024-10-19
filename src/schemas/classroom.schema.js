import {z} from 'zod'

export const createClassroomSchema = z.object({
    classroom: z.string({
        required_error: 'Classroom is required',
    }).max(3, {
        message: "Classroom must be 3 characters",
    }).min(3, {
        message: "Classroom must be at least 3 characters",
    })
});

export const updateClassroomSchema = z.object({
    classroom: z.string({
        required_error: 'Classroom is required',
    }).max(3, {
        message: "Classroom must be 3 characters",
    }).min(3, {
        message: "Classroom must be at least 3 characters",
    })
})