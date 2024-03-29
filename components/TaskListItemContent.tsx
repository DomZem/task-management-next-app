import { HiDotsVertical } from 'react-icons/hi';
import DeleteTaskModal from './DeleteTaskModal';
import SubtaskList from './SubtaskList';
import EditTaskForm from './TaskForm/EditTaskForm';
import { Subtask, TaskNoSubtasks } from './TaskForm/formSchema';
import TaskStatus from './TaskStatus';
import { DialogContent, DialogDescription, DialogTitle } from './UI/Dialog';
import { Popover, PopoverContent, PopoverTrigger } from './UI/Popover';

interface TaskListItemContentProps {
  task: TaskNoSubtasks;
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

      {description && (
        <DialogDescription data-testid="task-list-item-description">
          {description}
        </DialogDescription>
      )}

      {!!subtasks.length && <SubtaskList subtasks={subtasks} />}

      <TaskStatus taskId={id} statusId={statusId} />
    </DialogContent>
  );
}
