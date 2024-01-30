import useTasks from '@/hooks/task/useTasks';
import { Status } from './BoardForm/formSchema';
import Dot from './Dot';
import ErrorWrapper from './ErrorWrapper';
import StatusListItemSkeleton from './StatusListItemSkeleton';
import TaskList from './TaskList';

interface StatusListItemProps {
  status: Status;
}

export default function StatusListItem({
  status: { id, name, color },
}: StatusListItemProps) {
  const { data: tasks, isLoading, error } = useTasks(id);

  if (isLoading) {
    return <StatusListItemSkeleton />;
  }

  if (!tasks || error) {
    return (
      <li className="flex min-h-full w-[280px] items-center justify-center rounded-lg bg-primaryWhite px-4 py-[23px] shadow-task dark:bg-primaryDarkGrey">
        <ErrorWrapper message="Something went wrong during fetch tasks" />
      </li>
    );
  }

  return (
    <li className="h-full w-[280px]">
      <div className="mb-6 flex gap-x-3">
        <Dot color={color} />
        <h3 className="text-heading-s uppercase text-primaryMediumGrey">
          {name} ({tasks.length})
        </h3>
      </div>

      {tasks.length > 0 && <TaskList tasks={tasks} />}
    </li>
  );
}
