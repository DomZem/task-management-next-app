import { HiDotsVertical } from 'react-icons/hi';
import DeleteTaskModal from './DeleteTaskModal';
import EditTaskForm from './TaskForm/EditTaskForm';
import { Subtask, Task } from './TaskForm/formSchema';
import { DialogContent, DialogDescription, DialogTitle } from './UI/Dialog';
import { Popover, PopoverContent, PopoverTrigger } from './UI/Popover';

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

        <Popover>
          <PopoverTrigger className="p-2 outline-none">
            <HiDotsVertical className="text-xl text-primaryMediumGrey" />
          </PopoverTrigger>
          <PopoverContent>
            <ul className="flex flex-col gap-4">
              <li>
                <EditTaskForm task={task} subtasks={subtasks} />
              </li>
              <li>
                <DeleteTaskModal
                  taskId={id}
                  taskTitle={title}
                  statusId={statusId}
                />
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      </div>

      {description && <DialogDescription>{description}</DialogDescription>}
    </DialogContent>
  );
}
