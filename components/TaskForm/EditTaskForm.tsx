'use client';

import useUpdateTask from '@/hooks/task/useUpdateTask';
import TaskFormTemplate from './TaskFormTemplate';
import { Subtask, Task } from './formSchema';

interface EditTaskFormProps {
  task: Omit<Task, 'subtasks'>;
  subtasks: Subtask[];
}

export default function EditTaskForm({ task, subtasks }: EditTaskFormProps) {
  const { mutate, isPending, isSuccess } = useUpdateTask();

  return (
    <TaskFormTemplate
      variant="edit"
      defaultValues={{
        ...task,
        subtasks,
      }}
      onSubmit={(task) => mutate(task)}
      isPending={isPending}
      isSuccess={isSuccess}
    />
  );
}
