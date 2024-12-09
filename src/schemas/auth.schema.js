import {z} from 'zod'

export const registerSchema = z.object({
    name: z.string({
        required_error: 'Name is required',
    }),
    last_name: z.string({
        required_error: 'Last name is required',
    }),
    email: z.string({
        required_error: 'Email is required',
    })
    .email({
        message: 'Invalid email',
    }),
    phone: z.string({
        required_error: 'Phone is required',
    }).length(10, {
        message: "Phone must be 10 characters",
    }),
    password: z.string({
        required_error: 'Password is required',
    })
    .min(8, {
        message: "Password must be at least 8 characters",
    }),
    role: z.string().default('user')
});

export const loginSchema = z.object({
    email: z.string({
        required_error: 'Email is required',
    }).email({
        message: 'Invalid email',
    }),
    password: z.string({
        required_error: 'Password is required',
    }).min(8, {
        message: 'Password must be at least 8 characters'
    }),
});

export const updateUserSchema = z.object({
    name: z.string({
        required_error: 'Name is required',
    }),
    last_name: z.string({
        required_error: 'Last name is required',
    }),
    email: z.string({
        required_error: 'Email is required',
    })
    .email({
        message: 'Invalid email',
    }),
    phone: z.string({
        required_error: 'Phone is required',
    }).length(10, {
        message: "Phone must be 10 characters",
    }),
    password: z.string({
        required_error: 'Password is required',
    })
    .min(8, {
        message: "Password must be at least 8 characters",
    }),
    role: z.enum(['user', 'admin', 'teacher'], {
        required_error: 'Role is required',
        invalid_type_error: 'Invalid role',
    })   
})

export const UsersSchema = z.object({
    name: z.string({
        required_error: 'Name is required',
    }),
    last_name: z.string({
        required_error: 'Last name is required',
    }),
    email: z.string({
        required_error: 'Email is required',
    })
    .email({
        message: 'Invalid email',
    }),
    phone: z.string({
        required_error: 'Phone is required',
    }).length(10, {
        message: "Phone must be 10 characters",
    }),
    password: z.string({
        required_error: 'Password is required',
    })
    .min(8, {
        message: "Password must be at least 8 characters",
    })
});