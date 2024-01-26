import useUpdateTaskStatus from '@/hooks/task/useUpdateTaskStatus';
import useStatuses from '@/hooks/useStatuses';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './UI/Select';

interface TaskStatusProps {
  taskId: number;
  statusId: number;
}

export default function TaskStatus({
  taskId,
  statusId: currentStatusId,
}: TaskStatusProps) {
  const { data: statuses, error, isLoading } = useStatuses();
  const { mutate, isPending } = useUpdateTaskStatus(taskId, currentStatusId);

  // Return null, because in component above called StatusList is also uses useStatuses hook and that component handle these request states
  if (isLoading || error || !statuses?.length) {
    return null;
  }

  return (
    <div>
      <p className="label-text mb-2">current status</p>
      <Select
        defaultValue={currentStatusId.toString()}
        disabled={isPending}
        onValueChange={(statusId) => mutate(parseInt(statusId))}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          {statuses.map(({ id, name }) => (
            <SelectItem value={id.toString()} key={id}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
