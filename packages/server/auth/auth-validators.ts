import zod from 'zod'

const password = zod.string().min(4).max(12)

export const loginSchema = zod.object({
  password,
  username: zod.string().trim(), // can be username or email (pocketbase)
})

export const signUpSchema = loginSchema.extend({
  passwordConfirm: password.optional(),
  email: zod.string().email().trim(),
  name: zod.string().trim(),
})

export type LoginSchema = zod.infer<typeof loginSchema>
export type SignupSchema = zod.infer<typeof signUpSchema>
