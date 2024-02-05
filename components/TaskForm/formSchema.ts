import { getMaxMessage } from '@/lib/utils';
import * as z from 'zod';

export const subtaskFormSchema = z.object({
  id: z.number().default(0),
  title: z
    .string()
    .min(1, { message: "Can't be empty" })
    .max(100, { message: getMaxMessage(100) }),
  isComplete: z.boolean(),
});

export const taskFormSchema = z.object({
  id: z.number().default(0),
  title: z
    .string()
    .min(1, { message: "Can't be empty" })
    .max(100, { message: getMaxMessage(100) }),
  description: z
    .string()
    .max(200, { message: getMaxMessage(200) })
    .optional(),
  subtasks: z.array(subtaskFormSchema).optional(),
  statusId: z.number(),
});

export type Task = z.infer<typeof taskFormSchema>;

export type Subtask = z.infer<typeof subtaskFormSchema>;

export type TaskNoSubtasks = Omit<Task, 'subtasks'>;
