import zod from 'zod'

const password = zod.string().min(4).max(12)

export const loginSchema = zod.object({
  password,
  username: zod.string().trim(), // can be username or email (pocketbase)
})

export const signUpSchema = loginSchema.extend({
  email: zod.string().email().trim(),
  name: zod.string().trim(),
})
