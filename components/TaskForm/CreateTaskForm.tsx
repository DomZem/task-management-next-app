'use client';

import useCreateTask from '@/hooks/useCreateTask';
import TaskFormTemplate from './TaskFormTemplate';
import { Task } from './formSchema';

const defaultValues: Task = {
  id: 0,
  title: '',
  description: '',
  subtasks: [
    {
      id: 0,
      title: '',
      isComplete: false,
    },
  ],
  statusId: 0,
};

export default function CreateTaskForm() {
  const { mutate, isPending, isError } = useCreateTask();

  return (
    <TaskFormTemplate
      variant="create"
      defaultValues={defaultValues}
      onSubmit={(task: Task) => mutate(task)}
      isPending={isPending}
      isSuccess={!isPending && !isError}
    />
  );
}
