import { PASS_MIN_LENGTH } from '@/consts/passLength';
import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(PASS_MIN_LENGTH, {
      message: `Password should be at least ${PASS_MIN_LENGTH} characters long`,
    })
    .regex(/[A-Za-z]/, {
      message: 'Password should contain at least one letter',
    })
    .regex(/\d/, { message: 'Password should contain at least one digit' })
    .regex(/[!@#%^&*]/, {
      message: 'Password should contain at least one special character',
    }),
});
