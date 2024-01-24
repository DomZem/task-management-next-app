import useTasksQuery from '@/hooks/useTasksQuery';
import { Status } from './BoardForm/formSchema';
import Dot from './Dot';

interface StatusListItemProps {
  status: Status;
}

export default function StatusListItem({
  status: { id, name, color },
}: StatusListItemProps) {
  const { data: tasks, isLoading, error } = useTasksQuery(id);

  if (isLoading) {
    return <div>loading ...</div>;
  }

  if (!tasks) {
    return null;
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <li className="h-full w-[280px]">
      <div className="mb-6 flex gap-x-3">
        <Dot color={color} />
        <h3 className="text-heading-s uppercase text-primaryMediumGrey">
          {name} ({tasks.length})
        </h3>
      </div>

      {/* Tasks List */}
    </li>
  );
}
