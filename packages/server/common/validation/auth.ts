import zod from 'zod';

export const loginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(4).max(12),
});

export const signUpSchema = loginSchema.extend({
  username: zod.string().trim(),
  name: zod.string().trim(),
});