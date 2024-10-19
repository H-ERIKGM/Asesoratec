import {z} from 'zod'

export const createRegisterSchema = z.object({
    status: z.boolean({
        required_error: 'Status is required',
    }),
    registerDate: z.string().datetime(),
    endDate: z.string({
        required_error: 'End date is required',
    }).datetime(),
    user: z.string({
        required_error: 'User is required',
    }),
    counseling: z.string({
        required_error: 'Counseling is required'
    })
});

export const updateRegisterSchema = z.object({
    status: z.boolean({
        required_error: 'Status is required',
    }),
    registerDate: z.string().datetime(),
    endDate: z.string({
        required_error: 'End date is required',
    }).datetime(),
    user: z.string({
        required_error: 'User is required',
    }),
    counseling: z.string({
        required_error: 'Counseling is required'
    })
})