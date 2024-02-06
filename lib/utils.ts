import { Subtask } from '@/components/TaskForm/formSchema';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getCompletedSubtasksAmount = (subtasks: Subtask[]): number => {
  return subtasks.filter(({ isComplete }) => isComplete).length;
};

export const getMaxMessage = (charactersLength: number) =>
  `Max ${charactersLength} characters`;

export const createStringWithLength = (length: number): string => {
  if (length < 0) {
    throw new Error('Length should be a non-negative number');
  }

  return Array(length + 1).join('x');
};
