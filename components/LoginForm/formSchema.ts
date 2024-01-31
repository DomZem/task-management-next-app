import * as z from 'zod';

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: 'Required' }),
});

export type Login = z.infer<typeof loginFormSchema>;
