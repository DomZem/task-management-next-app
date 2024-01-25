import useSubtasksQuery from '@/hooks/useSubtasksQuery';
import { getCompletedSubtasksAmount } from '@/lib/utils';
import { Task } from './TaskForm/formSchema';

interface TaskListItemProps {
  task: Omit<Task, 'subtasks'>;
}

export default function TaskListItem({ task }: TaskListItemProps) {
  const { data: subtasks, isLoading, error } = useSubtasksQuery(task.id);

  if (isLoading) {
    return <div>loading ...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <li className="cursor-pointer rounded-lg bg-primaryWhite px-4 py-[23px] shadow-task outline-none transition-shadow duration-200 hover:shadow-taskHover dark:bg-primaryDarkGrey">
      <h4 className="mb-2 break-words text-heading-m text-primaryBlack dark:text-primaryWhite">
        {task.title}
      </h4>
      <p className="text-body-m text-primaryMediumGrey">
        {getCompletedSubtasksAmount(subtasks)} of {subtasks.length} subtasks
      </p>
    </li>
  );
}
