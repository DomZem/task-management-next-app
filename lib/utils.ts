import { Subtask } from '@/components/TaskForm/formSchema';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getCompletedSubtasksAmount = (subtasks: Subtask[]): number => {
  return subtasks.filter(({ isComplete }) => isComplete).length;
};
