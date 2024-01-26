import { Subtask, Task } from './TaskForm/formSchema';
import { DialogContent, DialogDescription, DialogTitle } from './UI/Dialog';

interface TaskListItemContentProps {
  task: Omit<Task, 'subtasks'>;
  subtasks: Subtask[];
}

export default function TaskListItemContent({
  task,
  subtasks,
}: TaskListItemContentProps) {
  const { id, title, description, statusId } = task;

  return (
    <DialogContent className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <DialogTitle>{title}</DialogTitle>
      </div>

      {description && <DialogDescription>{description}</DialogDescription>}
    </DialogContent>
  );
}
