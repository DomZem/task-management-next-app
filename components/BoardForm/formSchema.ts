import { getMaxMessage } from '@/lib/utils';
import * as z from 'zod';

export const statusFormSchema = z.object({
  id: z.number().default(0),
  name: z
    .string()
    .min(1, { message: "Can't be empty" })
    .max(50, { message: getMaxMessage(50) }),
  color: z.string(),
});

export const boardFormSchema = z.object({
  id: z.number().default(0),
  name: z
    .string()
    .min(1, { message: "Can't be empty" })
    .max(50, { message: getMaxMessage(50) }),
  statuses: z.array(statusFormSchema).optional(),
});

export type Board = z.infer<typeof boardFormSchema>;

export type Status = z.infer<typeof statusFormSchema>;

export type BoardNoStatuses = Omit<Board, 'statuses'>;
