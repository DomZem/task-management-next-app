'use client';

import useUpdateTask from '@/hooks/task/useUpdateTask';
import TaskFormTemplate from './TaskFormTemplate';
import { Subtask, TaskNoSubtasks } from './formSchema';

interface EditTaskFormProps {
  task: TaskNoSubtasks;
  subtasks: Subtask[];
}

export default function EditTaskForm({ task, subtasks }: EditTaskFormProps) {
  const { mutate, isPending, isSuccess } = useUpdateTask(task.statusId);

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
